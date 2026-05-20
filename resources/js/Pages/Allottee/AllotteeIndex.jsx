import AllotteeLayout from '@/Layouts/AllotteeLayout';
import { Head, Link } from '@inertiajs/react';
import AllotteeStatementView from './Partials/AllotteeStatementView';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Phone } from 'lucide-react';

export default function Dashboard({ allottee , transactions , year , lot_list, statement_years = [] }) {

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(year || statement_years[0] || currentYear);
    const [loading, setLoading] = useState(false);

    const { data: PDFData, setData: setPDFData, post: postPDF } = useForm({
        year: selectedYear,
        transactions: transactions
    });

    const handleYearChange = (newYear) => {
        setSelectedYear(newYear);
        setLoading(true);

        router.reload({
            data: { year: newYear },
            only: ['transactions', 'lot_list', 'year'],
            preserveScroll: true,
            onFinish: () => 
                {
                    setLoading(false);

                    setPDFData({
                        year: newYear,
                        transactions: transactions
                    });
                }
        });
    };
    const handlePDFDownload = (e) => {
        e.preventDefault();
        postPDF(route('allottee.statement_download'));
    };


    // useEffect(() => {
    //     if (shouldSubmit) {
    //         post(route('allottee.statement'), { preserveScroll: true });
    //         setShouldSubmit(false);
    //     }
    // }, [data.year, shouldSubmit]);
    


    return (
        <AllotteeLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Penyata Transaksi
                </h2>
            }
        >
            <Head title="Penyata Transaksi" />

            <div className="flex flex-col justify-center gap-4 px-2 lg:px-8">
                <div className="flex flex-row md:flex-row justify-between bg-gray-900 p-4 rounded-lg shadow">
                    <div>
                        <p className='font-bold text-white text-2xl'>{allottee.allottee_name}</p>
                        <p className='text-gray-300 font-bold text-md'>{allottee.allottee_nric}</p>
                    </div>
                    <div>
                        <Link href={route('allottee.logout')} method="post">
                            <PrimaryButton variant="outline" className="bg-red-700 hover:bg-red-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                    <span className="hidden md:block">Log Keluar</span>
                            </PrimaryButton>
                        </Link>
                    </div>

                </div>
                <div className=" max-w-7xl">
                    {allottee.allottee_statement_status ==='normal' ? (
                        <>
                        <div className='flex flex-row w-full gap-2'>
                            <div className='flex-shrink-0'>
                                <Select
                                    onValueChange={handleYearChange}
                                    value={selectedYear.toString()}
                                    disabled={loading}
                                    className="w-full">
                                    <SelectTrigger className="w-full bg-white min-w-[120px]">
                                        <SelectValue placeholder="Tahun" />
                                    </SelectTrigger>
                                    <SelectContent 
                                        id="year"
                                        name="year"
                                    >
                                        {statement_years.map((yr) => (
                                            <SelectItem key={yr} value={yr.toString()}>{yr}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* <div>
                                <PrimaryButton onClick={handlePDFDownload} className="bg-blue-700 hover:bg-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    Muat Turun PDF
                                </PrimaryButton>
                            </div> */}
                        </div>
                        {loading ? (
                        <div className="animate-pulse">Loading...</div>
                        ) : (
                            <AllotteeStatementView 
                                transactions={transactions} 
                                year={selectedYear}
                                lot_list={lot_list}
                            />
                        )}</>
                    ) : (
                        <div className="p-4 bg-amber-200 rounded-xl gap-2 flex flex-col text-center">
                            <p className='text-lg font-bold'>Penyata Anda Tidak Tersedia</p>
                            <p>Harap maaf, penyata anda tidak tersedia untuk dipaparkan pada masa ini.</p>
                            <p>Sekiranya anda ingin mengetahui dengan lebih lanjut, sila hubungi kami di <br /><a href="tel:+601126637117" className='underline'>011-2663 7117</a>.</p>
                        </div>
                    )}
                </div>
            </div>
        </AllotteeLayout>
    );
}
