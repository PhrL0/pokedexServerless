import React from 'react';
import './CaptureModal.css';
import Lottie from 'lottie-react';
import stars from '../animations/shining stars.json'
export default function CaptureModal({ isOpen, onClose, pokemonData }) {
  if (!isOpen || !pokemonData) {
    return null; // Não renderiza nada se não estiver aberto ou não tiver dados
  }

  // Capitaliza a primeira letra do nome do Pokémon
  const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
         <Lottie 
          animationData={stars} 
          loop={true} 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: 500, 
            height: 300,
            zIndex: 0
          }} 
        />
        <h2>Parabéns!</h2>
        <img src={pokemonData.spriteUrl} alt={pokemonName} className="pokemon-sprite" />
        <p>Você capturou um {pokemonName}!</p>
        <button onClick={onClose} className="modal-button">OK!</button>
      </div>
    </div>
  );
}