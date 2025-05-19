// resources/js/Pages/AnggotaKeluarga/Edit.jsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    title: 'Edit Family Member',
    href: '#',
  },
];

export default function Edit({ anggota, kks }: { anggota: anggota_keluarga, kks: KK[] }) {
  const { data, setData, put, processing, errors } = useForm({
    id: anggota.id,
    id_kk: anggota.id_kk.id,
    nik: anggota.nik,
    nama: anggota.nama,
    jenis_kelamin: anggota.jenis_kelamin,
    tempat_lahir: anggota.tempat_lahir,
    tanggal_lahir: anggota.tanggal_lahir,
    agama: anggota.agama,
    status: anggota.status,
    hubungan: anggota.hubungan,
    pendidikan: anggota.pendidikan,
    pekerjaan: anggota.pekerjaan,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put('/anggota');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit: ${anggota.nama}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold">Edit Family Member</h1>
        
        <div className="rounded-md border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">KK</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={data.id_kk} 
                  onChange={e => setData('id_kk', Number(e.target.value))}
                  required
                >
                  <option value="">Select KK</option>
                  {kks.map((kk) => (
                    <option key={kk.id} value={kk.id}>{kk.no_kk}</option>
                  ))}
                </select>
                {errors.id_kk && <p className="text-red-500 text-sm mt-1">{errors.id_kk}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">NIK</label>
                <Input 
                  value={data.nik}
                  onChange={e => setData('nik', e.target.value)}
                  required
                />
                {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik}</p>}
              </div>

              {/* Repeat other fields similar to the Create view */}
              {/* ... */}

              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input 
                  value={data.nama}
                  onChange={e => setData('nama', e.target.value)}
                  required
                />
                {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={data.jenis_kelamin} 
                  onChange={e => setData('jenis_kelamin', e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="L">Male</option>
                  <option value="P">Female</option>
                </select>
                {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</p>}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Link href={`/kk/${data.id_kk}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={processing}>Update</Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
