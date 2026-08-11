<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'slug', 'category', 'featured', 'sort_order', 'stack', 'links', 'cover', 'year',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'stack' => 'array',
            'links' => 'array',
        ];
    }

    public function translations(): HasMany
    {
        return $this->hasMany(ProjectTranslation::class);
    }

    public function translation(?string $locale = null): ?ProjectTranslation
    {
        $locale = $locale ?? app()->getLocale();

        return $this->translations->firstWhere('locale', $locale)
            ?? $this->translations->firstWhere('locale', 'en');
    }

    public function toLocaleArray(?string $locale = null): array
    {
        $t = $this->translation($locale);

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'category' => $this->category,
            'featured' => $this->featured,
            'stack' => $this->stack ?? [],
            'links' => $this->links ?? [],
            'cover' => $this->cover,
            'year' => $this->year,
            'title' => $t?->title,
            'tagline' => $t?->tagline,
            'summary' => $t?->summary,
            'body_md' => $t?->body_md,
            'challenge' => $t?->challenge,
            'solution' => $t?->solution,
            'results' => $t?->results,
        ];
    }
}
