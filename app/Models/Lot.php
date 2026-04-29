<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use App\Models\Allottee;

class Lot extends Model
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
        'lot_num',
        'lot_file_num',
        'lot_description',
        'lot_area_size',
        'location_radius',
        'lot_current_administrator_uuid',
    ];

    public function allottees()
    {
        return $this->belongsToMany(
            \App\Models\Allottee::class,           // Related model
            'ownerships',                          // Pivot table
            'lot_id',                              // Foreign key on pivot table for this model
            'allottee_id'                          // Foreign key on pivot table for related model
        )
        ->withPivot('ownership_type', 'ownership_start_date', 'ownership_end_date', 'ownership_remarks')
        ->withTimestamps();
    }

    public function ownerships()
    {
        return $this->hasMany(\App\Models\Ownership::class, 'lot_id', 'id');
    }

    public function transactionlists()
    {
        return $this->hasMany(\App\Models\TransactionList::class, 'lot_id', 'id');
    }

}
