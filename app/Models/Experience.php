<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company', 'role', 'employment_type', 'location', 'starts_on', 'ends_on',
        'is_current', 'bullets', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'role' => 'array',
            'bullets' => 'array',
            'is_current' => 'boolean',
            'starts_on' => 'date',
            'ends_on' => 'date',
        ];
    }

    public function toLocaleArray(?string $locale = null): array
    {
        $locale = $locale ?? app()->getLocale();
        $bullets = $this->bullets[$locale] ?? $this->bullets['en'] ?? [];

        return [
            'id' => $this->id,
            'company' => $this->company,
            'role' => $this->role[$locale] ?? $this->role['en'] ?? '',
            'employment_type' => $this->employment_type,
            'location' => $this->location,
            'starts_on' => $this->starts_on?->format('Y-m'),
            'ends_on' => $this->ends_on?->format('Y-m'),
            'is_current' => $this->is_current,
            'bullets' => $bullets,
        ];
    }
}
