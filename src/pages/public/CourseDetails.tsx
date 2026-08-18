import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, CheckCircle2, ChevronLeft, AlertCircle } from 'lucide-react';
import { Course } from '../../types';
import { courseService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollError, setEnrollError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        const data = await courseService.getCourseById(id);
        if (data) setCourse(data);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: `/cursos/${id}` } });
      return;
    }

    if (!user) return;

    setEnrolling(true);
    setEnrollError('');
    
    // Simulating enrollment process
    const result = await courseService.enrollCourse(user.id, course!.id, {});
    
    if (result.success) {
      setEnrollSuccess(true);
      // Refresh course data
      const updatedCourse = await courseService.getCourseById(id!);
      if (updatedCourse) setCourse(updatedCourse);
    } else {
      setEnrollError(result.message || 'Erro ao realizar inscrição.');
    }
    
    setEnrolling(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Curso não encontrado</h2>
        <p className="text-slate-500 mb-6">O curso que você está procurando pode ter sido removido.</p>
        <button onClick={() => navigate('/cursos')} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Voltar para cursos
        </button>
      </div>
    );
  }

  const percentFilled = (course.occupiedSeats / course.totalSeats) * 100;
  const isFull = course.availableSeats === 0;

  if (enrollSuccess) {
    return (
      <div className="min-h-[80vh] bg-surface py-12 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Inscrição realizada com sucesso!</h2>
          <p className="text-slate-600 mb-6">
            Você garantiu sua vaga no curso <strong>{course.title}</strong>.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-4 text-left mb-8 space-y-2 text-sm">
            <div className="flex items-center text-slate-700">
              <Calendar size={16} className="mr-2 text-slate-400" />
              Início: {new Date(course.startDate).toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center text-slate-700">
              <MapPin size={16} className="mr-2 text-slate-400" />
              Local: {course.location}
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/minha-conta" className="block w-full px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
              Ver minha inscrição
            </Link>
            <Link to="/cursos" className="block w-full px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors">
              Voltar para cursos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface pb-20">
      {/* Hero Header */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-primary mb-4 shadow-sm">
            {course.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-white/80 text-lg flex items-center">
            <MapPin size={18} className="mr-2" />
            {course.location}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre o curso</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {course.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Objetivo</h3>
                <p className="text-slate-600">{course.objective}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Público-alvo</h3>
                <p className="text-slate-600">{course.targetAudience}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Requisitos</h3>
                <p className="text-slate-600">{course.requirements}</p>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Conteúdo Programático</h2>
              <ul className="space-y-3">
                {course.content.split(';').map((item, index) => {
                  const contentText = item.trim();
                  if (!contentText) return null;
                  return (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-slate-700">{contentText.replace(/^\d+\.\s*/, '')}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          {/* Sidebar / Enrollment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Informações da Turma</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Calendar className="text-slate-400 mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Período</p>
                      <p className="text-sm text-slate-600">
                        {new Date(course.startDate).toLocaleDateString('pt-BR')} até {new Date(course.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-slate-400 mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Horário</p>
                      <p className="text-sm text-slate-600">{course.scheduleDays}<br/>{course.scheduleTime}</p>
                      <p className="text-xs text-slate-500 mt-1">Carga horária: {course.durationHours}h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-slate-400 mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Endereço</p>
                      <p className="text-sm text-slate-600">{course.address}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Vagas</h4>
                  
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-600">{course.occupiedSeats} de {course.totalSeats} preenchidas</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${isFull ? 'bg-red-500' : course.availableSeats <= 5 ? 'bg-accent' : 'bg-gradient-to-r from-primary to-secondary'}`} 
                      style={{ width: `${Math.min(percentFilled, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    {isFull ? (
                      <span className="text-sm font-bold text-red-600">Turma lotada</span>
                    ) : (
                      <span className="text-sm font-medium text-slate-700">Restam {course.availableSeats} vagas</span>
                    )}
                  </div>

                  {enrollError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start">
                      <AlertCircle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                      {enrollError}
                    </div>
                  )}

                  {!isAuthenticated ? (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-500 text-center mb-4">Para realizar sua inscrição, faça login ou crie sua conta.</p>
                      <Link 
                        to="/login"
                        state={{ returnTo: `/cursos/${id}` }}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
                      >
                        Entrar para se inscrever
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={isFull || enrolling}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-all ${
                        isFull 
                          ? 'bg-slate-300 cursor-not-allowed' 
                          : 'bg-primary hover:bg-primary-dark hover:scale-[1.02]'
                      }`}
                    >
                      {enrolling ? 'Processando...' : isFull ? 'Vagas Esgotadas' : 'QUERO ME INSCREVER'}
                    </button>
                  )}
                  
                  <p className="text-xs text-slate-500 text-center mt-4">
                    Seus dados serão utilizados exclusivamente para fins de inscrição e comunicação da Secretaria.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
