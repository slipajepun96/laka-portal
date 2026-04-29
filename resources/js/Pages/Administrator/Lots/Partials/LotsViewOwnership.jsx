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
// import { Timeline } from "flowbite-react";
import {
  Button,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";


export default function LotsViewOwnership({ lot }) {
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Sejarah Lot</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>
                    <div className="items-center space-y-2">
                        <div className="grid flex-1 gap-2">
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <InputLabel
                                        // htmlFor="lot_file_num"
                                        value="No. Lot"
                                    />
                                    {data.lot_num || ""}
                                </div>
                                <div>
                                    <InputLabel
                                        // htmlFor="lot_file_num"
                                        value="No. Fail Lot"
                                    />
                                    {data.lot_file_num || ""}
                                </div>
                                                                <div>
                                    <InputLabel
                                        // htmlFor="lot_file_num"
                                        value="Keluasan Lot"
                                    />
                                    {data.lot_area_size+" Ha." || ""}
                                </div>
                            </div>
                        </div>
                        <div>
                        <Timeline>
                            {lot.ownerships && lot.ownerships.length > 0 ? (
                                lot.ownerships.map((ownership, idx) => (
                                    <TimelineItem key={ownership.id || idx}>
                                        <TimelinePoint />
                                        <TimelineContent>
                                            <TimelineTime>
                                                {ownership.ownership_start_date
                                                    ? new Date(ownership.ownership_start_date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })
                                                    : '-'}
                                            </TimelineTime>
                                            <TimelineTitle>
                                                {ownership.allottee?.allottee_name || '-'}
                                                <span className="block text-xs text-gray-500">
                                                    {ownership.ownership_type}
                                                </span>
                                            </TimelineTitle>
                                            {ownership.ownership_remarks && (
                                                <div className="text-xs text-gray-400">{ownership.ownership_remarks}</div>
                                            )}
                                        </TimelineContent>
                                    </TimelineItem>
                                ))
                            ) : (
                                <TimelineItem>
                                    <TimelinePoint />
                                    <TimelineContent>
                                        <TimelineTitle>Tiada sejarah pemilikan.</TimelineTitle>
                                    </TimelineContent>
                                </TimelineItem>
                            )}
                        </Timeline>
                        </div>






                        {/* <PrimaryButton disabled={processing}>
                            Simpan 
                        </PrimaryButton> */}
                    </div>
            </DialogContent>
        </Dialog>
    );
}
