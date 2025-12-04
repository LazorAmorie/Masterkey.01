import TransactionItem from './TransactionItem';

const TransactionsTab = ({ recentTransactions }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">All Transactions</h3>
            <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} isDetailed={true} />
                ))}
            </div>
        </div>
    );
};

export default TransactionsTab;
