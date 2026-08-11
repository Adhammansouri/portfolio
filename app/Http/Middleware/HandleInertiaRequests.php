<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $locale = $this->resolveLocale($request);
        $dir = $locale === 'ar' ? 'rtl' : 'ltr';

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'dir' => $dir,
            'translations' => $this->loadTranslations($locale),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ];
    }

    private function resolveLocale(Request $request): string
    {
        $locale = app()->getLocale();

        if (in_array($locale, ['en', 'ar'], true)) {
            return $locale;
        }

        $fromRoute = $request->route('locale') ?? $request->segment(1);

        return in_array($fromRoute, ['en', 'ar'], true) ? $fromRoute : 'en';
    }

    private function loadTranslations(string $locale): array
    {
        $path = lang_path("{$locale}.json");

        if (! File::exists($path)) {
            return [];
        }

        return json_decode(File::get($path), true) ?? [];
    }
}
