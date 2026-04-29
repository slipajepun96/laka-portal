import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";

export default function AllotteeLayout({ children }) {
    return (
        <div className=" min-h-screen bg-gray-50 md:pt-6 sm:justify-center pt-2 ">
            {/* <nav className="bg-gray-900 border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-bold whitespace-nowrap text-white">Portal Laka</span>
                    </a>
                </div>
            </nav> */}
            <div className="flex flex-col max-w-screen-xl mx-auto">
                {/* <div>
                    <Sidebar aria-label="Default sidebar example">
                        <SidebarItems>
                            <SidebarItemGroup>
                                <SidebarItem href="#">
                                    Utama
                                </SidebarItem>
                                <SidebarItem href="#">
                                    Penyata
                                </SidebarItem>
                            </SidebarItemGroup>
                        </SidebarItems>
                    </Sidebar>
                </div> */}
                {/* <div> */}
                    {/* <div className="mt-6 overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-7xl sm:rounded-lg"> */}
                        {children}
                    {/* </div> */}
                {/* </div> */}
            </div>
            



        </div>
    );
}
