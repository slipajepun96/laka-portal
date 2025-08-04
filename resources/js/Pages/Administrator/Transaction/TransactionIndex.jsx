import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';
import { Plus } from 'lucide-react';
import Alert from '@/Components/Alert';
import { usePage } from '@inertiajs/react';
import TransactionDelete from './Partials/TransactionDelete';

export default function TransactionIndex({ transactions, allottees }) {
    // console.log(lots);
    const { flash } = usePage().props;

    const columns = [
        { Header: 'Tarikh Transaksi', accessor: 'transaction_posted_date' },
        { Header: 'Nama Transaksi', accessor: 'transaction_name' },
        // {
        //     Header: 'No. Fail / Geran',
        //     accessor: ['lot_file_num', 'lot_ownership_num'],
        //     Cell: ({ row }) => (
        //         <div className="flex flex-col space-x-2">
        //             {row.lot_file_num}
        //             <div className='text-sm'>{row.lot_ownership_num}</div> 
        //             {/* <div className='text-sm'>{row.id}</div>  */}
        //         </div>
        //     ),
        // },
        // {   Header: 'Nama Peserta/Pentadbir',
        //     accessor: ['latest_allottee_name', 'latest_allottee_nric'],
        //     Cell: ({ row }) => (
        //         <div className="flex flex-col space-x-2">
        //             {row.latest_allottee_name}
        //             <div className='text-sm'>{row.latest_allottee_nric}</div> 
        //             {/* <div className='text-sm'>{row.id}</div>  */}
        //         </div>
        //     ),
        //  },
        {
            Header: '',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    {/* <div className='text-sm'>{row.id}</div>  */}
                    {/* <LotsViewOwnership lot={ row }/>
                    <LotsEditLot lot={ row }/>
                    <LotsAddAllottee allottees={ allottees } lot={ row }/> */}

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Penyata</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                Penyata Lot Individu
                            </DropdownMenuItem>
                            <DropdownMenuItem>Padam</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    {/* <PrimaryButton
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => handleDelete(row.id)}
                    >
                        Padam
                    </PrimaryButton> */}
                    <TransactionDelete transaction={row} />
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Penyata & Transaksi Lot
                </h2>
            }
        >
            <Head title="Transaction" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
                    <div className='mb-4 gap-2 flex '>
                        <Link
                            href={route('transaction.add-bulk')}
                        >
                        <PrimaryButton variant="outline" className="bg-green-700 hover:bg-green-800">
                            <Plus strokeWidth={2.25} />
                            Transaksi Pukal
                        </PrimaryButton>
                        </Link>
                    </div>
                    {flash?.message && flash.message.trim() !== '' && (
                        <Alert 
                            type={flash?.type || 'info'} 
                            message={flash.message}
                        />
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-2 text-gray-900">
                            <DataTable columns={columns} data={transactions} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
