<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\LeadershipItem;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function __invoke(): Response
    {
        $locale = app()->getLocale();

        $skills = Skill::query()
            ->orderBy('group')
            ->orderBy('sort_order')
            ->get()
            ->groupBy('group')
            ->map(fn ($group) => $group->pluck('name')->values());

        return Inertia::render('Experience', [
            'experiences' => Experience::query()->orderBy('sort_order')->get()
                ->map(fn (Experience $e) => $e->toLocaleArray($locale)),
            'educations' => Education::query()->orderBy('sort_order')->get()
                ->map(fn (Education $e) => $e->toLocaleArray($locale)),
            'certifications' => Certification::query()->orderBy('sort_order')->get()
                ->map(fn (Certification $c) => $c->toLocaleArray($locale)),
            'leadership' => LeadershipItem::query()->orderBy('sort_order')->get()
                ->map(fn (LeadershipItem $l) => $l->toLocaleArray($locale)),
            'skills' => $skills,
        ]);
    }
}
