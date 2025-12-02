import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, error, id, ...props }) => {
    return (
        <div className="flex flex-col mb-4 w-full">
            {label && (
                <label htmlFor={id} className="text-sm mb-2 text-white/90 font-medium">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`px-4 py-3 rounded-lg border bg-white/5 text-white text-base transition-all duration-200 outline-none placeholder:text-white/40 focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20 ${error ? 'border-red-500' : 'border-white/10'
                    }`}
                {...props}
            />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default Input;
