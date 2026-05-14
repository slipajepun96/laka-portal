import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

     const { data, setData, post, processing, errors, reset } = useForm({
            allottee_nric: '',
            password: '',
            remember: false,
        });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('allottee.login'), {
                onFinish: () => reset('password'),
            });
        };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-3 lg:max-w-7xl">
                        <nav className="-mx-3 flex flex-1 justify-end">

                        </nav>
                        <main className="mt-4">
                            <section class="sm:bg-white md:bg-gray-50">
                                <div class=" py-2 md:py-4 px-2 md:mx-auto md:max-w-screen-xl lg:py-4 grid lg:grid-cols-2 md:gap-16">
                                    <div class="flex flex-col justify-center items-center">
                                        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Portal Laka</h1>
                                        <img id="background" class="mb-6 w-1/3 " src="welcome-img.png" alt="background image" onError={handleImageError} />
                                        <p class="mb-6 text-lg hidden md:block font-normal text-gray-500 lg:text-xl">Selamat datang<br/> Semak penyata transaksi RTK Paya Laka di sini! </p>
                                        <div className='hidden md:block p-2 bg-lime-200 rounded-lg text-sm text-gray-700 mb-2 mt-4'>
                                            Sila hubungi PKPP Agro Sdn. Bhd. di talian 011-26637117 jika menghadapi masalah.
                                        </div>
                                    </div>
                                    <div>
                                        <div class="w-full lg:max-w-xl md:p-6 md:space-y-8 sm:p-8 md:bg-white rounded-2xl md:shadow-2xl">
                                            <h2 class="text-2xl font-bold text-gray-900">
                                                Log Masuk Peserta
                                            </h2>

                                            <form class="md:mt-4 md:space-y-3" action="#" onSubmit={submit}>
                                                <div>
                                                    <InputLabel htmlFor="allottee_nric" value="No. Kad Pengenalan" />

                                                    <TextInput
                                                        id="allottee_nric"
                                                        type="text"
                                                        name="allottee_nric"
                                                        value={data.allottee_nric}
                                                        className="mt-1 block w-full"
                                                        isFocused={true}
                                                        onChange={(e) => setData('allottee_nric', e.target.value)}
                                                    />

                                                    <InputError message={errors.allottee_nric} className="mt-2" />
                                                </div>
                                                <div>
                                                    {/* <InputLabel htmlFor="password" value="Kata Laluan" /> */}
                                                    <div className=' p-2 bg-lime-200 rounded-lg text-sm text-gray-700 mb-2 mt-4'>
                                                        Kata laluan adalah kombinasi <b>perkataan nama pertama (huruf besar)</b> dan <b>6 digit terakhir nombor kad pengenalan </b> anda.
                                                        <br />Contoh : 
                                                        <br /> Nama : <b className='underline'>Siti</b> Zairah binti Ahmad
                                                        <br /> No. K/P : 941301<b className='underline'>065678</b>
                                                        <br />
                                                        <b>Kata Laluan : SITI065678</b>

                                                    </div>
                                                    <InputLabel htmlFor="password" value="Kata Laluan" />
                                                    <TextInput
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('password', e.target.value)}
                                                    />

                                                    <InputError message={errors.password} className="mt-2" />
                                                </div>



                                                <div className="mt-2 flex items-center justify-start">
                                                    {/* {canResetPassword && ( */}

                                                    {/* )} */}

                                                    <PrimaryButton className="w-full flex items-center justify-center " disabled={processing}>
                                                        Log Masuk
                                                    </PrimaryButton>
                                                     {/* <Link
                                                        href={route('password.request')}
                                                        className="rounded-md ms-2 text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Forgot your password?
                                                    </Link> */}
                                                </div>

                                                <div className='block md:hidden p-2 bg-lime-200 rounded-lg text-sm text-gray-700 mb-2 mt-4'>
                                                    Sila hubungi PKPP Agro Sdn. Bhd. di talian <a href="tel:011-26637117" className="underline">011-26637117</a> jika menghadapi masalah.
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>

                        <footer className="md:mt-4 text-center text-sm text-black flex flex-row justify-center items-center gap-2">

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline "
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline hover:underline focus-visible:underline"
                                    >
                                        Log Masuk Pentadbir Sistem
                                    </Link>
                                </>
                            )}
                            <p>|</p>
                            <p>PKPP Agro Sdn Bhd © 2025</p>
                            {/* Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
