import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        nationalId: '',
        bankName: '',
        bankAccountNumber: '',
        walletProvider: '',
        walletNumber: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters';
        }

        // Phone Number validation
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // National ID validation
        if (!formData.nationalId.trim()) {
            newErrors.nationalId = 'National ID is required';
        }

        // Bank Name validation
        if (!formData.bankName.trim()) {
            newErrors.bankName = 'Bank name is required';
        }

        // Bank Account Number validation
        if (!formData.bankAccountNumber.trim()) {
            newErrors.bankAccountNumber = 'Bank account number is required';
        } else if (!/^\d+$/.test(formData.bankAccountNumber)) {
            newErrors.bankAccountNumber = 'Bank account number must contain only digits';
        }

        // Wallet Provider validation
        if (!formData.walletProvider.trim()) {
            newErrors.walletProvider = 'Wallet provider is required';
        }

        // Wallet Number validation
        if (!formData.walletNumber.trim()) {
            newErrors.walletNumber = 'Wallet number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            // TODO: Add API call to submit form data
            alert('Signup successful! (This is a demo)');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600">Join us today and get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                error={errors.fullName}
                                variant="light"
                                required
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                error={errors.phoneNumber}
                                variant="light"
                                required
                            />
                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.doe@example.com"
                            error={errors.email}
                            variant="light"
                            required
                        />

                        <Input
                            label="National ID Number"
                            type="text"
                            name="nationalId"
                            value={formData.nationalId}
                            onChange={handleChange}
                            placeholder="Enter your national ID"
                            error={errors.nationalId}
                            variant="light"
                            required
                        />
                    </div>

                    {/* Security Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                            Security
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                error={errors.password}
                                variant="light"
                                required
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                error={errors.confirmPassword}
                                variant="light"
                                required
                            />
                        </div>
                    </div>

                    {/* Banking Information Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                            Banking Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Bank Name"
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                placeholder="Select or enter bank name"
                                error={errors.bankName}
                                variant="light"
                                required
                            />

                            <Input
                                label="Bank Account Number"
                                type="text"
                                name="bankAccountNumber"
                                value={formData.bankAccountNumber}
                                onChange={handleChange}
                                placeholder="1234567890"
                                error={errors.bankAccountNumber}
                                variant="light"
                                required
                            />
                        </div>
                    </div>

                    {/* Wallet Information Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                            Wallet Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Wallet Provider"
                                type="text"
                                name="walletProvider"
                                value={formData.walletProvider}
                                onChange={handleChange}
                                placeholder="e.g., PayPal, M-Pesa, etc."
                                error={errors.walletProvider}
                                variant="light"
                                required
                            />

                            <Input
                                label="Wallet Number"
                                type="text"
                                name="walletNumber"
                                value={formData.walletNumber}
                                onChange={handleChange}
                                placeholder="Enter wallet number"
                                error={errors.walletNumber}
                                variant="light"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
