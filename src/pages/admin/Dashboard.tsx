import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Users, BookOpen, AlertCircle, TrendingUp, LayoutDashboard, Plus, Search, Settings, LogOut, CheckCircle, Bell, X, UploadCloud } from 'lucide-react';
import { courseService } from '../../services/api';
import { Course } from '../../types';
import { mockEnrollments, mockUsers, mockNews, mockAlerts } from '../../data/mockData';
import { Logo } from '../../components/Logo';

type TabType = 'dashboard' | 'cursos' | 'inscricoes' | 'noticias';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'course' | 'news' | 'alert' | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (type: 'course' | 'news' | 'alert', title: string) => {
    setModalType(type);
    setModalTitle(title);
    setSelectedImage(null);
    setShowModal(true);
  };

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/admin/login');
      return;
    }

    const fetchAdminData = async () => {
      const data = await courseService.getCourses();
      setCourses(data);
      setLoading(false);
    };

    fetchAdminData();
  }, [user, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAdmin) return null;

  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'Inscrições abertas').length;
  const totalSeats = courses.reduce((acc, curr) => acc + curr.totalSeats, 0);
  const occupiedSeats = courses.reduce((acc, curr) => acc + curr.occupiedSeats, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex min-h-screen sticky top-0">
        <div className="p-6 border-b border-slate-800">
          <div className="bg-white p-2 rounded-xl inline-block mb-2">
            <Logo className="h-8 w-auto" />
          </div>
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mt-4">Painel Administrativo</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} className="mr-3" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('cursos')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'cursos' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <BookOpen size={20} className="mr-3" />
            <span className="font-medium">Cursos</span>
          </button>
          <button 
            onClick={() => setActiveTab('inscricoes')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'inscricoes' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <Users size={20} className="mr-3" />
            <span className="font-medium">Inscrições</span>
          </button>
          <button 
            onClick={() => setActiveTab('noticias')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'noticias' ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
          >
            <AlertCircle size={20} className="mr-3" />
            <span className="font-medium">Notícias & Alertas</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center px-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-slate-400">Administrador</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-slate-400 hover:text-white w-full">
            <LogOut size={16} className="mr-2" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        
        {/* Mobile header (mock) */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
          <span className="font-bold text-slate-800">Admin</span>
          <button onClick={handleLogout}><LogOut size={20} className="text-slate-500" /></button>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Visão Geral</h1>
                <p className="text-slate-500">Acompanhe os indicadores da Secretaria da Mulher.</p>
              </div>
              <button 
                onClick={() => openModal('course', 'Adicionar Novo Curso')}
                className="hidden sm:flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                <Plus size={18} className="mr-2" />
                Novo Curso
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Total de Cursos</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalCourses}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <BookOpen size={24} />
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-medium flex items-center">
              <TrendingUp size={14} className="mr-1" /> +2 este mês
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Cursos Ativos</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{activeCourses}</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle size={24} />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">Inscrições abertas</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Inscrições</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{mockEnrollments.length + occupiedSeats}</h3>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Users size={24} />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">Total de registros</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Ocupação Média</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">
                  {totalSeats > 0 ? Math.round((occupiedSeats / totalSeats) * 100) : 0}%
                </h3>
              </div>
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${Math.round((occupiedSeats / totalSeats) * 100)}%` }}></div>
            </div>
          </div>
        </div>

        {/* Tables/Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Cursos Recentes</h3>
              <a href="#" className="text-sm text-primary font-medium hover:underline">Ver todos</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Curso</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Vagas</th>
                    <th className="px-6 py-4 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                     <tr><td colSpan={4} className="p-6 text-center text-slate-500">Carregando...</td></tr>
                  ) : (
                    courses.slice(0, 5).map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900 line-clamp-1">{course.title}</p>
                          <p className="text-xs text-slate-500">{course.category}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            course.status === 'Inscrições abertas' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 font-medium">{course.occupiedSeats}</span>
                            <span className="text-slate-400 text-xs">/ {course.totalSeats}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => openModal('course', `Editar Curso: ${course.title}`)}
                            className="text-primary hover:text-primary-dark font-medium text-sm">Editar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Atividades Recentes</h3>
            </div>
            <div className="p-6 space-y-6">
              {[
                { text: 'Maria Silva se inscreveu no curso de Empreendedorismo', time: 'Há 2 horas', icon: <Users size={16} className="text-purple-600" /> },
                { text: 'Novo curso "Marketing Digital" publicado', time: 'Há 5 horas', icon: <BookOpen size={16} className="text-emerald-600" /> },
                { text: 'Alerta de "Últimas Vagas" ativado', time: 'Ontem', icon: <AlertCircle size={16} className="text-orange-600" /> },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                    {act.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{act.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        </>
        )}

        {activeTab === 'cursos' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Gerenciar Cursos</h1>
                <p className="text-slate-500">Adicione ou edite os cursos oferecidos.</p>
              </div>
              <button 
                onClick={() => openModal('course', 'Adicionar Novo Curso')}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                <Plus size={18} className="mr-2" />
                Novo Curso
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder="Buscar curso..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-medium">Curso</th>
                      <th className="px-6 py-4 font-medium">Categoria</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Vagas</th>
                      <th className="px-6 py-4 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{course.title}</td>
                        <td className="px-6 py-4 text-slate-500">{course.category}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            course.status === 'Inscrições abertas' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {course.occupiedSeats} / {course.totalSeats}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => openModal('course', `Editar Curso: ${course.title}`)}
                            className="text-primary hover:text-primary-dark font-medium text-sm mr-4">Editar</button>
                          <button className="text-red-500 hover:text-red-700 font-medium text-sm">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inscricoes' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Gerenciar Inscrições</h1>
                <p className="text-slate-500">Visualize as cidadãs inscritas nos cursos.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50 gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder="Buscar por nome ou CPF..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-medium">Cidadã</th>
                      <th className="px-6 py-4 font-medium">E-mail / Contato</th>
                      <th className="px-6 py-4 font-medium">Data de Cadastro</th>
                      <th className="px-6 py-4 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockUsers.filter(u => u.role === 'user').map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-500">CPF: {u.cpf}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{u.email}</td>
                        <td className="px-6 py-4 text-slate-600">Out 2023</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary hover:text-primary-dark font-medium text-sm">Ver Perfil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'noticias' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Notícias & Alertas</h1>
                <p className="text-slate-500">Gerencie a comunicação com as cidadãs.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => openModal('alert', 'Criar Novo Alerta')}
                  className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm">
                  <Bell size={18} className="mr-2 text-primary" />
                  Novo Alerta
                </button>
                <button 
                  onClick={() => openModal('news', 'Publicar Nova Notícia')}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm">
                  <Plus size={18} className="mr-2" />
                  Nova Notícia
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Notícias list */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">Notícias Publicadas</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {mockNews.map((news) => (
                    <div key={news.id} className="p-6 hover:bg-slate-50 transition-colors flex gap-4">
                       <img src={news.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                       <div className="flex-1 min-w-0">
                         <p className="text-xs text-primary font-medium mb-1">{news.category} • {new Date(news.date).toLocaleDateString('pt-BR')}</p>
                         <h4 className="font-bold text-slate-900 truncate">{news.title}</h4>
                         <div className="mt-2 flex gap-3">
                           <button 
                             onClick={() => openModal('news', `Editar Notícia`)}
                             className="text-xs font-medium text-slate-500 hover:text-primary">Editar</button>
                           <button className="text-xs font-medium text-red-500 hover:text-red-700">Remover</button>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alertas list */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">Alertas Ativos (Pop-ups)</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="p-6 hover:bg-slate-50 transition-colors">
                       <div className="flex justify-between items-start mb-2">
                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                           {alert.type}
                         </span>
                         <span className={`w-2 h-2 rounded-full ${alert.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                       </div>
                       <h4 className="font-bold text-slate-900">{alert.title}</h4>
                       <p className="text-sm text-slate-500 mt-1 line-clamp-2">{alert.message}</p>
                       <div className="mt-4 flex gap-3">
                         <button 
                           onClick={() => openModal('alert', `Editar Alerta`)}
                           className="text-xs font-medium text-slate-500 hover:text-primary">Editar</button>
                         <button className="text-xs font-medium text-slate-500 hover:text-primary">Desativar</button>
                       </div>
                    </div>
                  ))}
                  {mockAlerts.length === 0 && (
                    <div className="p-8 text-center text-slate-500 text-sm">
                      Nenhum alerta ativo no momento.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Shared Generic Modal for Mockup */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">{modalTitle}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {modalType === 'course' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Título do Curso</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ex: Informática Básica" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>Tecnologia</option>
                        <option>Beleza</option>
                        <option>Negócios</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Vagas</label>
                      <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" defaultValue={30} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Imagem de Capa</label>
                    <div className="mt-1 flex justify-center px-6 pt-4 pb-4 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary/50 transition-colors bg-slate-50">
                      <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label htmlFor="course-image-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                            <span>Fazer upload de um arquivo</span>
                            <input id="course-image-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0]?.name || null)} />
                          </label>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF até 10MB</p>
                        {selectedImage && <p className="text-xs font-semibold text-emerald-600 mt-2 truncate max-w-[200px] mx-auto">Selecionado: {selectedImage}</p>}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {modalType === 'news' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Título da Notícia</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ex: Nova parceria firmada..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Imagem de Capa</label>
                    <div className="mt-1 flex justify-center px-6 pt-4 pb-4 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary/50 transition-colors bg-slate-50">
                      <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label htmlFor="news-image-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                            <span>Fazer upload de um arquivo</span>
                            <input id="news-image-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0]?.name || null)} />
                          </label>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF até 10MB</p>
                        {selectedImage && <p className="text-xs font-semibold text-emerald-600 mt-2 truncate max-w-[200px] mx-auto">Selecionado: {selectedImage}</p>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Conteúdo</label>
                    <textarea rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Escreva o conteúdo da notícia aqui..."></textarea>
                  </div>
                </>
              )}
              {modalType === 'alert' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Título do Alerta</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ex: Últimas vagas!" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                    <textarea rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Mensagem do pop-up..."></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  alert('Ação salva com sucesso (Ambiente de demonstração).');
                  setShowModal(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
