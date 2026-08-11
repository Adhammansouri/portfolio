<?php

$cutout = $argv[1];
$bg = [243, 240, 234];
$out = preg_replace('/\.png$/', '-preview.jpg', $cutout);

$src = imagecreatefrompng($cutout);
$w = imagesx($src);
$h = imagesy($src);
$canvas = imagecreatetruecolor($w, $h);
$paper = imagecolorallocate($canvas, $bg[0], $bg[1], $bg[2]);
imagefilledrectangle($canvas, 0, 0, $w, $h, $paper);
imagealphablending($canvas, true);
imagecopy($canvas, $src, 0, 0, 0, 0, $w, $h);
imagejpeg($canvas, $out, 92);
echo "Wrote {$out}\n";
