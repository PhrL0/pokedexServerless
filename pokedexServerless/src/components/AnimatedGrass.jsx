import React from 'react';
import './AnimatedGrass.css'; // Usaremos o mesmo nome de arquivo, mas com novo conteúdo
import tallGrassImage from '../assets/tall-grass.png';

export default function AnimatedGrass() {
  return (
    <div className="animated-grass-container">
      <img 
        src={tallGrassImage} 
        alt="Grama Alta se mexendo" 
        className="tall-grass-image" 
      />
    </div>
  );
}