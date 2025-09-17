import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import StatementDataTable from '@/Components/StatementDataTable';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

export default function AllotteeStatementView({ transactions, year }) {
    const d = new Date();
    let currentYear = d.getFullYear();
    const { data, setData, post, processing, errors, reset } = useForm({
        year: year || currentYear,
    });

    let balance = 0;

    const columns = [
    {
        Header: 'Transaksi',
        accessor: 'transaction_name',
        Cell: ({ row }) => {
                    // Calculate balance outside of JSX
            if (row.transaction_type === 'debit') {
                balance += parseFloat(row.transaction_amount || 0);
            } else if (row.transaction_type === 'credit') {
                balance -= parseFloat(row.transaction_amount || 0);
            }
            return (
                <div className="">
                    {/* Transaction Name Row */}
                    <div className="font-semibold text-gray-800">
                        {row.transaction_name}
                    </div>
                    <div className="font-medium text-sm text-gray-600">
                        {row.transaction_posted_date}

                    </div>
                    
                    {/* Debit/Credit Row */}
                    <div className="grid grid-cols-2 gap-4 text-md">
                        <div>
                            <span className="text-gray-600">Debit: </span>
                            {row.transaction_type === 'debit' ? (
                                <span className='text-green-500 md:text-lg font-black text-right'>
                                    RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                            ) : '-'}
                        </div>
                        <div>
                            <span className="text-gray-600">Kredit: </span>
                            {row.transaction_type === 'credit' ? (
                                <span className='text-red-500 md:text-lg font-bold text-right'>
                                    RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                            ) : '-'}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        Header: 'Baki (RM)',
        accessor: 'transaction_amount',
        Cell: ({ row }) => (
            <div className="text-sm md:text-lg font-bold text-right text-nowrap">
                {parseFloat(balance || 0).toLocaleString('ms-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
                {/* {balance} */}
            </div>
        ),
    },
];

    return (
        <div className='w-full max-w-7xl'>

            <p className='text-lg font-semibold'>Penyata Transaksi Peserta RTK Paya Laka {year} </p>
            <StatementDataTable columns={columns} data={transactions} className="overflow-hidden " showSearch={false} />
            <p className='text-sm text-gray-500 my-4'>
                <b>Nota:</b> Penyata ini mungkin mengandungi kesilapan. Sekiranya terdapat sebarang kesilapan atau pertanyaan mengenai penyata ini, sila hubungi PKPP Agro Sdn. Bhd. di talian 011-26637117.
            </p>
        </div>
    );
}