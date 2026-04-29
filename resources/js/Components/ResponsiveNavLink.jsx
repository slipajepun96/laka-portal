import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-startpy-2 pe-4 ps-3 ${
                active
                    ? ' bg-indigo-50 text-gray-900 hover:text-gray-200  '
                    : 'border-transparent text-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-200 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
