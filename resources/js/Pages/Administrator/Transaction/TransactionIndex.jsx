import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import PrimaryButton from '@/Components/PrimaryButton';
import { Plus, FileText } from 'lucide-react';
import Alert from '@/Components/Alert';
import { usePage } from '@inertiajs/react';
import TransactionDelete from './Partials/TransactionDelete';
import TransactionView from './TransactionView';

export default function TransactionIndex({ transactions, allottees }) {
    // console.log(lots);
    const { flash } = usePage().props;

    const columns = [
        { Header: 'Tarikh Transaksi', accessor: 'transaction_posted_date',
        Cell: ({ row }) => {
            const value = row.transaction_posted_date;
            if (!value) return '-';
            try {
                const date = new Date(value);
                if (isNaN(date)) return '-';
                
                return date.toLocaleDateString('ms-MY', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } catch (error) {
                console.error('Date parsing error:', error);
                return '-';
            }
        }
        },
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

                        <Link
                            href={route('transaction.view', { transaction: row.id })}
                        >
                        <PrimaryButton variant="outline" className="bg-green-700 hover:bg-green-800">
                            <FileText />
                            Transaksi
                        </PrimaryButton>
                        </Link>
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
