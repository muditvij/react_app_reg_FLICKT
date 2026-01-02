import { motion } from 'framer-motion';

const Input = ({ label, error, icon: Icon, ...props }) => {
    return (
        <div className="input-group">
            {label && <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>}
            <div className="relative">
                <input
                    className={`input-field ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                    {...props}
                />
                {Icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon size={20} />
                    </div>
                )}
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="error-msg"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default Input;
