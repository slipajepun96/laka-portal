import React, { useState } from 'react';

export default function DataTable({ columns, data, className = "", showSearch = true }) {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Sorting function
    const handleSort = (accessor) => {
        let direction = 'asc';
        if (sortConfig.key === accessor && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: accessor, direction });
    };

    // Filter data based on search input
    const filteredData = data.filter((row) =>
        columns.some((column) => {
            if (Array.isArray(column.accessor)) {
                // If accessor is an array, check all fields in the array
                return column.accessor.some((key) =>
                    row[key]?.toString().toLowerCase().includes(search.toLowerCase())
                );
            } else {
                // Otherwise, check the single accessor field
                return row[column.accessor]
                    ?.toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());
            }
        })
    );

    // Sort data
    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            // Check if values are numbers
            const aNum = Number(aValue);
            const bNum = Number(bValue);
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
            }

            // String comparison
            const aStr = aValue.toString().toLowerCase();
            const bStr = bValue.toString().toLowerCase();
            
            if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    return (
        <div className={className}>
            {/* Search Input */}
            {showSearch && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            )}

            {/* Table */}
            <div className="mt-4 text-sm text-gray-600">
                Menunjukkan {sortedData.length} daripada {data.length} baris.
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 bg-white">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.accessor || column.Header}
                                    className={`px-4 py-2 text-left border-gray-200 bg-gray-900 text-white ${
                                        column.sortable ? 'cursor-pointer select-none hover:bg-gray-800' : ''
                                    }`}
                                    onClick={() => column.sortable && handleSort(column.accessor)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.Header}
                                        {column.sortable && (
                                            <span className="text-xs">
                                                {sortConfig.key === column.accessor ? (
                                                    sortConfig.direction === 'asc' ? '▲' : '▼'
                                                ) : '⇅'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {columns.map((column) => (
                                    <td
                                        key={column.accessor || column.Header}
                                        className="px-4 py-2 border-b border-gray-200"
                                    >
                                         {/* Check if the column has a custom Cell property */}
                                         {column.Cell
                                            ? column.Cell({ row }) // Render custom Cell
                                            : row[column.accessor]} {/* Render default accessor */}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {sortedData.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-2 text-center text-gray-500"
                                >
                                    Tiada data ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Row Count Summary */}

        </div>
    );
}