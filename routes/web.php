<?php

use App\Http\Controllers\KKController;
use App\Http\Controllers\AnggotaKeluargaController;
use App\Http\Controllers\MapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn (MapController $controller) => $controller->index())->name('dashboard');

    // KK Routes
    Route::get('/kk', [KKController::class, 'index'])->name('kk.index');
    Route::get('/kk/create', [KKController::class, 'create'])->name('kk.create');
    Route::post('/kk', [KKController::class, 'post'])->name('kk.post');
    Route::get('/kk/{id}/edit', [KKController::class, 'edit'])->name('kk.edit');
    Route::put('/kk', [KKController::class, 'update'])->name('kk.update');
    Route::delete('/kk/{id}', [KKController::class, 'delete'])->name('kk.delete');
    Route::get('/kk/{id}', [KKController::class, 'show'])->name('kk.show');

    // Anggota Keluarga Routes
    Route::get('/anggota/create', [AnggotaKeluargaController::class, 'create'])->name('anggota.create');
    Route::post('/anggota', [AnggotaKeluargaController::class, 'post'])->name('anggota.post');
    Route::get('/anggota/{id}/edit', [AnggotaKeluargaController::class, 'edit'])->name('anggota.edit');
    Route::put('/anggota', [AnggotaKeluargaController::class, 'update'])->name('anggota.update');
    Route::delete('/anggota/{id}', [AnggotaKeluargaController::class, 'delete'])->name('anggota.delete');
    Route::get('/anggota/{id}', [AnggotaKeluargaController::class, 'show'])->name('anggota.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
