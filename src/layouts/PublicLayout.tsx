import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User as UserIcon, Facebook, Instagram } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';
import { Logo } from '../components/Logo';

export const PublicLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Cursos', path: '/cursos' },
    { name: 'Notícias', path: '/noticias' },
    { name: 'Sobre a Secretaria', path: '/sobre' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <Logo className="h-10 sm:h-12 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-slate-600'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-l border-slate-200 h-6 mx-2"></div>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link to={user?.role === 'admin' ? '/admin' : '/minha-conta'} className="text-sm font-medium text-slate-600 hover:text-primary flex items-center gap-2">
                    <UserIcon size={18} />
                    {user?.role === 'admin' ? 'Painel Admin' : 'Minha Conta'}
                  </Link>
                  <button onClick={logout} className="text-sm font-medium text-slate-500 hover:text-red-600">Sair</button>
                </div>
              ) : (
                <Link to="/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors gap-2">
                  <LogIn size={18} />
                  Entrar
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-slate-600 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'admin' ? '/admin' : '/minha-conta'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50"
                  >
                    {user?.role === 'admin' ? 'Painel Admin' : 'Minha Conta'}
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/5"
                >
                  Entrar / Cadastrar
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4 bg-white p-2 rounded-xl inline-block">
                <Logo className="h-10 w-auto" />
              </div>
              <p className="text-sm mt-4 max-w-sm">
                Promovendo capacitação, independência, oportunidades, inclusão e protagonismo feminino em Nova Iguaçu.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-white/70 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary text-white/70 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navegação</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/cursos" className="hover:text-white transition-colors">Cursos Oferecidos</Link></li>
                <li><Link to="/noticias" className="hover:text-white transition-colors">Notícias e Ações</Link></li>
                <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre a Secretaria</Link></li>
                <li><Link to="/minha-conta" className="hover:text-white transition-colors">Acessar Conta</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contato</h3>
              <ul className="space-y-2 text-sm">
                <li>Rua Iracema Soares Junqueira, 65</li>
                <li>Centro, Nova Iguaçu - RJ</li>
                <li>Tel: (21) 2667-1234</li>
                <li>secretariadamulher@novaiguacu.rj.gov.br</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} Prefeitura de Nova Iguaçu. Secretaria da Mulher. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link to="#" className="hover:text-white">Política de Privacidade</Link>
              <Link to="#" className="hover:text-white">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
