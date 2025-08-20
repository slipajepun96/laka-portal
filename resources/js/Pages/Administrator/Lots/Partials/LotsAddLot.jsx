// import { Inertia } from '@inertiajs/inertia'; 
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
// import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useForm } from '@inertiajs/react';
// import { Input } from '@/Components/ui/input';
// import { Label } from '@/Components/ui/label';


export default function LotsAddLot({ }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        lot_num: '',
        lot_file_num: '',
        lot_description: '',
        lot_area_size: '',
        lot_current_administrator_uuid: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        console.log('onSuccess', data);

        post(route('lots.add'), {
            onSuccess: () => {
                reset(
                    'lot_num',
                    'lot_file_num',
                    'lot_description',
                    'lot_area_size',
                    'location_radius',
                    'lot_current_administrator_uuid',
                );
                // Close the dialog
                console.log('onSuccess', data);
                setIsDialogOpen(false);
            },
        });
    };
    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);

        if (!isOpen) {
            reset(
              'lot_num',
              'lot_file_num',
              'lot_description',
              'lot_area_size',
              'location_radius',
              'lot_current_administrator_uuid',
            );
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    Tambah Lot
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Tambah Lot</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="items-center space-y-2">
                        <div className="grid flex-1 gap-2">
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <InputLabel
                                        htmlFor="lot_num"
                                        value="Nombor Lot"
                                    />
                                    <TextInput
                                        id="lot_num"
                                        name="lot_num"
                                        value={data.lot_num}
                                        className="mt-1 block w-full"
                                        autoComplete="lot_num"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('lot_num', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.lot_num}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="lot_area_size"
                                        value="Keluasan Lot (hektar)"
                                    />
                                    <TextInput
                                        id="lot_area_size"
                                        name="lot_area_size"
                                        value={data.lot_area_size}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                'lot_area_size',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.lot_area_size}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="lot_file_num"
                                    value="No. Fail / Geran Lot"
                                />
                                <TextInput
                                    id="lot_file_num"
                                    name="lot_file_num"
                                    value={data.lot_file_num}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData(
                                            'lot_file_num',
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lot_file_num}
                                    className="mt-2"
                                />
                            </div>
                            
                                <div>
                                    <InputLabel
                                        htmlFor="lot_description"
                                        value="Catatan Lot"
                                    />
                                    <TextInput
                                        id="lot_description"
                                        name="lot_description"
                                        value={data.lot_description}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                'lot_description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.lot_description}
                                        className="mt-2"
                                    />
                                </div>
                                
                            <div>
                                <InputLabel
                                    htmlFor="lot_current_administrator_uuid"
                                    value="Pentadbir Lot Terkini"
                                />
                                <TextInput
                                    id="lot_current_administrator_uuid"
                                    name="lot_current_administrator_uuid"
                                    value={data.location_radius}
                                    className="mt-1 block w-full"
                                    autoComplete="lot_current_administrator_uuid"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            'lot_current_administrator_uuid',
                                            parseInt(e.target.value),
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.lot_current_administrator_uuid}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                {/* <MapContainer
                                    center={position}
                                    zoom={15}
                                    style={{ height: '200px', width: '100%', zIndex: 0 }}
                                    eventHandlers={{
                                        click: handleClick, // Use eventHandlers to capture clicks
                                    }}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker
                                        position={position}
                                        interactive={false}
                                    />
                                    <Circle
                                        center={position}
                                        radius={data.location_radius}
                                        interactive={false}
                                    />
                                  {(geofences || []).map((g) => (
                                        <Circle
                                            key={g.id || index}
                                            center={[
                                                parseFloat(g.location_latitude),
                                                parseFloat(
                                                    g.location_longitude,
                                                ),
                                            ]}
                                            radius={parseFloat(
                                                g.location_radius,
                                            )}
                                            pathOptions={{ color: 'green' }}
                                            interactive={false}
                                        />
                                    ))}
                                </MapContainer> */}
                            </div>
                        </div>
                        <PrimaryButton disabled={processing}>
                            Tambah
                        </PrimaryButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
