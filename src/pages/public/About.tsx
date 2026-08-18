import React from 'react';
import { Target, Heart, Shield, Users } from 'lucide-react';
import { Logo } from '../../components/Logo';

export const About: React.FC = () => {
  return (
    <div className="bg-surface pb-20">
      <div className="bg-white border-b border-slate-200 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Logo className="h-20 w-auto mx-auto mb-8" />
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Sobre a Secretaria</h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            A Secretaria da Mulher de Nova Iguaçu é um órgão dedicado à promoção de políticas públicas para garantir direitos, proteção e oportunidades iguais para todas as mulheres da nossa cidade.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Nossa Missão</h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
              Trabalhamos diariamente para construir uma cidade mais justa e segura, onde as mulheres possam desenvolver todo o seu potencial, alcançar a independência financeira e viver sem violência.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Através dos nossos cursos de capacitação presencial, buscamos entregar mais do que conhecimento técnico: entregamos ferramentas reais para a transformação de vidas e a quebra de ciclos de dependência.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Mulheres reunidas" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Nossos Pilares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Capacitação', desc: 'Cursos e oficinas focados no mercado de trabalho e geração de renda.', icon: <Target size={32} /> },
            { title: 'Acolhimento', desc: 'Atendimento humanizado e suporte multidisciplinar para mulheres.', icon: <Heart size={32} /> },
            { title: 'Proteção', desc: 'Rede de apoio no combate e prevenção à violência contra a mulher.', icon: <Shield size={32} /> },
            { title: 'Protagonismo', desc: 'Estímulo à liderança feminina e participação nos espaços de decisão.', icon: <Users size={32} /> }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
