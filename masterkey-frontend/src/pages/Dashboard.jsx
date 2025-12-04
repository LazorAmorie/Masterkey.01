import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Mock user data
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        accountBalance: 12450.50,
        walletBalance: 3250.75,
        bankAccount: '****5678',
        walletProvider: 'M-Pesa'
    };

    // Mock transactions
    const recentTransactions = [
        { id: 1, type: 'deposit', amount: 500, date: '2024-12-03', status: 'completed', description: 'Salary deposit' },
        { id: 2, type: 'withdrawal', amount: 150, date: '2024-12-02', status: 'completed', description: 'ATM withdrawal' },
        { id: 3, type: 'transfer', amount: 200, date: '2024-12-01', status: 'pending', description: 'Transfer to wallet' },
        { id: 4, type: 'deposit', amount: 1000, date: '2024-11-30', status: 'completed', description: 'Freelance payment' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        {sidebarOpen && (
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                MasterKey
                            </h1>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {sidebarOpen && <span>Overview</span>}
                        </button>

                        <button
                            onClick={() => setActiveTab('accounts')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'accounts' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            {sidebarOpen && <span>Accounts</span>}
                        </button>

                        <button
                            onClick={() => setActiveTab('transactions')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'transactions' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {sidebarOpen && <span>Transactions</span>}
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {sidebarOpen && <span>Settings</span>}
                        </button>
                    </nav>

                    <div className="absolute bottom-6 left-0 right-0 px-6">
                        <Link to="/">
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all text-white/70 hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {sidebarOpen && <span>Logout</span>}
                            </button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Bar */}
                <header className="bg-white border-b border-slate-200 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                {activeTab === 'overview' && 'Dashboard Overview'}
                                {activeTab === 'accounts' && 'My Accounts'}
                                {activeTab === 'transactions' && 'Transaction History'}
                                {activeTab === 'settings' && 'Settings'}
                            </h2>
                            <p className="text-slate-600 text-sm mt-1">Welcome back, {userData.name}!</p>
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

                {/* Dashboard Content */}
                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-green-500 text-sm font-medium">+12.5%</span>
                                    </div>
                                    <h3 className="text-slate-600 text-sm mb-1">Total Balance</h3>
                                    <p className="text-2xl font-bold text-slate-800">${userData.accountBalance.toLocaleString()}</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                        <span className="text-green-500 text-sm font-medium">+5.2%</span>
                                    </div>
                                    <h3 className="text-slate-600 text-sm mb-1">Wallet Balance</h3>
                                    <p className="text-2xl font-bold text-slate-800">${userData.walletBalance.toLocaleString()}</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-slate-600 text-sm mb-1">This Month</h3>
                                    <p className="text-2xl font-bold text-slate-800">$2,450</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-slate-600 text-sm mb-1">Expenses</h3>
                                    <p className="text-2xl font-bold text-slate-800">$1,230</p>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-purple-50 transition-colors border border-slate-200">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">Add Money</span>
                                    </button>

                                    <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-50 transition-colors border border-slate-200">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">Transfer</span>
                                    </button>

                                    <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-green-50 transition-colors border border-slate-200">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">Pay Bills</span>
                                    </button>

                                    <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-pink-50 transition-colors border border-slate-200">
                                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">Analytics</span>
                                    </button>
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
                                        <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'deposit' ? 'bg-green-100' :
                                                        transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-blue-100'
                                                    }`}>
                                                    <svg className={`w-5 h-5 ${transaction.type === 'deposit' ? 'text-green-600' :
                                                            transaction.type === 'withdrawal' ? 'text-red-600' : 'text-blue-600'
                                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        {transaction.type === 'deposit' && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                                        )}
                                                        {transaction.type === 'withdrawal' && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                                        )}
                                                        {transaction.type === 'transfer' && (
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                        )}
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800">{transaction.description}</p>
                                                    <p className="text-sm text-slate-500">{transaction.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-slate-800'
                                                    }`}>
                                                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                                                </p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'accounts' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Bank Account Card */}
                                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 text-white">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-purple-200 text-sm mb-1">Bank Account</p>
                                            <p className="text-2xl font-bold">{userData.bankAccount}</p>
                                        </div>
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-purple-200 text-sm mb-1">Balance</p>
                                            <p className="text-3xl font-bold">${userData.accountBalance.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-purple-200 text-sm mb-1">Account Holder</p>
                                            <p className="font-semibold">{userData.name}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Wallet Card */}
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-blue-200 text-sm mb-1">{userData.walletProvider}</p>
                                            <p className="text-2xl font-bold">Digital Wallet</p>
                                        </div>
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-blue-200 text-sm mb-1">Balance</p>
                                            <p className="text-3xl font-bold">${userData.walletBalance.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-blue-200 text-sm mb-1">Status</p>
                                            <p className="font-semibold">Active</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Account Details</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-3 border-b border-slate-100">
                                        <span className="text-slate-600">Full Name</span>
                                        <span className="font-medium text-slate-800">{userData.name}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-slate-100">
                                        <span className="text-slate-600">Email</span>
                                        <span className="font-medium text-slate-800">{userData.email}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-slate-100">
                                        <span className="text-slate-600">Bank Account</span>
                                        <span className="font-medium text-slate-800">{userData.bankAccount}</span>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <span className="text-slate-600">Wallet Provider</span>
                                        <span className="font-medium text-slate-800">{userData.walletProvider}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'transactions' && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">All Transactions</h3>
                            <div className="space-y-3">
                                {recentTransactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === 'deposit' ? 'bg-green-100' :
                                                    transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-blue-100'
                                                }`}>
                                                <svg className={`w-6 h-6 ${transaction.type === 'deposit' ? 'text-green-600' :
                                                        transaction.type === 'withdrawal' ? 'text-red-600' : 'text-blue-600'
                                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {transaction.type === 'deposit' && (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                                    )}
                                                    {transaction.type === 'withdrawal' && (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                                    )}
                                                    {transaction.type === 'transfer' && (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    )}
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{transaction.description}</p>
                                                <p className="text-sm text-slate-500">{transaction.date} • {transaction.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold text-lg ${transaction.type === 'deposit' ? 'text-green-600' : 'text-slate-800'
                                                }`}>
                                                {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                                            </p>
                                            <span className={`text-xs px-3 py-1 rounded-full ${transaction.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {transaction.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Account Settings</h3>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="font-medium text-slate-700">Edit Profile</span>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span className="font-medium text-slate-700">Change Password</span>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            <span className="font-medium text-slate-700">Notifications</span>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span className="font-medium text-slate-700">Security</span>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
