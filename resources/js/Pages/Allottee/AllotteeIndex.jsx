import AllotteeLayout from '@/Layouts/AllotteeLayout';
import { Head } from '@inertiajs/react';
import AllotteeStatementView from './Partials/AllotteeStatementView';

export default function Dashboard({ allottee }) {
    return (
        <AllotteeLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="w-full max-w-7xl  sm:px-6 lg:px-8">
                <div>
                    <p className='text-gray-600 font-bold text-2xl'>{allottee.allottee_name}</p>
                    <p className='text-gray-600 font-bold text-md'>No. Kad Pengenalan : {allottee.allottee_nric}</p>
                </div>
                
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <AllotteeStatementView/>
                </div>
            </div>
        </AllotteeLayout>
    );
}
