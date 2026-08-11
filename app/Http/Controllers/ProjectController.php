<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $locale = app()->getLocale();

        $projects = Project::query()
            ->with('translations')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Project $p) => $p->toLocaleArray($locale));

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function show(string $locale, string $slug): Response
    {
        $project = Project::query()
            ->with('translations')
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Project::query()
            ->with('translations')
            ->where('id', '!=', $project->id)
            ->orderBy('sort_order')
            ->limit(3)
            ->get()
            ->map(fn (Project $p) => $p->toLocaleArray(app()->getLocale()));

        return Inertia::render('Projects/Show', [
            'project' => $project->toLocaleArray(app()->getLocale()),
            'related' => $related,
        ]);
    }
}
