import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

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
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Enter your credentials to access your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
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

                    {errors.form && <div className="input-error-message" style={{ textAlign: 'center' }}>{errors.form}</div>}

                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        style={{ marginTop: '1rem' }}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <a href="#" className="login-link">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
