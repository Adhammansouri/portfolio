<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'institution', 'degree', 'location', 'starts_on', 'ends_on', 'notes', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'institution' => 'array',
            'degree' => 'array',
            'notes' => 'array',
        ];
    }

    public function toLocaleArray(?string $locale = null): array
    {
        $locale = $locale ?? app()->getLocale();

        return [
            'institution' => $this->institution[$locale] ?? $this->institution['en'] ?? '',
            'degree' => $this->degree[$locale] ?? $this->degree['en'] ?? '',
            'location' => $this->location,
            'starts_on' => $this->starts_on,
            'ends_on' => $this->ends_on,
            'notes' => $this->notes[$locale] ?? $this->notes['en'] ?? null,
        ];
    }
}
