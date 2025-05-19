// resources/js/Pages/KK/Edit.jsx
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
    title: 'Edit',
    href: '#',
  },
];

export default function Edit({ kk }: { kk: KK }) {
  const { data, setData, put, processing, errors } = useForm({
    id: kk.id,
    no_kk: kk.no_kk,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put('/kk');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit KK ${kk.no_kk}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold">Edit KK</h1>
        
        <div className="rounded-md border p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">No. KK</label>
                <div className="col-span-3">
                  <Input 
                    value={data.no_kk}
                    onChange={e => setData('no_kk', e.target.value)}
                    required
                  />
                  {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk}</p>}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Link href="/kk">
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
