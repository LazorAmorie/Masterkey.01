const QuickActionButton = ({ label, icon, hoverColor }) => {
    return (
        <button className={`flex flex-col items-center gap-2 p-4 rounded-lg ${hoverColor} transition-colors border border-slate-200`}>
            <div className={`w-12 h-12 bg-gradient-to-r ${getGradient(hoverColor)} rounded-full flex items-center justify-center`}>
                <svg className={`w-6 h-6 ${getIconColor(hoverColor)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {icon}
                </svg>
            </div>
            <span className="text-sm font-medium text-slate-700">{label}</span>
        </button>
    );
};

const getGradient = (hoverColor) => {
    switch (hoverColor) {
        case 'hover:bg-purple-50':
            return 'from-purple-100 to-purple-100';
        case 'hover:bg-blue-50':
            return 'from-blue-100 to-blue-100';
        case 'hover:bg-green-50':
            return 'from-green-100 to-green-100';
        case 'hover:bg-pink-50':
            return 'from-pink-100 to-pink-100';
        default:
            return 'from-purple-100 to-purple-100';
    }
};

const getIconColor = (hoverColor) => {
    switch (hoverColor) {
        case 'hover:bg-purple-50':
            return 'text-purple-600';
        case 'hover:bg-blue-50':
            return 'text-blue-600';
        case 'hover:bg-green-50':
            return 'text-green-600';
        case 'hover:bg-pink-50':
            return 'text-pink-600';
        default:
            return 'text-purple-600';
    }
};

export default QuickActionButton;
