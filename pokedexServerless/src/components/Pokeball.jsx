import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import pokeballIcon from '../assets/pokeball.png';
import './Pokeball.css'; // Criaremos este CSS a seguir

// O 'onThrow' é uma função que o componente pai (Dashboard) vai nos passar
export default function Pokeball({ onThrow, disabled }) {
  // 1. Configura a animação com react-spring
  // 'props' será um objeto animado com as propriedades x, y e scale
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 20 }, // Configuração da "mola"
  }));

  // 2. Configura o gesto de arrastar com use-gesture
const bind = useDrag(({ active, movement: [, my], down, velocity: [, vy] }) => {
    console.log(`Ativo: ${active}, Distância Y: ${my}, Velocidade Y: ${vy}`);

    if (disabled) return;

    // ----- CONDIÇÃO DE TESTE SUPER SIMPLES -----
    // Vamos chamar a função SEMPRE que você soltar o clique,
    // não importa a distância ou a velocidade.
    if (!active && down === false) { 
      console.log('TESTE: O evento de soltar foi detectado!');
      
      // Verificamos se a distância foi para cima para não disparar em qualquer clique
      if (my < 0) {
        onThrow(); // Chama a função de captura do Dashboard
        
        api.start({ y: -500, scale: 0.5, config: { duration: 300 } });
        setTimeout(() => api.start({ y: 0, scale: 1 }), 1000);
      }
    } else if (active) { // Apenas atualiza a posição enquanto estiver arrastando
      api.start({
        y: my,
        scale: 1.1,
        immediate: down,
      });
    } else { // Se soltar sem arremessar, volta ao início
        api.start({ y: 0, scale: 1 });
    }
  });

  // 3. Renderiza a pokébola animada
  return (
    <div className="pokeball-wrapper">
      {/* O componente 'animated.div' aplica os estilos de animação */}
      <animated.div {...bind()} style={{ x, y, scale, touchAction: 'none' }}>
        <img src={pokeballIcon} alt="Arremessar Pokébola" className="pokeball-draggable" />
      </animated.div>
    </div>
  );
}