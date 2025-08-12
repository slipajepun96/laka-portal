<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use App\Models\Lot;

class Allottee extends Model
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
        'allottee_nric',
        'allottee_name',
        'allottee_address',
        'allottee_phone_num',
        'allottee_email',
        'allottee_bank_name',
        'allottee_bank_acc_num',
        'allottee_is_dead',
        'allottee_dead_cert_num',
    ];

    public function lots()
    {
        return $this->belongsToMany(
            \App\Models\Lot::class,
            'ownerships',
            'allottee_id',
            'lot_id'
        )
        ->withPivot('ownership_type', 'ownership_start_date', 'ownership_end_date', 'ownership_remarks')
        ->withTimestamps();
    }

    public function ownerships()
    {
        return $this->hasMany(\App\Models\Ownership::class, 'allottee_id', 'id');
    }

    public function transactionlists()
    {
        return $this->hasMany(\App\Models\TransactionList::class, 'allottee_id', 'id');
    }

}
