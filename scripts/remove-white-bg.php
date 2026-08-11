<?php

$source = $argv[1] ?? '';
$target = $argv[2] ?? '';

if ($source === '' || $target === '') {
    fwrite(STDERR, "Usage: php scripts/remove-white-bg.php [source] [target]\n");
    exit(1);
}

$input = imagecreatefrompng($source);
if ($input === false) {
    fwrite(STDERR, "Failed to load source.\n");
    exit(1);
}

$width = imagesx($input);
$height = imagesy($input);

if (! imageistruecolor($input)) {
    $promoted = imagecreatetruecolor($width, $height);
    imagecopy($promoted, $input, 0, 0, 0, 0, $width, $height);
    imagedestroy($input);
    $input = $promoted;
}

$bgThreshold = 250;
$isBackground = [];

for ($y = 0; $y < $height; $y++) {
    for ($x = 0; $x < $width; $x++) {
        $rgba = imagecolorat($input, $x, $y);
        $r = ($rgba >> 16) & 0xFF;
        $g = ($rgba >> 8) & 0xFF;
        $b = $rgba & 0xFF;
        $isBackground[$y][$x] = min($r, $g, $b) >= $bgThreshold;
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

$edgeFeatherEnd = 252;

for ($y = 0; $y < $height; $y++) {
    for ($x = 0; $x < $width; $x++) {
        if ($visited[$y][$x]) {
            continue;
        }

        $rgba = imagecolorat($input, $x, $y);
        $r = ($rgba >> 16) & 0xFF;
        $g = ($rgba >> 8) & 0xFF;
        $b = $rgba & 0xFF;
        $level = min($r, $g, $b);
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

        if ($touchesBg && $level > $bgThreshold - 8) {
            $t = max(0, min(1, ($edgeFeatherEnd - $level) / ($edgeFeatherEnd - $bgThreshold + 8)));
            $alpha = (int) round((1 - $t) * 64);
        }

        imagesetpixel($output, $x, $y, ($alpha << 24) | ($r << 16) | ($g << 8) | $b);
    }
}

imagepng($output, $target, 9);
imagedestroy($input);
imagedestroy($output);

echo "Wrote {$target} (" . filesize($target) . " bytes)\n";
