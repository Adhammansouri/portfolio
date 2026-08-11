<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        $profile = Profile::query()->first();

        return Inertia::render('Contact', [
            'profile' => $profile?->toLocaleArray(app()->getLocale()),
        ]);
    }
}
