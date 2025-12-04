import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, error, id, name, variant = 'dark', required, ...props }) => {
    const inputId = id || name;

    // Dark variant for Login page, light variant for Signup page
    const labelClasses = variant === 'dark'
        ? 'text-sm mb-2 text-white/90 font-medium'
        : 'text-sm mb-2 text-gray-700 font-medium';

    const inputClasses = variant === 'dark'
        ? `px-4 py-3 rounded-lg border bg-white/5 text-white text-base transition-all duration-200 outline-none placeholder:text-white/40 focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20 ${error ? 'border-red-500' : 'border-white/10'}`
        : `px-4 py-3 rounded-lg border bg-white text-gray-900 text-base transition-all duration-200 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${error ? 'border-red-500' : 'border-gray-300'}`;

    return (
        <div className="flex flex-col mb-4 w-full">
            {label && (
                <label htmlFor={inputId} className={labelClasses}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={inputClasses}
                required={required}
                {...props}
            />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default Input;
