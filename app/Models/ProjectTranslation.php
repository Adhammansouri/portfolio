<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectTranslation extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'project_id', 'locale', 'title', 'tagline', 'summary', 'body_md',
        'challenge', 'solution', 'results',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
