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
} from '@/components/ui/dialog';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useForm } from '@inertiajs/react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';


export default function LotsAddAllottee({ allottees, lot }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        // lot_id: lot.id || '', 
        lot_id: '', 
        allottee_id: '',
        ownership_type: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedAllottee, setSelectedAllottee] = useState(null);

    const filteredAllottees = allottees.filter((allottee) =>
        allottee.allottee_name.toLowerCase().includes(search.toLowerCase()) ||
        allottee.allottee_nric.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectAllottee = (allottee) => {
        setSelectedAllottee(allottee);
        setData('allottee_id', allottee.id); // Set the selected allottee's ID
    };



    const submit = (e) => {
        e.preventDefault();
        // console.log('onSuccess', data);

        post(route('lots.add-allottee'), {
            onSuccess: () => {
                reset(
                    'lot_id',
                    'allottee_id',
                    'ownership_type',
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
              'lot_id',
              'allottee_id',
              'ownership_type',
            );
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline" className="bg-green-700 hover:bg-green-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                     Peserta
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Peserta / Pentadbir Bagi Lot {lot.lot_num}</DialogTitle>
                </DialogHeader>
                <div class="flex flex-row space-x-4">
                    <div className="w-full">
                        <form onSubmit={submit}>  
                            <div className="items-center space-y-2">
                                <div className="grid flex-1 gap-2">
                                    <div>
                                        <InputLabel htmlFor="search_allottee" value="Cari Peserta / Pentadbir" />
                                        <TextInput
                                            id="search_allottee"
                                            name="search_allottee"
                                            value={search}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Cari nama atau NRIC"
                                        />
                                        <InputLabel htmlFor="search_allottee" value="Pilih Peserta / Pentadbir" className='mt-2'/>
                                        <div className=" max-h-40 overflow-y-auto border border-gray-300 rounded-md">
                                            
                                            {filteredAllottees.map((allottee) => (
                                                <div
                                                    key={allottee.id}
                                                    className={`p-2 cursor-pointer hover:bg-blue-100 ${
                                                        selectedAllottee?.id === allottee.id ? 'bg-blue-300' : ''
                                                    }`}
                                                    onClick={() => handleSelectAllottee(allottee)}
                                                >
                                                    <div className="font-medium">{allottee.allottee_name}</div>
                                                    <div className="text-sm text-gray-500">{allottee.allottee_nric}</div>
                                                </div>
                                            ))}
                                            {filteredAllottees.length === 0 && (
                                                <div className="p-2 text-sm text-gray-500">Tiada peserta ditemukan.</div>
                                            )}
                                        </div>
                                        <InputError message={errors.allottee_id} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="ownership_type"
                                            value="Jenis Pemilikan"
                                        />
                                        <Select
                                            onValueChange={(value) =>
                                                setData('ownership_type', value)
                                        }
                                        required>
                                            <SelectTrigger className="w-[180px] w-full">
                                                <SelectValue placeholder="-Sila pilih jenis pemilikan-" />
                                            </SelectTrigger>
                                            <SelectContent 
                                                id="ownership_type"
                                                name="ownership_type"
                                                
                                            >
                                                <SelectItem value="allottee">Peserta RTK</SelectItem>
                                                <SelectItem value="temporary_admin">Pentadbir Sementara</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.ownership_type}
                                            className="mt-2"
                                        />
                                    </div> 
                                    <input type="text" name="lot_id" value={lot.id} />
                                </div>
                                <PrimaryButton disabled={processing}>
                                    Tambah
                                </PrimaryButton>

                                
                            </div>
                            {/* <hr class="my-4"/>
                            <div>
                                <p className="font-bold">Sejarah Peserta / Pentadbir</p>
                            </div> */}
                        </form>
                    </div>
                    {/* <div className="w-full">
                        <p>Sejarah Pemilikan / Pentadbir</p>
                    </div> */}
                </div>


            </DialogContent>
        </Dialog>
    );
}
