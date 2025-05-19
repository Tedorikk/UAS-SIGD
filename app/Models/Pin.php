<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pin extends Model
{
    protected $table = 'pins';

    protected $fillable = [
        'alamat',
        'koordinat',
        'id_kk'
    ];

    public function kk()
    {
        return $this->belongsTo(KK::class, 'id_kk');
    }
}
