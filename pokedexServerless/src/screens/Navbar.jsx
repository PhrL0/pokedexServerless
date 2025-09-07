import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Usaremos NavLink para o estilo do item ativo
import { Drawer, Button, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// --- ÍCONES ---
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import MenuIcon from '@mui/icons-material/Menu'; // Usando o ícone do MUI para consistência

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const menuItems = [
    { text: 'Capturar Pokémon', icon: <CatchingPokemonIcon />, path: '/dashboard' },
    { text: 'Minha Pokédex', icon: <ViewInArIcon />, path: '/pokedex' },
  ];

  const list = () => (
    <Box
      sx={{ 
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Cabeçalho do Menu */}
      <Box sx={{ padding: '24px 16px', color: '#f1f5f9' }}>
        <ListItemText 
          primary="Pokédex Menu" 
          primaryTypographyProps={{ 
            fontWeight: '700', 
            fontSize: '1.5rem',
            textAlign: 'center',
            letterSpacing: '0.5px'
          }} 
        />
      </Box>

      {/* Lista de Navegação */}
      <List sx={{ padding: '0 8px' }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ marginBottom: '8px' }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              end // Garante que a rota "dashboard" não fique ativa para outras rotas
              sx={{
                borderRadius: '8px',
                color: '#cbd5e1', // Cor do texto padrão
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                },
                // Estilo para o item ATIVO/SELECIONADO
                '&.active': {
                  backgroundColor: 'rgba(230, 33, 23, 0.8)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(230, 33, 23, 0.4)',
                  '& .MuiListItemIcon-root': {
                    color: '#ffffff',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#cbd5e1', minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: '500' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Botão de Menu no HUD */}
      <Button 
        onClick={toggleDrawer(true)} 
        sx={{ 
          color: 'white', 
          minWidth: 'auto', 
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50%',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <MenuIcon />
      </Button>

      {/* O Drawer (Menu Lateral) */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        // A prop PaperProps é a chave para estilizar o container do Drawer
        PaperProps={{
          sx: {
            // O EFEITO DE VIDRO!
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)',
            webkitBackdropFilter: 'blur(12px)', // Para Safari
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        {list()}
      </Drawer>
    </>
  );
}