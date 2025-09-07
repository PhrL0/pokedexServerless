import React from 'react';
import './CaptureModal.css';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import starsAnimation from '../animations/shining stars.json';

// --- Variantes de Animação ---

// Para o overlay escuro
const overlayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

// Para o container do modal (o card branco)
const modalVariants = {
  hidden: { y: "-50%", x: "-50%", scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 20,
      // Orquestra a animação dos filhos
      staggerChildren: 0.15 
    } 
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

// Para os elementos filhos (título, imagem, etc.)
const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function CaptureModal({ isOpen, onClose, pokemonData }) {
  if (!pokemonData) return null;

  const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Animação Lottie como fundo */}
            <Lottie 
              animationData={starsAnimation} 
              loop={true} 
              className="lottie-background"
            />
            
            <motion.h2 variants={childVariants}>Parabéns!</motion.h2>
            
            <motion.div className="pokemon-reveal" variants={childVariants}>
              <div className="pokemon-glow" />
              <motion.img 
                src={pokemonData.spriteUrl} 
                alt={pokemonName} 
                className="pokemon-sprite" 
                // Animação extra para o sprite
                initial={{ scale: 0.5 }}
                animate={{ scale: 1, transition: { delay: 0.2, type: "spring", stiffness: 300, damping: 15 } }}
              />
            </motion.div>

            <motion.p variants={childVariants}>
              Você capturou um {pokemonName}! ✨
            </motion.p>
            
            <motion.button 
              onClick={onClose} 
              className="modal-button"
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OK!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}