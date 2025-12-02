import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled, isLoading, className = '', ...props }) => {
    const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-200 border-none outline-none w-full disabled:opacity-60 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg shadow-primary-hover/30 hover:translate-y-[-1px] hover:shadow-xl hover:shadow-primary-hover/40 active:translate-y-0",
        secondary: "bg-white/10 text-white border border-white/10 hover:bg-white/15"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
