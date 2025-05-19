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
        Schema::create('pins', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('id_kk');
            $table->string('alamat');
            $table->json('koordinat');
            $table->timestamps();

            $table->foreign('id_kk')->references('id')->on('kk');
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
