const AccountCard = ({ type, userData }) => {
    if (type === 'bank') {
        return (
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
        );
    }

    return (
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
    );
};

export default AccountCard;
