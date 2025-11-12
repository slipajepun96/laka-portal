import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
// import TransactionAddTransaction from './Partials/TransactionAddTransaction';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Calendar } from "@/Components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { constructFromSymbol } from 'date-fns/constants';

export default function TransactionCFBFTransaction({ lots }) {
    // console.log(lots);
    const { data, setData, post, processing, errors, reset } = useForm({
        cf_year: '',
        bf_year: '',
        // transaction_type: '',
        transactions: [], 
    });

    const [open, setOpen] = useState(false);
    const [rowAmounts, setRowAmounts] = useState({});
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [date, setDate] = useState();
    const [excludedLots, setExcludedLots] = useState(new Set());

    const totalAmount = Object.values(rowAmounts).map(Number).reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);

    // Filter out excluded lots
    const availableLots = lots.filter(lot => !excludedLots.has(lot.id));

    // Function to remove a lot from the list
    const removeLot = (lotId) => {
        setExcludedLots(prev => new Set([...prev, lotId]));
        // Also remove the amount for this lot
        setRowAmounts(prev => {
            const updated = { ...prev };
            delete updated[lotId];
            return updated;
        });
    };

    // Add useEffect to handle the actual submission
    useEffect(() => {
        if (shouldSubmit) {
            // Reset the flag first
            setShouldSubmit(false);
            console.log('Form data being submitted:', data);
            
            post(route('transaction.save-cfbf'), {
                // transaction_name: data.transaction_name,
                cf_year: data.cf_year,
                bf_year: data.bf_year,
                transactions: data.transactions
            }, {
                preserveScroll: true,
                onError: errors => {
                    console.group('Submission Errors');
                    console.error('Errors:', errors);
                    console.groupEnd();
                },
                onSuccess: () => {
                    reset();
                    setRowAmounts({});
                },
            });
        }
    }, [data, shouldSubmit]); // Watch for changes in data and shouldSubmit

    const submit = (e) => {
        e.preventDefault();

        console.log('Submitting form with data:', data);


        const transactions = availableLots.map(lot => ({
            lot_id: lot.id,
            allottee_id: lot.latest_allottee_id,
            amount: parseFloat(rowAmounts[lot.id]) || "",
        }));


        setData(prev => ({
            ...prev,
            // transaction_posted_date: date ? format(date, 'yyyy-MM-dd') : '',
            transactions: transactions
        }));
        console.log(transactions);

        // Set flag to trigger submission
        setShouldSubmit(true);
    };

    const columns = [
        { Header: 'No. Lot', accessor: 'lot_num' },
        {   Header: 'Nama Peserta/Pentadbir',
            accessor: ['latest_allottee_name', 'latest_allottee_nric'],
            Cell: ({ row }) => (
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        {row.latest_allottee_name}
                        <div className='text-sm'>{row.latest_allottee_nric}</div> 
                    </div>
                    <PrimaryButton
                        type="button"
                        onClick={() => removeLot(row.id)}
                        className="ml-2 bg-red-600 hover:bg-red-800 focus:bg-red-500 focus:outline-none"
                        title="Remove from list"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Buang
                    </PrimaryButton>
                </div>
            ),
         },
        {
            Header: 'Amaun (RM)',
            accessor: 'transaction_amount',
            Cell: ({ row }) => (
                <TextInput
                    id="transaction_amount"
                    name="transaction_amount"
                    value={rowAmounts[row.id]  ?? ''}
                    className="mt-1 block w-full"
                    // isFocused={true}
                    type="number"
                    onChange={e => setRowAmounts(prev => ({ ...prev, [row.id]: e.target.value }))}
                    
                />
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Transaksi Brought Forward / Carried Forward
                </h2>
            }
        >
            <Head title="Transaction" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
                    <div className='mb-4 gap-2 flex '>
                    </div>
                <form onSubmit={submit}>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-2">
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            <div className='mb-2'>
                                <InputLabel
                                    htmlFor="cf_year"
                                    value="Tahun Carry Forward (Akhir Tahun)"
                                />
                                <TextInput
                                    id="cf_year"
                                    name="cf_year"
                                    value={data.cf_year}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData(
                                            'cf_year',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.cf_year}
                                    className="mt-2"
                                />
                            </div>
                            <div className='mb-2'>
                                <InputLabel
                                    htmlFor="bf_year"
                                    value="Tahun Brought Forward (Awal Tahun)"
                                />
                                <TextInput
                                    id="bf_year"
                                    name="bf_year"
                                    value={data.bf_year}
                                    className="mt-1 block w-full"
                                    isFocused={false}
                                    onChange={(e) =>
                                        setData(
                                            'bf_year',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.bf_year}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="bulk_update"
                                    value="Bulk Update Amaun (RM) (Optional)"
                                />
                                <TextInput
                                    id="bulk_update"
                                    name="bulk_update"
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    onChange={e => {
                                        const value = e.target.value;
                                        // Set the same value for all available lot IDs (excluding removed ones)
                                        const newAmounts = {};
                                        availableLots.forEach(lot => {
                                            newAmounts[lot.id] = value;
                                        });
                                        setRowAmounts(newAmounts);
                                    }}
                                />
                                <InputError
                                    message={errors.transaction_posted_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className=" font-bold text-lg">
                                Jumlah Amaun: RM {totalAmount.toLocaleString('ms-MY', { minimumFractionDigits: 2 })}
                            </div>
                                                    <PrimaryButton disabled={processing}>
                            Simpan 
                        </PrimaryButton>
                        </div>

                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-2 mt-2">
                        <DataTable columns={columns} data={availableLots} />
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-2 my-2">
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            <div className=" font-bold text-lg">
                                Jumlah Amaun: RM {totalAmount.toLocaleString('ms-MY', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        <PrimaryButton disabled={processing}>
                            Simpan 
                        </PrimaryButton>
                    </div>
                </form>

            </div>
                    
                </div>

        </AuthenticatedLayout>
    );
}
