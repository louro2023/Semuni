import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, AlertCircle, Wrench } from 'lucide-react';
import { Logo } from '../../components/Logo';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAdminRoute = location.pathname.includes('/admin');
  const returnTo = location.state?.returnTo || (isAdminRoute ? '/admin' : '/minha-conta');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate(returnTo);
      } else {
        setError('E-mail ou senha inválidos.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoUser = () => {
    setEmail('usuario@teste.com');
    setPassword('123456');
  };

  const setDemoAdmin = () => {
    setEmail('admin@novaiaguacu.rj.gov.br');
    setPassword('Admin@123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <Logo className="mx-auto h-16 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            {isAdminRoute ? 'Acesso Administrativo' : 'Acesse sua conta'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Ou{' '}
            <Link to="/cadastro" className="font-medium text-primary hover:text-primary-dark transition-colors">
              crie uma nova conta gratuitamente
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl flex items-start">
              <AlertCircle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                Endereço de e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-slate-300 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                  placeholder="Seu e-mail"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-slate-300 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow"
                  placeholder="Sua senha"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                Lembrar-me
              </label>
            </div>

            <div className="text-sm flex flex-col items-end gap-2">
              <Link to="#" className="font-medium text-primary hover:text-primary-dark">
                Esqueceu a senha?
              </Link>
              {!isAdminRoute && (
                <Link to="/admin/login" className="font-medium text-slate-500 hover:text-slate-700 text-xs">
                  Acesso Restrito (Servidores)
                </Link>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:scale-[1.02]"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>

        {/* Demo Accounts Section */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-center mb-4 text-slate-400">
            <Wrench size={16} className="mr-2" />
            <span className="text-xs font-semibold uppercase tracking-wider">Ambiente de demonstração</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={setDemoUser}
              className="w-full text-left p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800">👤 Cidadã (Usuário)</p>
              <p className="text-xs text-slate-500 mt-1">Preencher dados de teste</p>
            </button>
            <button 
              type="button"
              onClick={setDemoAdmin}
              className="w-full text-left p-3 rounded-lg border border-slate-200 bg-blue-50 hover:bg-blue-100 border-blue-200 transition-colors"
            >
              <p className="text-sm font-semibold text-blue-800">🔧 Administrador</p>
              <p className="text-xs text-blue-600 mt-1">Acesso para gerenciar sistema</p>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};
