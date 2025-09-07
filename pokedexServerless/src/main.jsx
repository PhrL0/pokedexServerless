
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter aqui

// Supondo que o nome do seu repositório seja "pokedexServerless"
const REPO_NAME = 'pokedexServerless';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={`/${REPO_NAME}/`}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)