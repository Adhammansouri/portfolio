<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /** @var list<string> */
    private array $supported = ['en', 'ar'];

    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->route('locale')
            ?? $request->segment(1);

        if (! in_array($locale, $this->supported, true)) {
            $locale = config('app.locale', 'en');
        }

        app()->setLocale($locale);
        $request->attributes->set('locale', $locale);

        return $next($request);
    }
}
