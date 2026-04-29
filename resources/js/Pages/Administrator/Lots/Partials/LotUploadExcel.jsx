// import { Inertia } from '@inertiajs/inertia'; 
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
    Dialog,
    DialogContent,
    DialogDescription,
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


export default function LotUploadExcel({ }) {

    // const { data, setData, post, processing, errors, reset } = useForm({
    //     lot_num: '',
    //     lot_file_num: '',
    //     lot_description: '',
    //     lot_area_size: '',
    //     lot_current_administrator_uuid: '',
    // });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const submit = (e) => {
    //     e.preventDefault();
    //     console.log('onSuccess', data);

    //     post(route('lots.add'), {
    //         onSuccess: () => {
    //             reset(
    //                 'lot_num',
    //                 'lot_file_num',
    //                 'lot_description',
    //                 'lot_area_size',
    //                 'location_radius',
    //                 'lot_current_administrator_uuid',
    //             );
    //             // Close the dialog
    //             console.log('onSuccess', data);
    //             setIsDialogOpen(false);
    //         },
    //     });
    // };
    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);

        // if (!isOpen) {
        //     reset(
        //       'lot_num',
        //       'lot_file_num',
        //       'lot_description',
        //       'lot_area_size',
        //       'location_radius',
        //       'lot_current_administrator_uuid',
        //     );
        // }
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = () => {
        if (!file) {
            alert('Please select a file to import.');
            return;
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
            alert('CSRF token not found. Please ensure it is included in the HTML.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        fetch(route('lots.import'), {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message || 'File imported successfully!');
                window.location.reload();
                // setIsDialogOpen(false);
            })
            .catch((error) => {
                console.error('Error importing file:', error);
                alert('An error occurred while importing the file.');
            });
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    Muat Naik Fail Excel
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Muat Naik Fail Excel</DialogTitle>
                    <DialogDescription>
                        Muat naik fail Microsoft Office Excel yang mengandungi maklumat lot.
                        Pastikan format fail adalah betul iaitu .xlsx. 
                    </DialogDescription>
                </DialogHeader>
                {/* <form onSubmit={submit}> */}
                    <div className="items-center space-y-2">
                        <div className="grid flex-1 gap-2">
                                
                            <div>
                                {/* <InputLabel
                                    htmlFor="lot_current_administrator_uuid"
                                    value="Pentadbir Lot Terkini"
                                /> */}
                                {/* <TextInput
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
                                /> */}
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {/* <InputError
                                    message={errors.lot_current_administrator_uuid}
                                    className="mt-2"
                                /> */}
                            </div>
                        </div>
                        <PrimaryButton onClick={handleImport}>
                            Muat Naik
                        </PrimaryButton>
                    </div>
                {/* </form> */}
            </DialogContent>
        </Dialog>
    );
}
