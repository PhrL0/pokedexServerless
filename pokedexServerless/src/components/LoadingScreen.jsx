import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

// Importe suas animações Lottie
import bulbasaurAnim from '../animations/001 Bulbasaur.json';
import pikachuAnim from '../animations/Pikachu.json';

import './LoadingScreen.css';

// --- Banco de Dicas e Animações ---
const animations = [bulbasaurAnim, pikachuAnim];
const tips = [
  "Dica: Tente capturar em diferentes horários do dia!",
  "Dica: Pokémon do tipo Água são fortes contra os do tipo Fogo.",
  "Dica: Complete sua Pokédex para se tornar um Mestre Pokémon!",
  "Dica: Pokémon elétricos são imunes a paralisia.",
  "Dica: Verifique sua Pokédex para aprender mais sobre suas capturas."
];

// Seleciona um item aleatório de um array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function LoadingScreen({ text = "A carregar..." }) {
  // Usamos useState com uma função para garantir que a seleção aleatória
  // aconteça apenas uma vez, na montagem do componente.
  const [selectedAnimation] = useState(() => getRandomItem(animations));
  const [selectedTip] = useState(() => getRandomItem(tips));

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <Lottie 
          animationData={selectedAnimation} 
          loop={true} 
          className="loading-animation"
        />
        <p className="loading-text">{text}</p>
        <p className="loading-tip">{selectedTip}</p>
      </div>
    </div>
  );
}