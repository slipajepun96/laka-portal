// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link, usePage } from '@inertiajs/react';
// import { useState } from 'react';

// export default function AuthenticatedLayout({ header, children }) {
//     const user = usePage().props.auth.user;

//     const [showingNavigationDropdown, setShowingNavigationDropdown] =
//         useState(false);

//     return (
//         <div className="min-h-screen bg-gray-100">


//             <nav class="bg-gray-900 border-gray-700">
//             <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                 <a href="/dashboard" class="flex items-center space-x-3 rtl:space-x-reverse">
//                     <span class="self-center text-2xl font-bold whitespace-nowrap text-white">Portal Laka</span>
//                 </a>
//                 <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
//                     <span class="sr-only">Open main menu</span>
//                     <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
//                     </svg>
//                 </button>
//                 <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
//                 <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
//                     <li>
//                     {/* <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a> */}
//                         <NavLink
//                             href={route('dashboard')}
//                             active={route().current('dashboard')}
//                             className=""
//                         >
//                             Utama
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             href={route('lots.index')}
//                             active={route().current('lots.index')}
//                             className=""
//                         >
//                             Lot
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             href={route('allottee.index')}
//                             active={route().current('allottee.index')}
//                             className=""
//                         >
//                             Peserta
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             href={route('transaction.index')}
//                             active={route().current('transaction.*')}
//                             className=""
//                         >
//                             Penyata & Transaksi
//                         </NavLink>
//                     </li>
//                     {/* <li>
//                         <NavLink
//                             href={route('logout')}
//                             active={route().current('logout')}
//                             className=""
//                         >
//                             Tetapan Sistem
//                         </NavLink>
//                     </li> */}
//                     <li>
//                         <NavLink 
//                             href={route('profile.edit')} 
//                             active={route().current('profile')}>
//                             Profile
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             method="post"
//                             href={route('logout')}
//                             as="button"
//                         >
//                             Log Out
//                         </NavLink>
//                     </li>
//                     <li>
//                         <div className="">
//                             <div className="text-sm font-medium text-white">
//                                 {user.name}
//                             </div>
//                             <div className="text-xs font-medium text-gray-300">
//                                 {user.email}
//                             </div>
                            
//                         </div>
//                     </li>

//                     {/* <li> */}
//                         {/* <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
//                         </svg></button> */}
//                         {/* <!-- Dropdown menu --> */}
//                         {/* <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
//                             <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
//                             <li>
//                                 <NavLink
//                                     href={route('dashboard')}
//                                     active={route().current('dashboard')}
//                                 >
//                                     Dashboard
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
//                             </li>
//                             <li>
//                                 <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
//                             </li>
//                             </ul>
//                             <div class="py-1">
//                                 <ResponsiveNavLink
//                                     method="post"
//                                     href={route('logout')}
//                                     as="button"
//                                 >
//                                     Log Out
//                                 </ResponsiveNavLink>
//                             </div>
//                         </div> */}
//                     {/* </li> */}
//                     <li>
//                     {/* <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a> */}
//                     </li>
//                 </ul>
//                 </div>
//             </div>
//             </nav>

//             {header && (
//                 // <header className="bg-white shadow">
//                 //     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                 //         {header}
//                 //     </div>
//                 // </header>
//                 <header className="">
//                     <div className="mx-auto max-w-7xl px-4 py-4 sm:px-2 lg:px-4">
//                         {header}
//                     </div>
//                 </header>
//             )}

//             <main>{children}</main>
//         </div>
//     );
// }

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-gray-900 text-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/dashboard">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-50 font-bold text-2xl" />
                                </Link>
                        {/* <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a> */}
                            <div className='hidden md:block ml-10'>
                                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                                    <li>
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                        className=""
                                    >
                                        Utama
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        href={route('lots.index')}
                                        active={route().current('lots.index')}
                                        className=""
                                    >
                                        Lot
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        href={route('allottee.index')}
                                        active={route().current('allottee.index')}
                                        className=""
                                    >
                                        Peserta
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        href={route('transaction.index')}
                                        active={route().current('transaction.*')}
                                        className=""
                                    >
                                        Penyata & Transaksi
                                    </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-50 transition duration-150 ease-in-out hover:text-gray-100 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className='text-lg'
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-50 transition duration-150 ease-in-out hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile sidebar overlay */}
                {showingNavigationDropdown && (
                    <div className="fixed inset-0 z-50 sm:hidden">
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 bg-white bg-opacity-50 transition-opacity"
                            onClick={() => setShowingNavigationDropdown(false)}
                        />
                        
                        {/* Sidebar */}
                        <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out transform">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                                <Link href="/" onClick={() => setShowingNavigationDropdown(false)}>
                                    <ApplicationLogo className="block h-8 w-auto fill-current text-gray-50" />
                                </Link>
                                <button
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="p-2 text-gray-200 hover:text-gray-200 hover:bg-gray-800 rounded-md"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="px-4 py-6 space-y-2">
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="text-gray-100 hover:bg-gray-800 rounded-lg px-3 py-3 block"
                                >
                                    Utama
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('lots.index')}
                                    active={route().current('lots.index')}
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="text-gray-100 hover:bg-gray-800 rounded-lg px-3 py-3 block"
                                >
                                    Lot
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('allottee.index')}
                                    active={route().current('allottee.index')}
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="text-gray-100 hover:bg-gray-800 rounded-lg px-3 py-3 block"
                                >
                                    Peserta
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('transaction.index')}
                                    active={route().current('transaction.index')}
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="text-gray-100 hover:bg-gray-800 rounded-lg px-3 py-3 block"
                                >
                                    Penyata & Transaksi
                                </ResponsiveNavLink>
                            </div>

                            {/* User Profile Section */}
                            <div className="border-t border-gray-700 px-4 py-6">
                                <div className="mb-4">
                                    <div className="text-base font-medium text-gray-100">
                                        {user.name}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <ResponsiveNavLink 
                                        href={route('profile.edit')} 
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        className="text-gray-100 hover:bg-gray-800 rounded-lg px-3 py-3 block"
                                    >
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        className="text-red-400 hover:bg-gray-800 rounded-lg px-3 py-3 block w-full text-left"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{typeof children === 'function' ? children({ user }) : children}</main>
        </div>
    );
}

