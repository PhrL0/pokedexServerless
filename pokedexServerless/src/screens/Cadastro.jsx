import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// Importando nossos componentes reutilizáveis e ícones
import '../style/LoginStyle.css'; // Reutilizamos o MESMO CSS!
import { GoogleIcon, GitHubIcon } from '../components/icons';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import SocialButton from '../components/SocialButton';

// Um ícone simples de "check" para a tela de sucesso
const CheckIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M5 13.5L9.5 18L19 6"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </svg>
);


export default function Cadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trainerName, setTrainerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // Novo estado para o sucesso

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: trainerName } },
    });

    if (error) {
      setError(error.message);
    } else {
      setIsSuccess(true); // Ativamos a tela de sucesso
    }
    setLoading(false);
  };
  
  const handleOAuthLogin = async (provider) => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
  };
  
  return (
    <div className="login-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSuccess ? 'success' : 'form'}
          className="login-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {isSuccess ? (
            <div className="success-view">
              <CheckIcon />
              <h2 className="success-title">Conta Criada!</h2>
              <p className="success-message">
                Enviamos um link de confirmação para o seu e-mail. Por favor, verifique sua caixa de entrada para ativar sua conta.
              </p>
              <button className="login-button" onClick={() => navigate('/login')}>
                Voltar para o Login
              </button>
            </div>
          ) : (
            <>
              <h1 className="title-logo">Criar Conta de Treinador</h1>
              <form onSubmit={handleRegister}>
                <InputField
                  id="trainerName"
                  label="Nome do Treinador"
                  type="text"
                  placeholder="Ash Ketchum"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  required
                />
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
                  placeholder="Crie uma senha forte"
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
                  Criar Conta
                </PrimaryButton>
              </form>
              <div className="separator">ou crie com</div>
              <div className="social-login-buttons">
                <SocialButton onClick={() => handleOAuthLogin('google')} provider="google" icon={<GoogleIcon />}>
                  Google
                </SocialButton>
                <SocialButton onClick={() => handleOAuthLogin('github')} provider="github" icon={<GitHubIcon />}>
                  GitHub
                </SocialButton>
              </div>
              <p className="signup-link">
                Já tem uma conta? <a href="/pokedexServerless/login">Entre</a>
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}