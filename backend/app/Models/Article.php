<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'original_content',
        'source_url',
        'is_updated',
        'references',
    ];

    protected $casts = [
        'references' => 'array',
        'is_updated' => 'boolean',
    ];
}
