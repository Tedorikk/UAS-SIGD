// resources/js/Pages/KK/Index.jsx
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
import type { KK } from '@/types/kk';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'KK',
    href: '/kk',
  },
];

export default function Index({ kks }: { kks: KK[] }) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this KK?')) {
      router.delete(`/kk/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="KK Management" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex justify-between mb-4 items-center">
          <h1 className="text-2xl font-bold">Kartu Keluarga</h1>
          <Link href="/kk/create">
            <Button>Add New KK</Button>
          </Link>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>No. KK</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kks.map((kk) => (
                <TableRow key={kk.id}>
                  <TableCell>{kk.id}</TableCell>
                  <TableCell>{kk.no_kk}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/kk/${kk.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    <Link href={`/kk/${kk.id}/edit`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      onClick={() => handleDelete(kk.id)}
                      variant="destructive" 
                      size="sm"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
