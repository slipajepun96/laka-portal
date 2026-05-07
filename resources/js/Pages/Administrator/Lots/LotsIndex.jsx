import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import LotsAddLot from './Partials/LotsAddLot';
import LotsEditLot from './Partials/LotsEditLot';
import LotsViewOwnership from './Partials/LotsViewOwnership';
import LotsAddAllottee from './Partials/LotsAddAllottee';
import LotsViewCurrentAllotteeStatement from './Partials/LotsViewCurrentAllotteeStatement';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"


export default function LotsIndex({ lots, allottees, statement_years }) {
    // console.log(lots);
    const columns = [
        { Header: 'No. Lot', accessor: 'lot_num', sortable: true },
        {   Header: 'Nama Peserta/Pentadbir',
            accessor: ['latest_allottee_name', 'latest_allottee_nric'],
            Cell: ({ row }) => (
                <div className="flex flex-col space-x-2">
                    {row.latest_allottee_name}
                    <div className='text-sm'>{row.latest_allottee_nric}</div> 
                    {/* <div className='text-sm'>{row.id}</div>  */}
                </div>
            ),
            sortable: true
         },
         
        {   
            Header: 'Baki Terkini',
            accessor: 'latest_balance',
            Cell: ({ row }) => (
                <div className="font-semibold text-right text-nowrap">
                    RM {parseFloat(row.latest_balance || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            ),
            sortable: true 
        },
        {
            Header: 'Tindakan',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    {/* <div className='text-sm'>{row.id}</div>  */}
                    <LotsViewCurrentAllotteeStatement lot={ row } allotteeName={row.latest_allottee_name} statement_years={statement_years} />
                    <LotsViewOwnership lot={ row }/>
                    <LotsEditLot lot={ row }/>
                    <LotsAddAllottee allottees={ allottees } lot={ row }/>

                    {/* <button
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => handleDelete(row.id)}
                    >
                        Padam
                    </button> */}
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
            <Head title="Lot" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
                    <div className='mb-4 gap-2 flex '>
                        <LotsAddLot />
                        {/* <LotUploadExcel /> */}
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
