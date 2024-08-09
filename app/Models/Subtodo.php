<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtodo extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'isDone',
        'todo_uuid'
    ];
}