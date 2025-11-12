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
} from "@/Components/ui/dropdown-menu"
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


export default function TransactionView({ transaction, transaction_lists }) {
    // console.log(lots)

    const [date, setDate] = useState();
    const [open, setOpen] = useState(false);
    const [rowAmounts, setRowAmounts] = useState({});
    const [shouldSubmit, setShouldSubmit] = useState(false);

    const totalAmount = Object.values(rowAmounts)
    .map(Number)
    .reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);

    // 
    // const submit = (e) => {
    //     e.preventDefault();

    //     // Create transactions array
    //     const transactions = lots.map(lot => ({
    //         lot_id: lot.id,
    //         allottee_id: lot.latest_allottee_id,
    //         amount: parseFloat(rowAmounts[lot.id]) || 0,
    //     }));

    //     // Update form data
    //     setData(prev => ({
    //         ...prev,
    //         transaction_posted_date: date.toISOString().split('T')[0],
    //         transactions: transactions
    //     }));

    //     // Set flag to trigger submission
    //     setShouldSubmit(true);
    // };

    
    // const submit = (e) => {
    //     e.preventDefault();
        

    //     // Create transactions array first, without filtering
    //     const transactions = lots.map(lot => ({
    //         lot_id: lot.id,
    //         allottee_id: lot.latest_allottee_id,
    //         amount: parseFloat(rowAmounts[lot.id]) || 0,
    //     }));

    //     setData(prev => ({
    //         ...prev,
    //         transaction_posted_date: date.toISOString().split('T')[0],
    //         transactions: transactions
    //     }));
        

    //     console.log('Submitting data:', data);

    //       // Create complete form data object
    //     // const formData = {
    //     //     transaction_name: data.transaction_name,
    //     //     transaction_posted_date: date.toISOString().split('T')[0],
    //     //     transaction_type: data.transaction_type,
    //     //     transactions: transactions
    //     // };

    //     // Debug log
    //     // console.log('Submitting form data:', formData);

    //     // post(route('transaction.save-bulk'), {
    //     //     preserveScroll: true,
    //     //     onError: errors => {
    //     //         console.group('Submission Errors');
    //     //         console.error('Errors:', errors);
    //     //         console.log('Failed submission data:', data);
    //     //         console.groupEnd();
    //     //     },
    //     //     onSuccess: () => {
    //     //         reset();
    //     //         setRowAmounts({});
    //     //         setDate(undefined);
    //     //     },
    //     // });

    //     // Log what we're about to send
    // console.log('About to submit:', {
    //     transaction_name: data.transaction_name,
    //     transaction_posted_date: date.toISOString().split('T')[0],
    //     transaction_type: data.transaction_type,
    //     transactions: transactions
    // });

    // // Post the complete data directly
    // post(route('transaction.save-bulk'), {
    //     transaction_name: data.transaction_name,
    //     transaction_posted_date: date.toISOString().split('T')[0],
    //     transaction_type: data.transaction_type,
    //     transactions: transactions
    // }, {
    //     preserveScroll: true,
    //     onError: errors => {
    //         console.group('Submission Errors');
    //         console.error('Errors:', errors);
    //         console.groupEnd();
    //     },
    //     onSuccess: () => {
    //         reset();
    //         setRowAmounts({});
    //         setDate(undefined);
    //     },
    // });
    // };

    const columns = [
        { 
            Header: 'No. Lot',
            accessor: 'lot_num'
        },
        {
            Header: 'Peserta/Pentadbir',
            accessor: ['allottee_name', 'allottee_nric'],
            Cell: ({ row }) => (
                <div>
                    <div>{row.allottee_name}</div>
                    <div className="text-sm text-gray-500">
                        {row.allottee_nric}
                    </div>
                </div>
            )
        },
        {
            Header: 'Amaun (RM)',
            accessor: 'id',
            Cell: ({ row }) => (
                <div>
                    {row.transaction_amount && !isNaN(parseFloat(row.transaction_amount)) 
                        ? `RM ${parseFloat(row.transaction_amount).toLocaleString('ms-MY', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}`
                        : '-'
                    }
                </div>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Penyata Transaksi
                </h2>
            }
        >

            <Head title="Transaction" />


            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
                    <div className='mb-4 gap-2 flex '>
                        <PrimaryButton className='bg-gray-800 hover:bg-gray-700 text-white' onClick={() => window.history.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Kembali
                        </PrimaryButton>
                        <PrimaryButton> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            Muat Turun PDF
                        </PrimaryButton>
                        {/* <PrimaryButton>Muat Turun PDF</PrimaryButton> */}
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className='p-4'>
                            <p className='font-bold text-2xl'>{transaction.transaction_name}</p>
                                <p className='font-semibold text-md'>Tarikh Transaksi : 
                                    {(() => {
                                        if (!transaction.transaction_posted_date) return '-';
                                        const date = new Date(transaction.transaction_posted_date);
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${day}/${month}/${year}`;
                                    })()} | Jenis Transaksi : {transaction.transaction_type}
                                </p>
                        </div>
                        <div className="p-2 text-gray-900">
                            <DataTable columns={columns} data={transaction_lists} />
                            {/* {transaction} */}
                        </div>
                    </div>

                </div>
            </div>

        </AuthenticatedLayout>
    );
}
