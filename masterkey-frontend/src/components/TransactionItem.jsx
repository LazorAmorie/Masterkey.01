const TransactionItem = ({ transaction, isDetailed = false }) => {
    const getIconPath = () => {
        if (transaction.type === 'deposit') {
            return 'M7 11l5-5m0 0l5 5m-5-5v12';
        } else if (transaction.type === 'withdrawal') {
            return 'M17 13l-5 5m0 0l-5-5m5 5V6';
        } else {
            return 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4';
        }
    };

    const getColorClasses = () => {
        if (transaction.type === 'deposit') {
            return { bg: 'bg-green-100', text: 'text-green-600' };
        } else if (transaction.type === 'withdrawal') {
            return { bg: 'bg-red-100', text: 'text-red-600' };
        } else {
            return { bg: 'bg-blue-100', text: 'text-blue-600' };
        }
    };

    const colors = getColorClasses();
    const iconSize = isDetailed ? 'w-12 h-12' : 'w-10 h-10';
    const svgSize = isDetailed ? 'w-6 h-6' : 'w-5 h-5';
    const amountSize = isDetailed ? 'text-lg' : '';

    return (
        <div className={`flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors ${isDetailed ? 'border border-slate-100' : ''}`}>
            <div className="flex items-center gap-4">
                <div className={`${iconSize} ${colors.bg} rounded-full flex items-center justify-center`}>
                    <svg className={`${svgSize} ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath()} />
                    </svg>
                </div>
                <div>
                    <p className="font-medium text-slate-800">{transaction.description}</p>
                    <p className="text-sm text-slate-500">
                        {transaction.date}
                        {isDetailed && ` • ${transaction.type}`}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-semibold ${amountSize} ${transaction.type === 'deposit' ? 'text-green-600' : 'text-slate-800'
                    }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {transaction.status}
                </span>
            </div>
        </div>
    );
};

export default TransactionItem;
