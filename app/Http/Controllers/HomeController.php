<?php

namespace App\Http\Controllers;

use App\Models\Capability;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $locale = app()->getLocale();
        $profile = Profile::query()->first();

        $featured = Project::query()
            ->with('translations')
            ->where('featured', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Project $p) => $p->toLocaleArray($locale));

        $experiences = Experience::query()
            ->where('is_current', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Experience $e) => $e->toLocaleArray($locale));

        $capabilities = Capability::query()
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Capability $c) => $c->toLocaleArray($locale));

        return Inertia::render('Home', [
            'profile' => $profile?->toLocaleArray($locale),
            'featuredProjects' => $featured,
            'currentExperiences' => $experiences,
            'capabilities' => $capabilities,
        ]);
    }
}
