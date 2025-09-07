import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../animations/001 Bulbasaur.json'; // Importe a sua animação
import './LoadingScreen.css'; // O CSS para estilizar

// Aceitamos uma prop 'text' para customizar a mensagem
export default function LoadingScreen({ text = "A carregar..." }) {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <Lottie 
          animationData={loadingAnimation} 
          loop={true} 
          style={{ width: 150, height: 150 }} // Ajuste o tamanho conforme a sua animação
        />
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
}