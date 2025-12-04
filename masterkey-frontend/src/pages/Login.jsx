import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when user types
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Login successful', formData);

            // Handle successful login (e.g., redirect, set auth context)
        } catch (error) {
            console.error('Login failed', error);
            setErrors({ form: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary/15 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-primary-hover/15 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-12 rounded-3xl w-full max-w-[420px] shadow-2xl flex flex-col gap-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-white/60 text-base">
                        Enter your credentials to access your account
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        label="Username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                    />

                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    {errors.form && (
                        <div className="text-xs text-red-500 text-center">{errors.form}</div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        className="mt-4"
                    >
                        Sign In
                    </Button>
                </form>

                <div className="text-center mt-4 text-sm text-white/60">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary font-medium hover:text-primary-hover hover:underline transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
