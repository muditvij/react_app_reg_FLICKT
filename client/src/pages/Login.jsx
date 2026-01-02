import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';
import api from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const { data } = await api.post('/login', formData);
            localStorage.setItem('token', data.token);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
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
                <h1 className="title">Welcome Back</h1>
                <p className="subtitle">Enter your credentials to access your account</p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="ex. muditvij@gmail.com"
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

                    <Button type="submit" isLoading={isLoading} style={{ marginTop: '1rem' }}>
                        Sign In <LogIn size={18} />
                    </Button>
                </form>

                <p className="text-center mt-6 text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="link-text">
                        Create account
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Login;
