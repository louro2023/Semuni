import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/api';
import { Enrollment, Notification } from '../../types';
import { BookOpen, Award, Bell, CheckCircle2, ChevronRight, LogOut } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const userEnrollments = await userService.getUserEnrollments(user.id);
      const userNotifications = await userService.getUserNotifications(user.id);
      
      setEnrollments(userEnrollments);
      setNotifications(userNotifications);
      setLoading(false);
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-surface min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Olá, {user.name.split(' ')[0]}!</h1>
            <p className="text-slate-600">Confira suas inscrições e acompanhe suas atividades.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="hidden md:flex items-center text-slate-500 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium"
          >
            <LogOut size={16} className="mr-2" /> Sair
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Enrollments */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <BookOpen className="text-primary mr-3" size={24} />
                  Meus Cursos
                </h2>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="h-24 bg-slate-100 rounded-xl"></div>
                    ))}
                  </div>
                ) : enrollments.length > 0 ? (
                  <div className="space-y-4">
                    {enrollments.map(enrollment => {
                      const course: any = enrollment.course;
                      return (
                        <div key={enrollment.id} className="border border-slate-200 rounded-xl p-4 hover:border-primary/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 mb-2">
                              {enrollment.status}
                            </span>
                            <h3 className="font-bold text-slate-900 line-clamp-1">{course?.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">
                              {new Date(course?.startDate).toLocaleDateString('pt-BR')} • {course?.location}
                            </p>
                          </div>
                          <Link 
                            to={`/cursos/${course?.id}`}
                            className="text-sm font-medium text-primary hover:text-primary-dark whitespace-nowrap bg-primary/5 px-4 py-2 rounded-lg"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="text-slate-400" size={24} />
                    </div>
                    <p className="text-slate-600 mb-4">Você ainda não está inscrito em nenhum curso.</p>
                    <Link to="/cursos" className="inline-block px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
                      Explorar cursos
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Certificates */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <Award className="text-secondary-dark mr-3" size={24} />
                  Meus Certificados
                </h2>
              </div>
              <div className="p-6 text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-slate-400" size={24} />
                </div>
                <p className="text-slate-600">Nenhum certificado disponível no momento.</p>
                <p className="text-sm text-slate-500 mt-1">Conclua seus cursos para emitir os certificados.</p>
              </div>
            </section>
          </div>

          {/* Sidebar - Notifications */}
          <div className="lg:col-span-1">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <Bell className="text-accent mr-3" size={24} />
                  Notificações
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {loading ? (
                  <div className="p-6 animate-pulse space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-slate-100 rounded-lg"></div>
                    ))}
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`p-4 flex gap-4 ${!notification.read ? 'bg-blue-50/50' : ''}`}>
                      <div className="mt-1">
                        {notification.type === 'success' ? (
                          <CheckCircle2 size={20} className="text-emerald-500" />
                        ) : (
                          <Bell size={20} className="text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{notification.title}</h4>
                        <p className="text-sm text-slate-600 mt-1 leading-snug">{notification.message}</p>
                        <span className="text-xs text-slate-400 mt-2 block">
                          {new Date(notification.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500">
                    Nenhuma notificação recente.
                  </div>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};
