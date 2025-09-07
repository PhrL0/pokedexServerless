import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// --- ÍCONES DO MATERIAL-UI ---
// Para usá-los, primeiro instale o pacote: npm install @mui/icons-material
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'; // Ícone para Captura
import ViewInArIcon from '@mui/icons-material/ViewInAr'; // Ícone para a Pokédex

// Ícone de Menu (Hamburger) - O seu já está ótimo
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <Box
      // A prop 'sx' é onde a mágica do estilo acontece
      sx={{ 
        width: 280, // Um pouco mais largo
        height: '100%', // Ocupa a altura toda
        backgroundColor: '#f2f2f2', // Um cinza claro de fundo, como na Pokédex
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ padding: '16px', backgroundColor: '#e62117', color: 'white' }}>
        {/* Adicionamos um cabeçalho temático */}
        <ListItemText primary="Pokédex Menu" primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.2rem' }} />
      </Box>
      <List>
        <ListItem disablePadding>
          {/* Usamos ListItemButton para um efeito de clique melhor */}
          <ListItemButton component={Link} to="/dashboard" sx={{ '&:hover': { backgroundColor: 'rgba(229, 33, 23, 0.1)' } }}>
            <ListItemIcon>
              <CatchingPokemonIcon sx={{ color: '#e62117' }} />
            </ListItemIcon>
            <ListItemText primary="Capturar Pokémon" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/pokedex" sx={{ '&:hover': { backgroundColor: 'rgba(229, 33, 23, 0.1)' } }}>
            <ListItemIcon>
              <ViewInArIcon sx={{ color: '#333' }} />
            </ListItemIcon>
            <ListItemText primary="Minha Pokédex" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)} sx={{ color: 'white', minWidth: 'auto', padding: '8px' }}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}