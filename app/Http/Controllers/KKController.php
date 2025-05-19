<?php

namespace App\Http\Controllers;

use App\Models\KK;
use App\Models\AnggotaKeluarga;
use App\Models\Pin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KKController extends Controller
{
    /**
     * Display a listing of KK.
     */
    public function index()
    {
        $kks = KK::all();
        
        return Inertia::render('kk/index', [
            'kks' => $kks
        ]);
    }

    /**
     * Show the form for creating a new KK.
     */
    public function create()
    {
        return Inertia::render('kk/create');
    }

    /**
     * Store a newly created KK.
     */
    public function post(Request $request)
    {
        $validated = $request->validate([
            'no_kk' => 'required|string|unique:kk,no_kk'
        ]);

        KK::create($validated);

        return redirect()->route('kk.index')
            ->with('success', 'Data KK berhasil ditambahkan');
    }

    /**
     * Show the form for editing KK.
     */
    public function edit($id)
    {
        $kk = KK::findOrFail($id);

        return Inertia::render('kk/edit', [
            'kk' => $kk
        ]);
    }

    /**
     * Update the specified KK.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:kk,id',
            'no_kk' => 'required|string|unique:kk,no_kk,' . $request->id
        ]);

        $kk = KK::findOrFail($request->id);
        $kk->update(['no_kk' => $validated['no_kk']]);

        return redirect()->route('kk.index')
            ->with('success', 'Data KK berhasil diperbarui');
    }

    /**
     * Remove the specified KK.
     */
    public function delete($id)
    {
        $kk = KK::findOrFail($id);
        $kk->delete();

        return redirect()->route('kk.index')
            ->with('success', 'Data KK berhasil dihapus');
    }

    /**
     * Display the specified KK.
     */
    public function show($id)
    {
        $kk = KK::findOrFail($id);
        $anggotaKeluarga = AnggotaKeluarga::where('id_kk', $id)->get();
        $pin = Pin::where('id_kk', $id)->first();

        return Inertia::render('kk/show', [
            'kk' => $kk,
            'anggotaKeluarga' => $anggotaKeluarga,
            'pin' => $pin
        ]);
    }
}
