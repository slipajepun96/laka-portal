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
    DialogDescription
} from '@/Components/ui/dialog';
import { useForm } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"


export default function AllotteeGenerateDefaultPassword({ }) {

    const { data, setData, post, processing, errors, reset } = useForm({

    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        console.log('onSuccess', data);

        post(route('allottee.generate_default_password'), {
            onSuccess: () => {
                // Close the dialog
                console.log('onSuccess', data);
                setIsDialogOpen(false);
            },
        });
    };
    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    Jana Kata Laluan Lalai
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Jana Kata Laluan Lalai?</DialogTitle>
                    <DialogDescription>
                        Kombinasi kata laluan lalai adalah kombinasi perkataan pertama nama dan 6 digit terakhir nombor kad pengenalan peserta. 
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="items-center space-y-2">
                        <PrimaryButton disabled={processing}>
                            Jana
                        </PrimaryButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
