<?php

/**
 * Studio black-background → clean transparent PNG (edge flood-fill).
 * Usage: php scripts/remove-black-bg.php [source] [target]
 */

$source = $argv[1] ?? __DIR__ . '/../public/images/adham-mansour.png';
$target = $argv[2] ?? __DIR__ . '/../public/images/adham-mansour-cutout.png';

if (! extension_loaded('gd')) {
    fwrite(STDERR, "GD extension required.\n");
    exit(1);
}

if (! is_file($source)) {
    fwrite(STDERR, "Source not found: {$source}\n");
    exit(1);
}

$input = imagecreatefrompng($source);
if ($input === false) {
    $input = imagecreatefromjpeg($source);
}
if ($input === false) {
    fwrite(STDERR, "Failed to load source image.\n");
    exit(1);
}

imagesavealpha($input, true);
imagealphablending($input, true);

$width = imagesx($input);
$height = imagesy($input);

if (! imageistruecolor($input)) {
    $promoted = imagecreatetruecolor($width, $height);
    imagealphablending($promoted, false);
    imagesavealpha($promoted, true);
    imagecopy($promoted, $input, 0, 0, 0, 0, $width, $height);
    imagedestroy($input);
    $input = $promoted;
}

$bgThreshold = 18;
$isBackground = [];

for ($y = 0; $y < $height; $y++) {
    for ($x = 0; $x < $width; $x++) {
        $rgba = imagecolorat($input, $x, $y);
        $r = ($rgba >> 16) & 0xFF;
        $g = ($rgba >> 8) & 0xFF;
        $b = $rgba & 0xFF;
        $isBackground[$y][$x] = max($r, $g, $b) <= $bgThreshold;
    }
}

$queue = new SplQueue();
$visited = array_fill(0, $height, array_fill(0, $width, false));

$enqueue = static function (int $x, int $y) use (&$queue, &$visited, $isBackground): void {
    if (! $isBackground[$y][$x] || $visited[$y][$x]) {
        return;
    }
    $visited[$y][$x] = true;
    $queue->enqueue([$x, $y]);
};

for ($x = 0; $x < $width; $x++) {
    $enqueue($x, 0);
    $enqueue($x, $height - 1);
}
for ($y = 0; $y < $height; $y++) {
    $enqueue(0, $y);
    $enqueue($width - 1, $y);
}

while (! $queue->isEmpty()) {
    [$x, $y] = $queue->dequeue();
    foreach ([[$x - 1, $y], [$x + 1, $y], [$x, $y - 1], [$x, $y + 1]] as [$nx, $ny]) {
        if ($nx < 0 || $ny < 0 || $nx >= $width || $ny >= $height) {
            continue;
        }
        $enqueue($nx, $ny);
    }
}

$output = imagecreatetruecolor($width, $height);
imagealphablending($output, false);
imagesavealpha($output, true);
imagefilledrectangle($output, 0, 0, $width, $height, 0x7F000000);

$edgeFeatherEnd = 48;

for ($y = 0; $y < $height; $y++) {
    for ($x = 0; $x < $width; $x++) {
        if ($visited[$y][$x]) {
            continue;
        }

        $rgba = imagecolorat($input, $x, $y);
        $r = ($rgba >> 16) & 0xFF;
        $g = ($rgba >> 8) & 0xFF;
        $b = $rgba & 0xFF;
        $level = max($r, $g, $b);
        $alpha = 0;

        $touchesBg = false;
        foreach ([[$x - 1, $y], [$x + 1, $y], [$x, $y - 1], [$x, $y + 1]] as [$nx, $ny]) {
            if ($nx < 0 || $ny < 0 || $nx >= $width || $ny >= $height) {
                continue;
            }
            if ($visited[$ny][$nx]) {
                $touchesBg = true;
                break;
            }
        }

        if ($touchesBg && $level < $edgeFeatherEnd) {
            $t = max(0, min(1, ($level - $bgThreshold) / ($edgeFeatherEnd - $bgThreshold)));
            $alpha = (int) round((1 - $t) * 72);
        }

        $sat = max($r, $g, $b) - min($r, $g, $b);
        if ($sat < 24 && $level > 190 && $alpha > 8) {
            continue;
        }

        // Reduce cyan rim spill on soft edges over light backgrounds
        if ($touchesBg && $alpha > 0 && $alpha < 55 && $b > $r + 18 && $b > $g + 10) {
            $b = (int) round(($r + $g) / 2.15);
        }

        imagesetpixel($output, $x, $y, ($alpha << 24) | ($r << 16) | ($g << 8) | $b);
    }
}

imagepng($output, $target, 9);
imagedestroy($input);
imagedestroy($output);

$size = filesize($target);
echo "Wrote {$target} ({$size} bytes)\n";

if ($size < 10000) {
    fwrite(STDERR, "Warning: output file suspiciously small.\n");
    exit(1);
}
