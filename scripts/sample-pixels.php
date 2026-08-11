<?php

$path = $argv[1] ?? '';
$img = imagecreatefrompng($path);
$w = imagesx($img);
$h = imagesy($img);

echo basename($path) . " {$w}x{$h}\n";

$points = [
    ['center', (int) ($w / 2), (int) ($h / 2)],
    ['forehead', (int) ($w / 2), (int) ($h * 0.28)],
    ['shirt', (int) ($w / 2), (int) ($h * 0.82)],
    ['hair_top', (int) ($w / 2), (int) ($h * 0.12)],
    ['bg_tl', 30, 30],
    ['bg_tr', $w - 30, 30],
];

foreach ($points as [$label, $x, $y]) {
    $c = imagecolorat($img, $x, $y);
    $a = ($c >> 24) & 0x7F;
    $r = ($c >> 16) & 0xFF;
    $g = ($c >> 8) & 0xFF;
    $b = $c & 0xFF;
    echo "{$label} ({$x},{$y}): r={$r} g={$g} b={$b} alpha={$a}\n";
}

$opaque = 0;
$transparent = 0;
for ($y = 0; $y < $h; $y += 8) {
    for ($x = 0; $x < $w; $x += 8) {
        $a = (imagecolorat($img, $x, $y) >> 24) & 0x7F;
        if ($a >= 120) {
            $transparent++;
        } else {
            $opaque++;
        }
    }
}
echo "sampled opaque={$opaque} transparent={$transparent}\n";
