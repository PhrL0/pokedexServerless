// Seu arquivo App.jsx (modificado)

import './App.css'
import Cadastro from './screens/Cadastro.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Login from './screens/Login.jsx';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter foi removido daqui
import Pokedex from './screens/Pokedex.jsx';

function App() {
  return (
    // O BrowserRouter não fica mais aqui
    <Routes>
      {/* Quando o usuário estiver na URL '/', mostre o componente de Login */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      {/* Adicione rotas para outras páginas aqui no futuro */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pokedex" element={<Pokedex />} />
    </Routes>
    // O BrowserRouter não fica mais aqui
  )
}

export default App