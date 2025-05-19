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
            $table->id('id');
            $table->unsignedBigInteger('id_kk');
            $table->string('nama');
            $table->string('nik');
            $table->enum('jenis_kelamin', ['P', 'L']);
            $table->string('tempat_lahir');
            $table->date('tgl_lahir');
            $table->enum('agama', ['Islam', 'Katholik', 'Kristen Protestan', 'Buddha', 'KongHuChu', 'Hindu']);
            $table->enum('status', ['kawin', 'belum kawin', 'cerai hidup', 'cerai mati']);
            $table->string('hubungan');
            $table->string('pendidikan');
            $table->string('pekerjaan');

            $table->timestamps();

            $table->foreign('id_kk')->references('id')->on('kk');
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
