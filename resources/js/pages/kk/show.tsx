// resources/js/Pages/KK/Show.jsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { KK } from '@/types/kk';
import { anggota_keluarga } from '@/types/anggota-keluarga';
import { Pin } from '@/types/pin';

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
    title: 'Detail',
    href: '#',
  },
];

export default function Show({ kk, anggotaKeluarga, pin }: { kk: KK, anggotaKeluarga: anggota_keluarga[], pin: Pin }) {
  const handleDeleteAnggota = (id: number) => {
    if (confirm('Are you sure you want to delete this family member?')) {
      router.delete(`/anggota/${id}`);
    }
  };

  // Parse koordinat if pin exists
  const getCoordinates = () => {
    if (!pin) return null;
    
    if (typeof pin.koordinat === 'string') {
      return JSON.parse(pin.koordinat);
    }
    return pin.koordinat;
  };

  const coordinates = getCoordinates();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`KK Detail: ${kk.no_kk}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex justify-between mb-4 items-center">
          <h1 className="text-2xl font-bold">KK Detail: {kk.no_kk}</h1>
          <div className="space-x-2">
            <Link href={`/kk/${kk.id}/edit`}>
              <Button variant="outline">Edit KK</Button>
            </Link>
            <Link href={`/anggota/create?kk_id=${kk.id}`}>
              <Button>Add Family Member</Button>
            </Link>
          </div>
        </div>

        {/* Pin location if available */}
        {coordinates && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <div className="h-[300px] w-full rounded-md border">
              <MapContainer 
                center={coordinates}
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
                className="rounded-md"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coordinates}>
                  <Popup>
                    <div>
                      <p><strong>Address:</strong> {pin.alamat}</p>
                      <p><strong>KK No:</strong> {kk.no_kk}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <p className="mt-2 text-gray-600">Address: {pin.alamat}</p>
          </div>
        )}

        {/* Family members table */}
        <h2 className="text-xl font-semibold mb-2">Family Members</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIK</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anggotaKeluarga.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No family members found
                  </TableCell>
                </TableRow>
              ) : (
                anggotaKeluarga.map((anggota) => (
                  <TableRow key={anggota.id}>
                    <TableCell>{anggota.nik}</TableCell>
                    <TableCell>{anggota.nama}</TableCell>
                    <TableCell>{anggota.jenis_kelamin === 'L' ? 'Male' : 'Female'}</TableCell>
                    <TableCell>{anggota.hubungan}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/anggota/${anggota.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Link href={`/anggota/${anggota.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button 
                        onClick={() => handleDeleteAnggota(anggota.id)}
                        variant="destructive" 
                        size="sm"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
