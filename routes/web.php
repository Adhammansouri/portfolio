<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/resume', CvController::class)->name('cv.download');

Route::redirect('/', '/en');

Route::prefix('{locale}')
    ->whereIn('locale', ['en', 'ar'])
    ->group(function () {
        Route::get('/', HomeController::class)->name('home');
        Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
        Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');
        Route::get('/experience', ExperienceController::class)->name('experience');
        Route::get('/about', AboutController::class)->name('about');
        Route::get('/contact', [ContactController::class, 'create'])->name('contact');
        Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
    });
