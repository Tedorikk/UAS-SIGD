import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Pin } from '@/types/pin';
import type { KK } from '@/types/kk';

// You'll need to add these imports to your project
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// Fix Leaflet typings using module augmentation instead of namespace
declare global {
  interface LeafletIconDefaultPrototype extends L.Icon.Default {
    _getIconUrl?: string;
  }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Koordinat = { lat: number; lng: number } | null;

export default function Dashboard({ pins }: { pins: Pin[] }) {
    const mapRef = useRef<L.Map | null>(null);
    const [position] = useState({ lat: -6.200000, lng: 106.816666 }); // Default Jakarta coordinates
    const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
    const [isAddingPin, setIsAddingPin] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [kkOptions, setKkOptions] = useState<KK[]>([]);

    const form = useForm<{
        id_kk: string;
        alamat: string;
        koordinat: Koordinat;
    }>({
        id_kk: '',
        alamat: '',
        koordinat: null
    });

    const editForm = useForm<{
        id: string;
        alamat: string;
        koordinat: Koordinat;
    }>({
        id: '',
        alamat: '',
        koordinat: null
    });

    // Fetch KK data for dropdown
    useEffect(() => {
        axios.get('/api/kk')
            .then(response => {
                setKkOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching KK data:', error);
            });
    }, []);

    useEffect(() => {
        // Fix Leaflet icon issues
        // @ts-expect-error - _getIconUrl exists at runtime but not in type definitions
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
        });

        if (mapLoaded && mapRef.current) {
            const map = mapRef.current;
            
            // Add click handler for adding new pins when in adding mode
            if (isAddingPin) {
                const clickHandler = (e: L.LeafletMouseEvent) => {
                    form.setData('koordinat', { lat: e.latlng.lat, lng: e.latlng.lng });
                    setIsDialogOpen(true);
                };
                
                map.on('click', clickHandler);
                
                return () => {
                    map.off('click', clickHandler);
                };
            }
        }
    }, [isAddingPin, mapLoaded, form]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        axios.post('/pin', {
            id_kk: form.data.id_kk,
            alamat: form.data.alamat,
            koordinat: JSON.stringify(form.data.koordinat)
        })
        .then(() => {
            setIsAddingPin(false);
            setIsDialogOpen(false);
            form.reset();
            // Refresh the pins data
            router.reload();
        })
        .catch(error => {
            console.error('Error adding pin:', error);
        });
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        axios.put('/pin', {
            id: editForm.data.id,
            alamat: editForm.data.alamat,
            koordinat: JSON.stringify(editForm.data.koordinat)
        })
        .then(() => {
            setSelectedPin(null);
            setIsDialogOpen(false);
            editForm.reset();
            // Refresh the pins data
            router.reload();
        })
        .catch(error => {
            console.error('Error updating pin:', error);
        });
    };

    const handleDelete = (pinId: number) => {
        if (confirm('Are you sure you want to delete this pin?')) {
            axios.delete('/pin', { data: { id: pinId } })
                .then(() => {
                    setSelectedPin(null);
                    // Refresh the pins data
                    router.reload();
                })
                .catch(error => {
                    console.error('Error deleting pin:', error);
                });
        }
    };

    const handleMarkerClick = (pin: Pin) => {
        setSelectedPin(pin);
        editForm.setData({
            id: String(pin.id),
            alamat: pin.alamat,
            koordinat: typeof pin.koordinat === 'string' 
                ? JSON.parse(pin.koordinat) 
                : pin.koordinat as unknown as Koordinat
        });
    };

    // Parse koordinat based on its type
    const getCoordinates = (pin: Pin) => {
        if (typeof pin.koordinat === 'string') {
            return JSON.parse(pin.koordinat);
        }
        return pin.koordinat as unknown as { lat: number, lng: number };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between mb-4 items-center">
                    <h1 className="text-2xl font-bold items-center">Map</h1>
                    <div>
                        <Button 
                            onClick={() => setIsAddingPin(!isAddingPin)} 
                            variant={isAddingPin ? "destructive" : "default"}
                        >
                            {isAddingPin ? 'Cancel' : 'Add Pin'}
                        </Button>
                    </div>
                </div>

                <div className="h-[600px] w-full rounded-4xl border">
                    <MapContainer 
                        center={position} 
                        zoom={13} 
                        style={{ height: '100%', width: '100%' }}
                        ref={mapRef}
                        whenReady={() => setMapLoaded(true)}
                        className='rounded-4xl'
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {pins && pins.map(pin => (
                            <Marker 
                                key={pin.id} 
                                position={getCoordinates(pin)}
                                eventHandlers={{
                                    click: () => handleMarkerClick(pin),
                                }}
                            >
                                <Popup>
                                    <div>
                                        <p><strong>Address:</strong> {pin.alamat}</p>
                                        <p><strong>KK No:</strong> {pin.id_kk.no_kk}</p>
                                        <div className="flex gap-2 mt-2">
                                            <Button 
                                                size="sm"
                                                onClick={() => setIsDialogOpen(true)}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="destructive"
                                                onClick={() => handleDelete(pin.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
                
                {/* Form Dialog for Adding New Pin */}
                <Dialog 
                    open={isDialogOpen && selectedPin === null} 
                    onOpenChange={(open) => setIsDialogOpen(open)}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Pin</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right">KK ID</label>
                                    <select 
                                        id="id_kk" 
                                        className="col-span-3 p-2 border rounded" 
                                        value={form.data.id_kk} 
                                        onChange={e => form.setData('id_kk', e.target.value)}
                                        required
                                    >
                                        <option value="">Select KK</option>
                                        {kkOptions.map(kk => (
                                            <option key={kk.id} value={kk.id}>{kk.no_kk}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right">Address</label>
                                    <Input 
                                        id="alamat" 
                                        className="col-span-3" 
                                        value={form.data.alamat} 
                                        onChange={e => form.setData('alamat', e.target.value)}
                                        required
                                    />
                                </div>
                                {form.data.koordinat && (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right">Coordinates</label>
                                        <div className="col-span-3">
                                            Lat: {form.data.koordinat.lat.toFixed(6)}, 
                                            Lng: {form.data.koordinat.lng.toFixed(6)}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={!form.data.koordinat}>Save Pin</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                
                {/* Form Dialog for Editing Pin */}
                <Dialog 
                    open={isDialogOpen && selectedPin !== null} 
                    onOpenChange={(open) => setIsDialogOpen(open)}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Pin</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right">Address</label>
                                    <Input 
                                        id="alamat" 
                                        className="col-span-3" 
                                        value={editForm.data.alamat} 
                                        onChange={e => editForm.setData('alamat', e.target.value)}
                                        required
                                    />
                                </div>
                                {editForm.data.koordinat && (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right">Coordinates</label>
                                        <div className="col-span-3">
                                            Lat: {editForm.data.koordinat.lat.toFixed(6)}, 
                                            Lng: {editForm.data.koordinat.lng.toFixed(6)}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Update Pin</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
