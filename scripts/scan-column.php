<?php

$p = $argv[1];
$i = imagecreatefrompng($p);
$w = imagesx($i);
for ($y = 80; $y <= 350; $y += 20) {
    $c = imagecolorat($i, (int) ($w / 2), $y);
    $a = ($c >> 24) & 0x7F;
    $r = ($c >> 16) & 0xFF;
    $g = ($c >> 8) & 0xFF;
    $b = $c & 0xFF;
    echo "y={$y} a={$a} rgb({$r},{$g},{$b})\n";
}
