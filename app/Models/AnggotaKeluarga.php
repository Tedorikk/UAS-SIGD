<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnggotaKeluarga extends Model
{
    protected $table = 'anggota_keluarga';

    protected $fillable = [
        'nama',
        'agama',
        'status',
        'pekerjaan',
        'tempat_lahir',
        'tanggal_lahir'
    ];
}
