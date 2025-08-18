import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
// import TransactionAddTransaction from './Partials/TransactionAddTransaction';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { constructFromSymbol } from 'date-fns/constants';

export default function TransactionAddBulkTransaction({ lots }) {
    // console.log(lots);
    const { data, setData, post, processing, errors, reset } = useForm({
        transaction_name: '',
        transaction_posted_date: '',
        transaction_type: '',
        transactions: [], 
    });

    const [date, setDate] = useState();
    const [open, setOpen] = useState(false);
    const [rowAmounts, setRowAmounts] = useState({});
    const [shouldSubmit, setShouldSubmit] = useState(false);



    const totalAmount = Object.values(rowAmounts)
    .map(Number)
    .reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);

    // Add useEffect to handle the actual submission
    useEffect(() => {
        if (shouldSubmit) {
            // Reset the flag first
            setShouldSubmit(false);
            
            // Now post the data
            post(route('transaction.save-bulk'), {
                transaction_name: data.transaction_name,
                transaction_posted_date: data.transaction_posted_date,
                transaction_type: data.transaction_type,
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
                    setDate(undefined);
                },
            });
        }
    }, [data, shouldSubmit]); // Watch for changes in data and shouldSubmit

    const submit = (e) => {
        e.preventDefault();


        const transactions = lots.map(lot => ({
            lot_id: lot.id,
            allottee_id: lot.latest_allottee_id,
            amount: parseFloat(rowAmounts[lot.id]) || 0,
        }));


        setData(prev => ({
            ...prev,
            transaction_posted_date: date ? format(date, 'yyyy-MM-dd') : '',
            transactions: transactions
        }));

        // Set flag to trigger submission
        setShouldSubmit(true);
    };

    // yg lama
    const columns = [
        { Header: 'No. Lot', accessor: 'lot_num' },
        {   Header: 'Nama Peserta/Pentadbir',
            accessor: ['latest_allottee_name', 'latest_allottee_nric'],
            Cell: ({ row }) => (
                <div className="flex flex-col space-x-2">
                    {row.latest_allottee_name}
                    <div className='text-sm'>{row.latest_allottee_nric}</div> 
                                    {/* {row.id} */}
                    {/* <div className='text-sm'>{row.id}</div>  */}
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
                    Tambah Transaksi Pukal
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
                        <div className='mb-2'>
                            <InputLabel
                                htmlFor="transaction_name"
                                value="Nama Transaksi"
                            />
                            <TextInput
                                id="transaction_name"
                                name="transaction_name"
                                value={data.transaction_name}
                                className="mt-1 block w-full"
                                isFocused={false}
                                onChange={(e) =>
                                    setData(
                                        'transaction_name',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.transaction_name}
                                className="mt-2"
                            />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            <div>
                                <InputLabel
                                    htmlFor="transaction_posted_date"
                                    value="Tarikh Transaksi"
                                />
                                <Popover open={open} onOpenChange={setOpen} modal={false}>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            className={cn(
                                                "w-full text-left font-normal bg-white border rounded-md px-3 py-2",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            {date ? format(date, "dd-MM-yyyy") : "Pilih tarikh transaksi"}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" trapFocus={false}>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={selectedDate => {
                                                setDate(selectedDate);
                                                setData('transaction_posted_date', selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '');
                                                setOpen(false);
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError
                                    message={errors.transaction_posted_date}
                                    className="mt-2"
                                />
                            </div>
                            {/* {data.transaction_posted_date} */}
                            <div>
                                <InputLabel
                                    htmlFor="transaction_type"
                                    value="Jenis Transaksi"
                                    className='mb-1'
                                />
                                <Select
                                    onValueChange={(value) =>
                                        setData('transaction_type', value)
                                }>
                                    <SelectTrigger className=" w-full">
                                        <SelectValue placeholder="Sila pilih jenis transaksi" />
                                    </SelectTrigger>
                                    <SelectContent 
                                        id="transaction_type"
                                        name="transaction_type"
                                    >
                                        <SelectItem value="debit">Debit</SelectItem>
                                        <SelectItem value="credit">Kredit</SelectItem>
                                        <SelectItem value="notice">Notis/Makluman</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    // message={errors.allottee_bank_name}
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
                                        // Set the same value for all lot IDs
                                        const newAmounts = {};
                                        lots.forEach(lot => {
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
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-2 mt-2">
                        <DataTable columns={columns} data={lots} />
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
