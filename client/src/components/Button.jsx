import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, isLoading, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : children}
        </motion.button>
    );
};

export default Button;
