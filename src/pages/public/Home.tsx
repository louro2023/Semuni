import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Users, MapPin, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Course } from '../../types';
import { courseService } from '../../services/api';
import imgHero from '../../assets/images/hero_women_learning_1787076939723.jpg';
import imgCert from '../../assets/images/certification_banner_1787078616460.jpg';

export const Home: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const allCourses = await courseService.getCourses();
      // Get only 3 open courses for featured
      setFeaturedCourses(allCourses.filter(c => c.status === 'Inscrições abertas').slice(0, 3));
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Mulheres em capacitação" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-tertiary/80"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-white/10 text-white font-medium text-sm mb-6 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 bg-secondary-light rounded-full mr-2 animate-pulse"></span>
                Novas turmas com inscrições abertas
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
                Capacitação que transforma. <br/>
                <span className="text-secondary-light">Oportunidades que fortalecem.</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl font-light">
                Encontre cursos, oficinas e capacitações presenciais oferecidos gratuitamente pela Secretaria da Mulher de Nova Iguaçu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cursos" className="inline-flex justify-center items-center px-8 py-4 border border-transparent rounded-full shadow-lg text-base font-semibold text-primary bg-white hover:bg-slate-50 transition-all hover:scale-[1.02]">
                  Encontrar cursos
                </Link>
                <Link to="/sobre" className="inline-flex justify-center items-center px-8 py-4 border border-white/30 rounded-full text-base font-semibold text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Conheça a Secretaria
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-secondary-light rounded-3xl transform rotate-3 scale-105 opacity-50 blur-sm"></div>
              <img 
                src={imgHero} 
                alt="Mulheres em capacitação" 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px] border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              {/* Floating element for modern touch */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Cursos Gratuitos</p>
                  <p className="text-xs text-slate-500">Certificado oficial</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-primary mb-2">12</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Cursos disponíveis</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-accent mb-2">5</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Inscrições abertas</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-secondary-dark mb-2">180</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Vagas disponíveis</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl font-bold text-tertiary mb-2">2.450</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Mulheres capacitadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Cursos em destaque</h2>
              <p className="text-slate-600 max-w-2xl">Não perca a oportunidade de se capacitar. Inscreva-se nas turmas que estão com vagas abertas no momento.</p>
            </div>
            <Link to="/cursos" className="hidden sm:flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
              Ver todos os cursos <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/cursos" className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-full text-base font-medium text-slate-700 bg-white hover:bg-slate-50 w-full">
              Ver todos os cursos
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Info */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-slate-900 to-primary-dark rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-10 lg:p-16">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Certificação Oficial</h3>
                <p className="text-blue-100 mb-8 text-lg font-light leading-relaxed">
                  Todos os cursos presenciais da Secretaria da Mulher garantem certificado de conclusão oficial, válido em todo o território nacional. Destaque seu currículo e aumente suas chances no mercado de trabalho.
                </p>
                <ul className="space-y-4 mb-8">
                  {['Capacitação gratuita', 'Professores especialistas', 'Material didático incluso', 'Apoio ao empreendedorismo'].map((item, i) => (
                    <li key={i} className="flex items-center text-white/90">
                      <CheckCircle2 size={20} className="text-secondary mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/sobre" className="inline-flex items-center text-white font-medium hover:text-secondary-light transition-colors group">
                  Saiba mais sobre nossos programas 
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="h-64 lg:h-full w-full hidden lg:block">
                <img 
                  src={imgCert}
                  alt="Certificação" 
                  className="w-full h-full object-cover rounded-l-3xl lg:rounded-l-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Course Card component
export const CourseCard: React.FC<{course: Course}> = ({ course }) => {
  const percentFilled = (course.occupiedSeats / course.totalSeats) * 100;
  const isAlmostFull = course.availableSeats > 0 && course.availableSeats <= 5;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden flex flex-col transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-primary shadow-sm backdrop-blur-sm">
            {course.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          {course.status === 'Inscrições abertas' ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
              Abertas
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
              Encerradas
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
        
        <div className="space-y-2 mt-4 mb-6">
          <div className="flex items-center text-sm text-slate-600">
            <Calendar size={16} className="mr-2 text-slate-400" />
            <span>{new Date(course.startDate).toLocaleDateString('pt-BR')} a {new Date(course.endDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock size={16} className="mr-2 text-slate-400" />
            <span>{course.scheduleDays} • {course.scheduleTime}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <MapPin size={16} className="mr-2 text-slate-400" />
            <span className="truncate">{course.location}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs text-slate-500 font-medium">Vagas preenchidas</span>
            <span className="text-xs font-bold text-slate-700">{course.occupiedSeats} / {course.totalSeats}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${isAlmostFull ? 'bg-accent' : percentFilled >= 100 ? 'bg-slate-400' : 'bg-gradient-to-r from-primary to-secondary'}`} 
              style={{ width: `${Math.min(percentFilled, 100)}%` }}
            ></div>
          </div>
          
          {isAlmostFull && (
            <p className="text-xs text-accent font-medium mb-4 flex items-center">
              🔥 Corra! Últimas {course.availableSeats} vagas.
            </p>
          )}
          
          <Link 
            to={`/cursos/${course.id}`}
            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
