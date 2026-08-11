<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeadershipItem extends Model
{
    protected $fillable = ['title', 'organization', 'year', 'description', 'sort_order'];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'organization' => 'array',
            'description' => 'array',
        ];
    }

    public function toLocaleArray(?string $locale = null): array
    {
        $locale = $locale ?? app()->getLocale();

        return [
            'title' => $this->title[$locale] ?? $this->title['en'] ?? '',
            'organization' => $this->organization[$locale] ?? $this->organization['en'] ?? '',
            'year' => $this->year,
            'description' => $this->description[$locale] ?? $this->description['en'] ?? null,
        ];
    }
}
