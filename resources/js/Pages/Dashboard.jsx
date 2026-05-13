import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
const now = new Date();

const hours = now.getHours();
console.log(`Current hour: ${hours}`);

export default function Dashboard() {
    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />

            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 ">
                    <div className="overflow-hidden">
                        <div className="p-4 text-gray-900 font-semibold">
                            {hours == 0 && hours == 1 ? "Selamat Tengah Malam" : hours >= 2 && hours <= 11 ? "Selamat Pagi" : hours >= 12 && hours <= 13 ? "Selamat Tengah Hari" : hours >= 14 && hours <= 18 ? "Selamat Petang" : "Selamat Malam"}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ml-4 mr-4 mb-4">
                            <Link href={route('lots.index')} className="border shadow hover:shadow-md h-24 w-full p-4 rounded-xl bg-white">
                                <p className='font-bold text-2xl'>Lot</p>
                            </Link>
                            <Link href={route('allottee.index')} className="border shadow hover:shadow-md h-24 w-full p-4 rounded-xl bg-white">
                                <p className='font-bold text-2xl'>Peserta</p>
                            </Link>
                            <Link href={route('transaction.index')} className="border shadow hover:shadow-md h-24 w-full p-4 rounded-xl bg-white ">
                                <p className='font-bold text-2xl'>Penyata & Transaksi</p>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
