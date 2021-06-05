<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Travelpost extends Model
{
    use HasFactory;

    protected $fillable = [
        'region',
        'country',
        'title',
        'image',
        'latitude',
        'longitude'
    ];
}
