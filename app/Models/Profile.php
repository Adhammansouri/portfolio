<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'photo_path', 'title', 'headline', 'bio', 'location',
        'email', 'phone', 'linkedin', 'github', 'availability',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'headline' => 'array',
            'bio' => 'array',
            'availability' => 'array',
        ];
    }

    public function toLocaleArray(?string $locale = null): array
    {
        $locale = $locale ?? app()->getLocale();

        return [
            'name' => $this->name,
            'photo_path' => $this->photo_path,
            'title' => $this->title[$locale] ?? $this->title['en'] ?? '',
            'headline' => $this->headline[$locale] ?? $this->headline['en'] ?? '',
            'bio' => $this->bio[$locale] ?? $this->bio['en'] ?? '',
            'location' => $this->location,
            'email' => $this->email,
            'phone' => $this->phone,
            'linkedin' => $this->linkedin,
            'github' => $this->github,
            'availability' => $this->availability[$locale] ?? $this->availability['en'] ?? '',
        ];
    }
}
