<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KK extends Model
{
    protected $table = 'kk';

    protected $fillable = ['no_kk'];

    public function Pin()
    {
        return $this->hasOne(Pin::class);
    }
}
