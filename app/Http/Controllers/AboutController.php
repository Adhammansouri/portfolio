<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        $locale = app()->getLocale();
        $profile = Profile::query()->first();

        $skills = Skill::query()
            ->orderBy('group')
            ->orderBy('sort_order')
            ->get()
            ->groupBy('group')
            ->map(fn ($group) => $group->pluck('name')->values());

        return Inertia::render('About', [
            'profile' => $profile?->toLocaleArray($locale),
            'skills' => $skills,
        ]);
    }
}
