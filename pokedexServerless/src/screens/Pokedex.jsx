import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

import '../style/PokedexStyle.css';
import Navbar from './Navbar';
import LoadingScreen from '../components/LoadingScreen';
import SearchIcon from '@mui/icons-material/Search';

// --- Variantes de Animação ---
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Efeito cascata super rápido
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Pokedex() {
  const [loading, setLoading] = useState(true);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [capturedPokemonIds, setCapturedPokemonIds] = useState(new Set());

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      try {
        // A PokéAPI tem um endpoint que lista todos os 151 de uma vez
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        // Mapeamos para um formato mais útil, com nome e ID
        const formattedData = data.results.map((p, index) => ({
          id: index + 1,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        setAllPokemonData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados da PokéAPI:", error);
      }
    };

    const fetchCapturedPokemon = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('capturas').select('pokemon_id').eq('user_id', user.id);
        if (error) {
          console.error('Erro ao buscar capturas:', error);
        } else {
          setCapturedPokemonIds(new Set(data.map(p => p.pokemon_id)));
        }
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAllPokemonData(), fetchCapturedPokemon()]);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen text="Analisando dados da Pokédex..." />;
  }

  return (
    <div className="pokedex-container">
      <Navbar />
      <header className="pokedex-header">
        <h1>Minha Pokédex</h1>
        <div className="search-bar">
          <SearchIcon />
          <input type="text" placeholder="Buscar Pokémon..." />
        </div>
      </header>
      <motion.main 
        className="pokedex-grid"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {allPokemonData.map(pokemon => {
          const isCaptured = capturedPokemonIds.has(pokemon.id);
          return (
            <motion.div 
              key={pokemon.id} 
              className={`pokemon-card ${isCaptured ? 'captured' : 'silhouette'}`}
              variants={cardVariants}
              whileHover={{ scale: 1.08, y: -5, zIndex: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="pokemon-card-content">
                <img 
                  src={pokemon.spriteUrl} 
                  alt={pokemon.name}
                  className="pokemon-sprite"
                />
                <div className="pokemon-info">
                  <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
                  {isCaptured && <span className="pokemon-name">{pokemon.name}</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.main>
    </div>
  );
}