
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import StatementDataTable from '@/Components/StatementDataTable';



export default function LotsViewCurrentAllotteeStatement({ lot, allotteeName, statement_years }) {
    const currentYear = new Date().getFullYear();
    const start_year = statement_years[0] || currentYear; 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(start_year);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async (year) => {
        setLoading(true);
        try {
            const response = await axios.get(`/transaction/lot/${lot.id}`, { params: { year } });
            setTransactions(response.data);
        } catch (e) {
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchTransactions(selectedYear);
        }
    }, [isOpen, selectedYear]);

    const handleYearChange = (newYear) => {
        setSelectedYear(parseInt(newYear));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const yr = date.getFullYear();
        return `${day} ${month} ${yr}`;
    };

    // Running balance is accumulated during render (synchronous, top-to-bottom)
    let balance = 0;

    const columns = [
        {
            Header: 'Transaksi',
            accessor: 'transaction_name',
            Cell: ({ row }) => {
                return (
                    <div>
                        <div className="font-semibold text-gray-800">{row.transaction_name}</div>
                        <div className="font-medium text-sm text-gray-600">{formatDate(row.transaction_posted_date)}</div>

                    </div>
                );
            },
        },
        {
            Header: 'Transaksi',
            accessor: 'transaction_name',
            Cell: ({ row }) => {
                if (row.transaction_type === 'debit' || row.transaction_type === 'brought_forward' || row.transaction_type === 'carry_forward') {
                    balance += parseFloat(row.transaction_amount || 0);
                } else if (row.transaction_type === 'credit') {
                    balance -= parseFloat(row.transaction_amount || 0);
                }
                return (
                    <div>
                        {row.transaction_type === 'debit' || row.transaction_type === 'credit' ? (
                            <div className="grid grid-cols-2 gap-4 text-md">
                                <div>
                                    <span className="text-gray-600">Debit: </span>
                                    {row.transaction_type === 'debit' ? (
                                        <span className="text-green-500 md:text-md font-bold">
                                            RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    ) : '-'}
                                </div>
                                <div>
                                    <span className="text-gray-600">Kredit: </span>
                                    {row.transaction_type === 'credit' ? (
                                        <span className="text-red-500 md:text-md font-bold">
                                            RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    ) : '-'}
                                </div>
                            </div>
                        ) : (
                            row.transaction_type === 'brought_forward' || row.transaction_type === 'carry_forward' ? (
                                <span className="text-blue-500 md:text-md font-bold">
                                    RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            ) : '-'
                        )}
                    </div>
                );
            },
        },
        {
            Header: 'Baki (RM)',
            accessor: 'transaction_amount',
            Cell: ({ row }) => {
                const runningBalance = balance; // captured after Transaksi cell updated it
                return (
                    <div className="text-md font-bold text-right text-nowrap">
                        {parseFloat(runningBalance || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                );
            },
        },
    ];

    return (
        <Drawer direction="bottom" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <PrimaryButton variant="outline">Penyata</PrimaryButton>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col h-[90dvh]">
                <DrawerHeader>
                    <DrawerTitle>Penyata — Lot {lot.lot_num} - Peserta : {allotteeName}</DrawerTitle>
                </DrawerHeader>
                <div className="no-scrollbar flex-1 overflow-y-auto px-4">
                    <div className="mb-4 flex-shrink-0">
                        <Select
                            onValueChange={handleYearChange}
                            value={selectedYear.toString()}
                            disabled={loading}
                        >
                            <SelectTrigger className="w-40 bg-white">
                                <SelectValue placeholder="Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                {statement_years.map((yr) => (
                                    <SelectItem key={yr} value={yr.toString()}>{yr}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {loading ? (
                        <div className="py-8 text-center text-gray-500">Memuatkan...</div>
                    ) : (
                        <div className="w-full">
                            <p className="text-lg font-semibold mb-2">Penyata Transaksi {selectedYear}</p>
                            <StatementDataTable columns={columns} data={transactions} className="overflow-hidden" showSearch={false} />
                           
                        </div>
                    )}
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <div className='flex'>
                            <PrimaryButton variant="outline" className="items-center bg-red-500 hover:bg-red-700">Tutup</PrimaryButton>
                        </div>

                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
