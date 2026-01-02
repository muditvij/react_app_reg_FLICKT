import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const { data } = await api.post('/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('token', data.token);
            toast.success('Registration successful!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="page-container"
        >
            <div className="glass-card p-8">
                <h1 className="title">Create Account</h1>
                <p className="subtitle">Register</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        name="name"
                        placeholder="Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={errors.name}
                        icon={User}
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                        icon={Mail}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors.password}
                        icon={Lock}
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        error={errors.confirmPassword}
                        icon={Lock}
                    />

                    <Button type="submit" isLoading={isLoading} style={{ marginTop: '1rem' }}>
                        Get Started <ArrowRight size={18} />
                    </Button>
                </form>

                <p className="text-center mt-6 text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="link-text">
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;
