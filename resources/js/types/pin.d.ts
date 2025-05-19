import type { KK } from "./kk";

export interface Pin {
    id: number,
    id_kk: KK,
    alamat: string,
    koordinat: string | { lat: number, lng: number }, 
    created_at: Date,
    updated_at: Date
}