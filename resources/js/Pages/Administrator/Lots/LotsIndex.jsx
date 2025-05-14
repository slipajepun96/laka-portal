import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import LotsAddLot from './Partials/LotsAddLot';
import LotsEditLot from './Partials/LotsEditLot';

export default function LotsIndex({ lots }) {
    // console.log(lots);
    const columns = [
        { Header: 'No. Lot', accessor: 'lot_num' },
        { Header: 'No. Fail / Geran', accessor: 'lot_file_num' },
        { Header: 'Nama Peserta/Pentadbir', accessor: 'lot_description' },
        {
            Header: 'Tindakan',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <LotsEditLot lot={ row }/>
                    <button
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => handleDelete(row.id)}
                    >
                        Padam
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Lot RTK Paya Laka
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
                    <div className='mb-4'>
                        <LotsAddLot />
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-2 text-gray-900">
                            <DataTable columns={columns} data={lots} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
