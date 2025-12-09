import AccountCard from './AccountCard';

const AccountsTab = ({ userData }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AccountCard type="bank" userData={userData} />
                <AccountCard type="wallet" userData={userData} />
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
    );
};

export default AccountsTab;
