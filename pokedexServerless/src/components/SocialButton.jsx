import React from 'react';
import { motion } from 'framer-motion';

const SocialButton = ({ children, icon, provider, ...props }) => {
  return (
    <motion.button
      className={`social-button ${provider}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon} {children}
    </motion.button>
  );
};

export default SocialButton;