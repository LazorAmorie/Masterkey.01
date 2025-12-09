const StatCard = ({ title, value, icon, trend, bgColor, iconBg }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
                    <svg className={`w-6 h-6 ${bgColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {icon}
                    </svg>
                </div>
                {trend && <span className="text-green-500 text-sm font-medium">{trend}</span>}
            </div>
            <h3 className="text-slate-600 text-sm mb-1">{title}</h3>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    );
};

export default StatCard;
