<?php

namespace App\Http\Controllers;

use App\Models\AnggotaKeluarga;
use App\Models\KK;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaKeluargaController extends Controller
{
    /**
     * Show the form for creating a new family member.
     */
    public function create()
    {
        $kks = KK::all();
        
        return Inertia::render('anggota-keluarga/create', [
            'kks' => $kks
        ]);
    }

    /**
     * Store a newly created family member.
     */
    public function post(Request $request)
    {
        $validated = $request->validate([
            'id_kk' => 'required|exists:kk,id',
            'nik' => 'required|string|unique:anggota_keluarga,nik',
            'nama' => 'required|string',
            'jenis_kelamin' => 'required|string|in:L,P',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'agama' => 'required|string',
            'status' => 'required|string',
            'hubungan' => 'required|string',
            'pendidikan' => 'required|string',
            'pekerjaan' => 'required|string'
        ]);

        AnggotaKeluarga::create($validated);

        return redirect()->route('kk.show', $request->id_kk)
            ->with('success', 'Data anggota keluarga berhasil ditambahkan');
    }

    /**
     * Show the form for editing a family member.
     */
    public function edit($id)
    {
        $anggota = AnggotaKeluarga::findOrFail($id);
        $kks = KK::all();

        return Inertia::render('anggota-keluarga/edit', [
            'anggota' => $anggota,
            'kks' => $kks
        ]);
    }

    /**
     * Update the specified family member.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:anggota_keluarga,id',
            'id_kk' => 'required|exists:kk,id',
            'nik' => 'required|string|unique:anggota_keluarga,nik,' . $request->id,
            'nama' => 'required|string',
            'jenis_kelamin' => 'required|string|in:L,P',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'agama' => 'required|string',
            'status' => 'required|string',
            'hubungan' => 'required|string',
            'pendidikan' => 'required|string',
            'pekerjaan' => 'required|string'
        ]);

        $anggota = AnggotaKeluarga::findOrFail($request->id);
        $anggota->update($validated);

        return redirect()->route('kk.show', $request->id_kk)
            ->with('success', 'Data anggota keluarga berhasil diperbarui');
    }

    /**
     * Remove the specified family member.
     */
    public function delete($id)
    {
        $anggota = AnggotaKeluarga::findOrFail($id);
        $kkId = $anggota->id_kk;
        $anggota->delete();

        return redirect()->route('kk.show', $kkId)
            ->with('success', 'Data anggota keluarga berhasil dihapus');
    }

    /**
     * Display the specified family member.
     */
    public function show($id)
    {
        $anggota = AnggotaKeluarga::findOrFail($id);
        $kk = KK::findOrFail($anggota->id_kk);

        return Inertia::render('anggota-keluarga/show', [
            'anggota' => $anggota,
            'kk' => $kk
        ]);
    }
}
