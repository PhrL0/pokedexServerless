import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import "../style/LoginStyle.css";
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleIcon, GitHubIcon } from '../components/icons';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import SocialButton from '../components/SocialButton';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider) => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title-logo">Pokédex Gamificada</h1>
        
        <form onSubmit={handleLogin}>
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <InputField
            id="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="error-container">
            <AnimatePresence>
              {error && (
                <motion.p
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <PrimaryButton type="submit" isLoading={loading}>
            Entrar
          </PrimaryButton>
        </form>
        
        <div className="separator">ou entre com</div>

        <div className="social-login-buttons">
          <SocialButton onClick={() => handleOAuthLogin('google')} provider="google" icon={<GoogleIcon />}>
            Google
          </SocialButton>
          <SocialButton onClick={() => handleOAuthLogin('github')} provider="github" icon={<GitHubIcon />}>
            GitHub
          </SocialButton>
        </div>
        
        <p className="signup-link">
          Não tem uma conta? <a href="/pokedexServerless/cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}