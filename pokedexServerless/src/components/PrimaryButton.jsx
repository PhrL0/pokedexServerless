import React from 'react';
import { motion } from 'framer-motion';
import { PokeballIcon } from './icons';

const PrimaryButton = ({ children, isLoading, ...props }) => {
  return (
    <motion.button
      className="login-button"
      whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <PokeballIcon /> : children}
    </motion.button>
  );
};

export default PrimaryButton;