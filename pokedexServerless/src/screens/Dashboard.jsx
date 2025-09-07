import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../style/Dashboard.css'; // Criaremos este arquivo a seguir
import Pokeball from '../components/Pokeball';
import pokeballIcon from '../assets/pokeball.png'; 
import AnimatedGrass from '../components/AnimatedGrass';
import CaptureModal from '../components/CaptureModal';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from './Navbar';
// Ícone do Menu (Hamburger)
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [captureCount, setCaptureCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPokemon, setCapturedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Pega os dados do usuário logado
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        
        // 2. Pega a contagem de Pokémon capturados por esse usuário
        const { count, error } = await supabase
          .from('capturas')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);AnimatedGrass.css

        if (error) {
          console.error('Erro ao buscar contagem de capturas:', error);
        } else {
          setCaptureCount(count);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []); // O array vazio [] faz com que isso rode apenas uma vez, quando o componente é montado

  const handleCapture = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    // Chama a Edge Function que criamos no conceito
    const { data, error } = await supabase.functions.invoke('capture-pokemon');

    if (error) {
      alert(`Erro ao capturar: ${error.message}`);
    } else {
      if (data.alreadyCaught) {
        alert("Ops! Você já tem este Pokémon.");
      } else {
        // Se for um novo, atualize os estados para abrir o modal
        setCapturedPokemon(data);
        setIsModalOpen(true);
        setCaptureCount(prevCount => prevCount + 1);
      }

    }

    setIsCapturing(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCapturedPokemon(null);
  }
  if (loading) {
    return <LoadingScreen text="A carregar a sua jornada..." />;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <Navbar></Navbar>
          {/* Usamos o nome do metadata ou o email como fallback */}
          <span className="trainer-name">{user?.user_metadata?.full_name || user?.email}</span>
        </div>
        <div className="header-right">
          <img src={pokeballIcon} alt="Capturados" className="header-pokeball-icon" />
          <span className="capture-counter">{captureCount} / 151 Capturados</span>
        </div>
      </header>
      <AnimatedGrass />
      <main className="dashboard-main">
        <div className="action-box">
          <h3 className="action-title">Arraste para capturar!</h3>
          <Pokeball onThrow={handleCapture} disabled={isCapturing} />
        </div>
      </main>
      <CaptureModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        pokemonData={capturedPokemon}
      />
    </div>
  );
}