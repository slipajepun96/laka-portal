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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"


export default function AllotteeAdd({ }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        allottee_nric: '',
        allottee_name: '',
        allottee_address: '',
        allottee_phone_num: '',
        allottee_email: '',
        allottee_bank_name: '',
        allottee_bank_acc_num: '',
        allottee_is_dead: '',
        allottee_dead_cert_num: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        console.log('onSuccess', data);

        post(route('allottee.add'), {
            onSuccess: () => {
                reset(
                    'allottee_nric',
                    'allottee_name',
                    'allottee_address',
                    'allottee_phone_num',
                    'allottee_email',
                    'allottee_bank_name',
                    'allottee_bank_acc_num',
                    'allottee_is_dead',
                    'allottee_dead_cert_num',
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
                'allottee_nric',
                'allottee_name',
                'allottee_address',
                'allottee_phone_num',
                'allottee_email',
                'allottee_bank_name',
                'allottee_bank_acc_num',
                'allottee_is_dead',
                'allottee_dead_cert_num',
            );
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    Tambah Peserta / Pentadbir
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Tambah Peserta / Pentadbir</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="items-center space-y-2">
                        <div className="grid flex-1 gap-2">
                            <div>
                                <InputLabel
                                    htmlFor="allottee_name"
                                    value="Nama"
                                />
                                <TextInput
                                    id="allottee_name"
                                    name="allottee_name"
                                    value={data.allottee_name}
                                    className="mt-1 block w-full"
                                    autoComplete="allottee_name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('allottee_name', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.allottee_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <InputLabel
                                        htmlFor="allottee_nric"
                                        value="No. Kad Pengenalan"
                                    />
                                    <TextInput
                                        id="allottee_nric"
                                        name="allottee_nric"
                                        value={data.allottee_nric}
                                        className="mt-1 block w-full"
                                        autoComplete="allottee_nric"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('allottee_nric', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.allottee_nric}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="allottee_phone_num"
                                        value="No. Telefon"
                                    />
                                    <TextInput
                                        id="allottee_phone_num"
                                        name="allottee_phone_num"
                                        value={data.allottee_phone_num}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                'allottee_phone_num',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.allottee_phone_num}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="allottee_email"
                                    value="Alamat E-Mel"
                                />
                                <TextInput
                                    id="allottee_email"
                                    name="allottee_email"
                                    value={data.allottee_email}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData(
                                            'allottee_email',
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.allottee_email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="allottee_address"
                                    value="Alamat Rumah"
                                />
                                <TextInput
                                    id="allottee_address"
                                    name="allottee_address"
                                    value={data.allottee_address}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData(
                                            'allottee_address',
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.allottee_address}
                                    className="mt-2"
                                />
                            </div>
                            
                            <div>
                                <InputLabel
                                    htmlFor="allottee_bank_name"
                                    value="Nama Bank"
                                />
                                <Select
                                    onValueChange={(value) =>
                                        setData('allottee_bank_name', value)
                                }>
                                    <SelectTrigger className="w-[180px] w-full">
                                        <SelectValue placeholder="Sila pilih bank" />
                                    </SelectTrigger>
                                    <SelectContent 
                                        id="allottee_bank_name"
                                        name="allottee_bank_name"
                                    >
                                        <SelectItem value="Maybank">Maybank</SelectItem>
                                        <SelectItem value="Maybank Islamic">Maybank Islamic</SelectItem>
                                        <SelectItem value="CIMB Bank">CIMB Bank</SelectItem>
                                        <SelectItem value="Public Bank">Public Bank</SelectItem>
                                        <SelectItem value="RHB Bank">RHB Bank</SelectItem>
                                        <SelectItem value="Bank Simpanan Nasional">Bank Simpanan Nasional</SelectItem>
                                        <SelectItem value="Hong Leong Bank">Hong Leong Bank</SelectItem>
                                        <SelectItem value="AmBank">AmBank</SelectItem>
                                        <SelectItem value="Bank Islam">Bank Islam</SelectItem>
                                        <SelectItem value="Bank Rakyat">Bank Rakyat</SelectItem>
                                        <SelectItem value="Affin Bank">Affin Bank</SelectItem>
                                        <SelectItem value="Alliance Bank">Alliance Bank</SelectItem>
                                        <SelectItem value="HSBC Bank">HSBC Bank</SelectItem>
                                        <SelectItem value="Standard Chartered Bank">Standard Chartered Bank</SelectItem>
                                        <SelectItem value="OCBC Bank">OCBC Bank</SelectItem>
                                        <SelectItem value="UOB Bank">UOB Bank</SelectItem>
                                        <SelectItem value="AgroBank">AgroBank</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.allottee_bank_name}
                                    className="mt-2"
                                />
                            </div>
                                
                            <div>
                                <InputLabel
                                    htmlFor="allottee_bank_acc_num"
                                    value="No. Akaun Bank"
                                />
                                <TextInput
                                    id="allottee_bank_acc_num"
                                    name="allottee_bank_acc_num"
                                    value={data.allottee_bank_acc_num}
                                    className="mt-1 block w-full"
                                    autoComplete="allottee_bank_acc_num"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            'allottee_bank_acc_num',
                                            parseInt(e.target.value),
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.allottee_bank_acc_num}
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
