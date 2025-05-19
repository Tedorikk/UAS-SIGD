<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('anggota_keluarga', function (Blueprint $table) {
            $table->id('id_anggota');
            $table->unsignedBigInteger('id_kk');
            $table->string('nama');
            $table->enum('agama', ['Islam', 'Katholik', 'Kristen Protestan', 'Buddha', 'KongHuChu', 'Hindu']);
            $table->enum('status', ['kawin', 'belum kawin', 'cerai hidup', 'cerai mati']);
            $table->string('pekerjaan');
            $table->string('tempat_lahir');
            $table->date('tgl_lahir');
            $table->timestamps();

            $table->foreign('id_kk')->references('id_kk')->on('kk');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_keluarga');
    }
};
