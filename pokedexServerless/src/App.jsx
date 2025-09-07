
import './App.css'
import Cadastro from './screens/Cadastro.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Login from './screens/Login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokedex from './screens/Pokedex.jsx';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Quando o usuário estiver na URL '/', mostre o componente de Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        
        {/* Adicione rotas para outras páginas aqui no futuro */}
        {/* <Route path="/cadastro" element={<Cadastro />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
