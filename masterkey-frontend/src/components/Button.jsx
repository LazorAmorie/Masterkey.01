import React from 'react';
import './Button.css'; // We'll create this for specific button styles

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled, isLoading, className = '', ...props }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`btn btn-${variant} ${className}`}
            {...props}
        >
            {isLoading ? <span className="btn-loader"></span> : children}
        </button>
    );
};

export default Button;
