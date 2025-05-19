// resources/js/Pages/AnggotaKeluarga/Show.jsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { KK } from '@/types/kk';
import { anggota_keluarga } from '@/types/anggota-keluarga';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'KK',
    href: '/kk',
  },
  {
    title: 'Family Member Detail',
    href: '#',
  },
];

export default function Show({ anggota, kk }: { anggota: anggota_keluarga, kk: KK }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Family Member: ${anggota.nama}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex justify-between mb-4 items-center">
          <h1 className="text-2xl font-bold">Family Member: {anggota.nama}</h1>
          <div className="space-x-2">
            <Link href={`/anggota/${anggota.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Link href={`/kk/${kk.id}`}>
              <Button variant="outline">Back to KK</Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-md border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">KK Number</h3>
              <p className="mt-1">{kk.no_kk}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">NIK</h3>
              <p className="mt-1">{anggota.nik}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1">{anggota.nama}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Gender</h3>
              <p className="mt-1">{anggota.jenis_kelamin === 'L' ? 'Male' : 'Female'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Birth</h3>
              <p className="mt-1">{anggota.tempat_lahir}, {anggota.tanggal_lahir}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Religion</h3>
              <p className="mt-1">{anggota.agama}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1">{anggota.status}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Relationship</h3>
              <p className="mt-1">{anggota.hubungan}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Education</h3>
              <p className="mt-1">{anggota.pendidikan}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Occupation</h3>
              <p className="mt-1">{anggota.pekerjaan}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
