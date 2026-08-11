<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Capability extends Model
{
    protected $fillable = ['title', 'description', 'sort_order'];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'description' => 'array',
        ];
    }

    public function toLocaleArray(?string $locale = null): array
    {
        $locale = $locale ?? app()->getLocale();

        return [
            'title' => $this->title[$locale] ?? $this->title['en'] ?? '',
            'description' => $this->description[$locale] ?? $this->description['en'] ?? '',
        ];
    }
}
