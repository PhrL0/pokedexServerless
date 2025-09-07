import React from 'react';
import './AnimatedGrass.css';
import tallGrassImage from '../assets/tall-grass.png';

// O componente agora aceita as props que definimos no Dashboard
export default function AnimatedGrass({ isRustling, style, onClick }) {
  // A classe 'rustling' será adicionada ou removida com base na prop
  const containerClasses = `animated-grass-container ${isRustling ? 'rustling' : ''}`;

  return (
    <div className={containerClasses} style={style} onClick={onClick}>
      <div className="grass-shadow" />
      <img 
        src={tallGrassImage} 
        alt="Grama Alta se mexendo" 
        className="tall-grass-image" 
      />
    </div>
  );
}