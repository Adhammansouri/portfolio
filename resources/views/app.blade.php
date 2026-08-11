<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="theme-color" content="#0B1220">
        <link rel="icon" href="/images/adham-mansour-logo.png?v=4" type="image/png">
        <link rel="apple-touch-icon" href="/images/adham-mansour-logo.png?v=4">

        <title inertia>{{ config('app.name', 'Adham Mansour') }}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap" rel="stylesheet">

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-paper text-ink">
        @inertia
    </body>
</html>
