<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = ['title', 'issuer', 'year', 'description', 'sort_order'];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'issuer' => 'array',
            'description' => 'array',
        ];
    }

    public function toLocaleArray(?string $locale = null): array
    {
        $locale = $locale ?? app()->getLocale();

        return [
            'title' => $this->title[$locale] ?? $this->title['en'] ?? '',
            'issuer' => $this->issuer[$locale] ?? $this->issuer['en'] ?? '',
            'year' => $this->year,
            'description' => $this->description[$locale] ?? $this->description['en'] ?? null,
        ];
    }
}
