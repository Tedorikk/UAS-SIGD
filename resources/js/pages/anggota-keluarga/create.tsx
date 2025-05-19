// resources/js/Pages/AnggotaKeluarga/Create.jsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KK } from '@/types/kk';

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
    title: 'Add Family Member',
    href: '#',
  },
];

export default function Create({ kks }: { kks: KK[] }) {
  const { data, setData, post, processing, errors } = useForm({
    id_kk: '',
    nik: '',
    nama: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: '',
    status: '',
    hubungan: '',
    pendidikan: '',
    pekerjaan: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/anggota');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Family Member" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold">Add Family Member</h1>
        
        <div className="rounded-md border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">KK</label>
                <select 
                  className="w-full p-2 border rounded" 
                  value={data.id_kk} 
                  onChange={e => setData('id_kk', e.target.value)}
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

              <div>
                <label className="block text-sm font-medium mb-1">Birth Place</label>
                <Input 
                  value={data.tempat_lahir}
                  onChange={e => setData('tempat_lahir', e.target.value)}
                  required
                />
                {errors.tempat_lahir && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Birth Date</label>
                <Input 
                  type="date"
                  value={data.tanggal_lahir}
                  onChange={e => setData('tanggal_lahir', e.target.value)}
                  required
                />
                {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Religion</label>
                <Input 
                  value={data.agama}
                  onChange={e => setData('agama', e.target.value)}
                  required
                />
                {errors.agama && <p className="text-red-500 text-sm mt-1">{errors.agama}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Input 
                  value={data.status}
                  onChange={e => setData('status', e.target.value)}
                  required
                />
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Relationship</label>
                <Input 
                  value={data.hubungan}
                  onChange={e => setData('hubungan', e.target.value)}
                  required
                />
                {errors.hubungan && <p className="text-red-500 text-sm mt-1">{errors.hubungan}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Education</label>
                <Input 
                  value={data.pendidikan}
                  onChange={e => setData('pendidikan', e.target.value)}
                  required
                />
                {errors.pendidikan && <p className="text-red-500 text-sm mt-1">{errors.pendidikan}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Occupation</label>
                <Input 
                  value={data.pekerjaan}
                  onChange={e => setData('pekerjaan', e.target.value)}
                  required
                />
                {errors.pekerjaan && <p className="text-red-500 text-sm mt-1">{errors.pekerjaan}</p>}
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Link
                href="/kk"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Cancel
              </Link>
              <Button type="submit" disabled={processing}>Save</Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
