<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CvController extends Controller
{
    public function __invoke(): BinaryFileResponse
    {
        $path = public_path('cv/Adham_Mansour_CV.pdf');

        abort_unless(is_file($path), 404);

        return response()->download($path, 'Adham_Mansour_CV.pdf');
    }
}
