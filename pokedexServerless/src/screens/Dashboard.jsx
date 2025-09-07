import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

import '../style/Dashboard.css'; 

import Pokeball from '../components/Pokeball';
import AnimatedGrass from '../components/AnimatedGrass';
import CaptureModal from '../components/CaptureModal';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from './Navbar'; 
import pokeballIcon from '../assets/pokeball.png';

const POKEMON_COUNT_IN_WILD = 7;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [captureCount, setCaptureCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(null);
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    const spawnPokemon = async () => {
      const randomIds = new Set();
      while (randomIds.size < POKEMON_COUNT_IN_WILD) {
        randomIds.add(Math.ceil(Math.random() * 151));
      }

      const pokemonPromises = Array.from(randomIds).map(id => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
      );
      
      const pokemonResults = await Promise.all(pokemonPromises);
      
      const newHotspots = pokemonResults.map((pokemon, index) => ({
        id: index,
        pokemon: {
          id: pokemon.id,
          name: pokemon.name,
          spriteUrl: pokemon.sprites.front_default,
        },
        position: {
          top: `${Math.random() * 30 + 55}%`,
          left: `${Math.random() * 80 + 10}%`,
        },
        isVisible: false,
      }));

      setHotspots(newHotspots);
    };

    const fetchInitialData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { count } = await supabase.from('capturas').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
        setCaptureCount(count || 0);
      }
      await spawnPokemon();
      setLoading(false);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (hotspots.length === 0) return;

    const interval = setInterval(() => {
      setHotspots(prevHotspots => {
        const newHotspots = prevHotspots.map(h => ({ ...h, isVisible: false }));
        const randomIndex = Math.floor(Math.random() * newHotspots.length);
        newHotspots[randomIndex].isVisible = true;
        return newHotspots;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [hotspots.length]);

  const handleCapture = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    const { data, error } = await supabase.functions.invoke('capture-pokemon');

    if (error) {
      toast.error(`Erro ao capturar: ${error.message}`);
    } else {
      const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      if (data.alreadyCaught) {
        toast(`É um ${pokemonName}! Você já o capturou.`, { icon: '😅' });
      } else {
        setCapturedPokemon(data);
        setIsModalOpen(true);
        setCaptureCount(prevCount => prevCount + 1);
        toast.success(`${pokemonName} foi capturado com sucesso!`);
      }
    }
    setIsCapturing(false);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCapturedPokemon(null);
  };

  if (loading) { return <LoadingScreen text="Procurando Pokémon selvagens..." />; }

  return (
    <div className="dashboard-container">
      <Toaster position="top-center" toastOptions={{ className: 'toast-notification' }} />
      <div className="dashboard-background"></div>
      {/* --- SEÇÃO CORRIGIDA --- */}
      <header className="dashboard-header">
        <div className="header-left">
          <Navbar />
          <span className="trainer-name">{user?.user_metadata?.full_name || user?.email}</span>
        </div>
        <div className="header-right">
          <img src={pokeballIcon} alt="Capturados" className="header-pokeball-icon" />
          <span className="capture-counter">{captureCount} / 151</span>
        </div>
      </header>
      
      {hotspots.map(spot => (
        <div 
          key={spot.id} 
          className="hotspot-container" 
          style={{ top: spot.position.top, left: spot.position.left }}
        >
          <img 
            src={spot.pokemon.spriteUrl} 
            alt={spot.pokemon.name}
            className={`world-pokemon-sprite ${spot.isVisible ? 'visible' : ''}`}
          />
          <AnimatedGrass isRustling={spot.isVisible} />
        </div>
      ))}

      <main className="dashboard-main">
        <Pokeball onThrow={handleCapture} disabled={isCapturing} />
      </main>
      
      <CaptureModal isOpen={isModalOpen} onClose={closeModal} pokemonData={capturedPokemon} />
    </div>
  );
}