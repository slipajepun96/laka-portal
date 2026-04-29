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
import { useForm } from '@inertiajs/react';


export default function LotsEditLot({ lot }) {
    // console.log(lot);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: lot.id ,
        lot_num: lot.lot_num || '',
        lot_file_num: lot.lot_file_num || '',
        lot_ownership_num: lot.lot_ownership_num || '',
        lot_description: lot.lot_description || '',
        lot_area_size: lot.lot_area_size || '',
        lot_current_administrator_uuid: lot.lot_current_administrator_uuid || '',
    });

    useEffect(() => {
        setData({
            id: lot.id,
            lot_num: lot.lot_num,
            lot_file_num: lot.lot_file_num,
            lot_ownership_num: lot.lot_ownership_num,
            lot_description: lot.lot_description,
            lot_area_size: lot.lot_area_size,
            lot_current_administrator_uuid: lot.lot_current_administrator_uuid,
        });
    }, [lot, setData]);



    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();

        post(route('lots.edit'), {
            onSuccess: () => {
                setIsDialogOpen(false);
                reset(
                    'id',
                    'lot_num',
                    'lot_file_num',
                    'lot_ownership_num',
                    'lot_description',
                    'lot_area_size',
                    'lot_current_administrator_uuid',
                );
            },
        });
    };
    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);

        if (!isOpen) {
            reset(
                'id',
                'lot_num',
                'lot_file_num',
                'lot_ownership_num',
                'lot_description',
                'lot_area_size',
                'lot_current_administrator_uuid',
            );
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                     Lot
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Lot</DialogTitle>
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
                                        value={data.lot_num || ""}
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
                                        value={data.lot_area_size || ""}
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
                                    value="No. Fail Lot"
                                />
                                <TextInput
                                    id="lot_file_num"
                                    name="lot_file_num"
                                    value={data.lot_file_num || ""}
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
                                    htmlFor="lot_ownership_num"
                                    value="No. Geran Lot"
                                />
                                <TextInput
                                    id="lot_ownership_num"
                                    name="lot_ownership_num"
                                    value={data.lot_ownership_num || ""}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData(
                                            'lot_ownership_num',
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
                                        value={data.lot_description || ""}
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
                                
                            {/* <div>
                                <InputLabel
                                    htmlFor="lot_current_administrator_uuid"
                                    value="Pentadbir Lot Terkini"
                                />
                                <TextInput
                                    id="lot_current_administrator_uuid"
                                    name="lot_current_administrator_uuid"
                                    value={data.location_radius || ""}
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
                            </div> */}
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
                            Simpan 
                        </PrimaryButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
