import { KK } from "./kk"

export interface anggota_keluarga {
    id: number,
    id_kk: KK,
    nik: string,
    nama: string,
    jenis_kelamin: string,
    tempat_lahir: string,
    tanggal_lahir: string,
    agama: string,
    status: string,
    hubungan: string,
    pendidikan: string,
    pekerjaan: string,
}