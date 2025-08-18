import AllotteeLayout from '@/Layouts/AllotteeLayout';
import { Head } from '@inertiajs/react';
import AllotteeStatementView from './Partials/AllotteeStatementView';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ allottee , transactions }) {
    return (
        <AllotteeLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex flex-col justify-center gap-4 px-2 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between  bg-white p-4 rounded-lg shadow">
                    <div>
                        <p className='text-gray-600 font-bold text-2xl'>{allottee.allottee_name}</p>
                        <p className='text-gray-600 font-bold text-md'>No. Kad Pengenalan : {allottee.allottee_nric}</p>
                    </div>
                    <div>
                        <PrimaryButton className='bg-red-500 hover:bg-red-600 text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            Log Keluar
                        </PrimaryButton>
                    </div>

                </div>
                <div className=" max-w-7xl">
                    <AllotteeStatementView transactions={transactions} />
                </div>
            </div>
        </AllotteeLayout>
    );
}
