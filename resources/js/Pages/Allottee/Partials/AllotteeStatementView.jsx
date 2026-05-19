import StatementDataTable from '@/Components/StatementDataTable';

export default function AllotteeStatementView({ transactions, year, lot_list }) {

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const yr = date.getFullYear();
        return `${day} ${month} ${yr}`;
    };

    const getTransactionsWithBalance = (txs) => {
        let runningBalance = 0;
        return txs.map(tx => {
            if (tx.transaction_type === 'debit' || tx.transaction_type === 'brought_forward' || tx.transaction_type === 'carry_forward') {
                runningBalance += parseFloat(tx.transaction_amount || 0);
            } else if (tx.transaction_type === 'credit') {
                runningBalance -= parseFloat(tx.transaction_amount || 0);
            }
            return { ...tx, running_balance: runningBalance };
        });
    };

    const columns = [
        {
            Header: 'Transaksi',
            accessor: 'transaction_name',
            Cell: ({ row }) => (
                <div>
                    <div className="font-semibold text-gray-800">{row.transaction_name}</div>
                    <div className="font-medium text-sm text-gray-600">{formatDate(row.transaction_posted_date)}</div>
                    {row.transaction_type === 'debit' || row.transaction_type === 'credit' ? (
                        <div className="grid grid-cols-2 gap-4 text-md">
                            <div>
                                <span className="text-gray-600">Debit: </span>
                                {row.transaction_type === 'debit' ? (
                                    <span className='text-green-500 md:text-lg font-black'>
                                        RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                ) : '-'}
                            </div>
                            <div>
                                <span className="text-gray-600">Kredit: </span>
                                {row.transaction_type === 'credit' ? (
                                    <span className='text-red-500 md:text-lg font-bold'>
                                        RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                ) : '-'}
                            </div>
                        </div>
                    ) : (
                        row.transaction_type === 'brought_forward' || row.transaction_type === 'carry_forward' ? (
                            <span className='text-blue-500 md:text-lg font-black'>
                                RM {parseFloat(row.transaction_amount || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        ) : '-'
                    )}
                </div>
            ),
        },
        {
            Header: 'Baki (RM)',
            accessor: 'running_balance',
            Cell: ({ row }) => (
                <div className="text-sm md:text-lg font-bold text-right text-nowrap">
                    {parseFloat(row.running_balance || 0).toLocaleString('ms-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            ),
        },
    ];

    return (
        <div className='w-full max-w-7xl'>
            <p className='text-lg font-semibold'>Penyata Transaksi {year}</p>

            {lot_list.map((lot) => {
                const lotTransactions = getTransactionsWithBalance(
                    transactions.filter(tx => tx.lot_id === lot.id)
                );
                return (
                    <div key={lot.id} className="mb-6">
                        <p className="font-semibold text-gray-700 mt-4 mb-1 px-1">Lot {lot.lot_num}</p>
                        <StatementDataTable columns={columns} data={lotTransactions} className="overflow-hidden" showSearch={false} />
                    </div>
                );
            })}

            <p className='text-sm text-gray-500 my-4'>
                <b>Nota:</b> Penyata ini mungkin mengandungi kesilapan. Sekiranya terdapat sebarang kesilapan atau pertanyaan mengenai penyata ini, sila hubungi PKPP Agro Sdn. Bhd. di talian 011-26637117.
            </p>
        </div>
    );
}