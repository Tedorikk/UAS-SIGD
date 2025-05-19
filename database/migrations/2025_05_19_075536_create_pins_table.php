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
        Schema::create('pin', function (Blueprint $table) {
            $table->id('id_pin');
            $table->unsignedBigInteger('id_kk');
            $table->string('alamat');
            $table->json('koordinat');
            $table->timestamps();

            $table->foreign('id_kk')->references('id_kk')->on('kk');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pin');
    }
};
