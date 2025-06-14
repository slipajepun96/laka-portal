<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Ownership extends Model
{
    use HasFactory, Notifiable;

    protected $keyType = 'string'; // Set the key type to UUID
    public $incrementing = false; // Disable auto-incrementing
   
    public static function booted()
    {
        static::creating(function($model)
        {
            $model->id = Str::uuid();
        });
    }

        /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'lot_id',
        'allottee_id',
        'ownership_type',
        'ownership_start_date',
        'ownership_end_date',
        'ownership_remarks',
    ];

    public function lot()
    {
        return $this->belongsTo(\App\Models\Lot::class, 'lot_id', 'id');
    }

    public function allottee()
    {
        return $this->belongsTo(\App\Models\Allottee::class, 'allottee_id', 'id');
    }
   
}
