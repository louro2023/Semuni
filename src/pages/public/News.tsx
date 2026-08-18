import React, { useState, useEffect } from 'react';
import { Calendar, User } from 'lucide-react';
import { News as NewsType } from '../../types';
import { mockNews } from '../../data/mockData';

export const News: React.FC = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchNews = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNews(mockNews);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-surface min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Notícias e Ações</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Acompanhe as últimas novidades, eventos e ações da Secretaria da Mulher de Nova Iguaçu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map(item => (
              <article key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden flex flex-col transition-all hover:-translate-y-1">
                <div className="h-48 overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-xs text-slate-500 mb-3 space-x-4">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(item.date).toLocaleDateString('pt-BR')}</span>
                    <span className="flex items-center"><User size={14} className="mr-1" /> {item.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{item.title}</h2>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">{item.summary}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <button className="text-primary font-medium text-sm hover:text-primary-dark transition-colors">
                      Leia mais &rarr;
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
