import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../style/PokedexStyle.css';
import Navbar from './Navbar';
import LoadingScreen from '../components/LoadingScreen';

// Ícone de busca (opcional)
const SearchIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

export default function Pokedex() {
  const [loading, setLoading] = useState(true);
  const [capturedPokemonIds, setCapturedPokemonIds] = useState(new Set());
  
  // Geramos um array com todos os Pokémon de 1 a 151
  const allPokemon = Array.from({ length: 151 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchCapturedPokemon = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('capturas')
          .select('pokemon_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Erro ao buscar capturas:', error);
        } else {
          // Usamos um Set para uma verificação de 'capturado' super rápida (O(1))
          const ids = new Set(data.map(p => p.pokemon_id));
          setCapturedPokemonIds(ids);
        }
      }
      setLoading(false);
    };

    fetchCapturedPokemon();
  }, []);

  const getSpriteUrl = (pokemonId) => {
    // URL previsível dos sprites da PokéAPI
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  };

  if (loading) {
    return <LoadingScreen text="A carregar a sua pokedex..." />;
  }

  return (
    <div className="pokedex-container">
        <Navbar></Navbar>
      <header className="pokedex-header">
        <h1>Minha Pokédex</h1>
        <SearchIcon />
      </header>
      <main className="pokedex-grid">
        {allPokemon.map(pokemonId => {
          const isCaptured = capturedPokemonIds.has(pokemonId);
          return (
            <div key={pokemonId} className="pokemon-card">
              <img 
                src={getSpriteUrl(pokemonId)} 
                alt={`Pokémon #${pokemonId}`}
                // Aplicamos a classe 'silhouette' se não foi capturado
                className={`pokemon-sprite ${isCaptured ? 'captured' : 'silhouette'}`}
              />
            </div>
          );
        })}
      </main>
    </div>
  );
}