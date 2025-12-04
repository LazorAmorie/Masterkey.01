import { useEffect } from 'react';
import useDashboardState from '../hooks/useDashboardState';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import OverviewTab from '../components/OverviewTab';
import AccountsTab from '../components/AccountsTab';
import TransactionsTab from '../components/TransactionsTab';
import SettingsTab from '../components/SettingsTab';

const Dashboard = () => {
    const dashboardState = useDashboardState();
    const { 
        activeTab, 
        setActiveTab, 
        sidebarOpen, 
        setSidebarOpen,
        lastVisitedTabs,
        restoreLastState
    } = dashboardState;

    // Restore state on first load if user is returning
    useEffect(() => {
        restoreLastState();
    }, [restoreLastState]);

    // Handle back button click
    const handleBackClick = () => {
        if (lastVisitedTabs.length > 1) {
            const previousTab = lastVisitedTabs[lastVisitedTabs.length - 2];
            setActiveTab(previousTab);
        }
    };

    const canGoBack = lastVisitedTabs.length > 1;

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
            <DashboardSidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <DashboardHeader 
                    activeTab={activeTab} 
                    userData={userData}
                    onBackClick={handleBackClick}
                    canGoBack={canGoBack}
                />

                {/* Dashboard Content */}
                <div className="p-8">
                    {activeTab === 'overview' && <OverviewTab userData={userData} recentTransactions={recentTransactions} />}
                    {activeTab === 'accounts' && <AccountsTab userData={userData} />}
                    {activeTab === 'transactions' && <TransactionsTab recentTransactions={recentTransactions} />}
                    {activeTab === 'settings' && <SettingsTab />}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
