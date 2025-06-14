import { Head, Link } from '@inertiajs/react';

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

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] hover:underline focus-visible:underline"
                                        >
                                            Log in Pentadbir Sistem
                                        </Link>
                                    </>
                                )}
                            </nav>
                        <main className="mt-6">
                            <section class="bg-gray-50">
                                <div class="py-8 px-2 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                                    <div class="flex flex-col justify-center">
                                        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Portal Laka</h1>
                                        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl">Selamat datang ke Portal Laka!<br/> Tempat untuk menyemak maklumat dan penyata transaksi bagi peserta RTK Paya Laka </p>
                                        {/* <a href="#" class="text-blue-600 hover:underline font-medium text-lg inline-flex items-center">Read more about our app 
                                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </a> */}
                                    </div>
                                    <div>
                                        <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
                                            <h2 class="text-2xl font-bold text-gray-900">
                                                Log Masuk Peserta / Pentadbir
                                            </h2>
                                            <form class="mt-8 space-y-6" action="#">
                                                <div>
                                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Nombor Kad Pengenalan Peserta / Pentadbir</label>
                                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="941301065678" required />
                                                </div>
                                                <div>
                                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Kata Laluan</label>
                                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                                                </div>
                                                <div class="flex items-start">
                                                    <div class="flex items-center h-5">
                                                        <input id="remember" aria-describedby="remember" name="remember" type="checkbox" class="w-4 h-4 border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                                                    </div>
                                                    {/* <div class="ms-3 text-sm">
                                                    <label for="remember" class="font-medium text-gray-500">Remember this device</label>
                                                    </div> */}
                                                    {/* <a href="#" class="ms-auto text-sm font-medium text-blue-600 hover:underline ">Lost Password?</a> */}
                                                </div>
                                                <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto ">Log Masuk</button>
                                                {/* <div class="text-sm font-medium text-gray-900">
                                                    Not registered yet? <a class="text-blue-600 hover:underline">Create account</a>
                                                </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>

                        <footer className="text-center text-sm text-black">
                        PKPP Agro Sdn Bhd © 2025 Hak Cipta Terpelihara
                            {/* Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
