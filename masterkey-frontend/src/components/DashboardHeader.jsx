const DashboardHeader = ({ activeTab, userData, onBackClick, canGoBack }) => {
    const getTabTitle = () => {
        switch (activeTab) {
            case 'overview':
                return 'Dashboard Overview';
            case 'accounts':
                return 'My Accounts';
            case 'transactions':
                return 'Transaction History';
            case 'settings':
                return 'Settings';
            default:
                return 'Dashboard';
        }
    };

    return (
        <header className="bg-white border-b border-slate-200 px-8 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {canGoBack && (
                        <button
                            onClick={onBackClick}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Go to previous tab"
                        >
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {getTabTitle()}
                        </h2>
                        <p className="text-slate-600 text-sm mt-1">Welcome back, {userData.name}!</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {userData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
