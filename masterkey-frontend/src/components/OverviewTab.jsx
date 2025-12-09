import StatCard from './StatCard';
import QuickActionButton from './QuickActionButton';
import TransactionItem from './TransactionItem';

const OverviewTab = ({ userData, recentTransactions }) => {
    const quickActions = [
        {
            label: 'Add Money',
            hoverColor: 'hover:bg-purple-50',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        },
        {
            label: 'Transfer',
            hoverColor: 'hover:bg-blue-50',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        },
        {
            label: 'Pay Bills',
            hoverColor: 'hover:bg-green-50',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        },
        {
            label: 'Analytics',
            hoverColor: 'hover:bg-pink-50',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        }
    ];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Balance"
                    value={`$${userData.accountBalance.toLocaleString()}`}
                    trend="+12.5%"
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    bgColor="text-purple-600"
                    iconBg="bg-purple-100"
                />
                <StatCard
                    title="Wallet Balance"
                    value={`$${userData.walletBalance.toLocaleString()}`}
                    trend="+5.2%"
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />}
                    bgColor="text-blue-600"
                    iconBg="bg-blue-100"
                />
                <StatCard
                    title="This Month"
                    value="$2,450"
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />}
                    bgColor="text-green-600"
                    iconBg="bg-green-100"
                />
                <StatCard
                    title="Expenses"
                    value="$1,230"
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />}
                    bgColor="text-red-600"
                    iconBg="bg-red-100"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <QuickActionButton
                            key={index}
                            label={action.label}
                            hoverColor={action.hoverColor}
                            icon={action.icon}
                        />
                    ))}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
                    <button className="text-purple-600 text-sm font-medium hover:text-purple-700">View All</button>
                </div>
                <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
