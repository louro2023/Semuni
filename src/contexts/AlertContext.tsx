import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from '../types';
import { mockAlerts } from '../data/mockData';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface AlertContextType {
  alerts: Alert[];
  dismissAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const activeAlerts = mockAlerts.filter(a => a.active);
    setAlerts(activeAlerts);
  }, []);

  const dismissAlert = (id: string) => {
    setDismissed(prev => [...prev, id]);
  };

  const visibleAlerts = alerts.filter(a => !dismissed.includes(a.id));

  return (
    <AlertContext.Provider value={{ alerts, dismissAlert }}>
      {children}
      
      {/* Global Alert Modal/Popup */}
      <AnimatePresence>
        {visibleAlerts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative flex flex-col"
            >
              <button 
                onClick={() => dismissAlert(visibleAlerts[0].id)}
                className="absolute top-4 right-4 text-slate-700 hover:text-slate-900 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 transition-colors z-10 shadow-sm"
              >
                <X size={20} />
              </button>
              
              {visibleAlerts[0].imageUrl && (
                <div className="w-full h-48 md:h-56 relative shrink-0">
                  <img 
                    src={visibleAlerts[0].imageUrl} 
                    alt={visibleAlerts[0].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              )}
              
              <div className={`p-8 text-center ${visibleAlerts[0].imageUrl ? 'pt-4' : 'pt-12'}`}>
                {!visibleAlerts[0].imageUrl && (
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                     <ExternalLink size={28} />
                  </div>
                )}
                
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                  {visibleAlerts[0].type}
                </span>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{visibleAlerts[0].title}</h3>
                <p className="text-slate-600 mb-8">{visibleAlerts[0].message}</p>
                
                <div className="flex flex-col gap-3">
                  {visibleAlerts[0].buttonLink && visibleAlerts[0].buttonText && (
                    <Link 
                      to={visibleAlerts[0].buttonLink}
                      onClick={() => dismissAlert(visibleAlerts[0].id)}
                      className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
                    >
                      {visibleAlerts[0].buttonText}
                    </Link>
                  )}
                  <button 
                    onClick={() => dismissAlert(visibleAlerts[0].id)}
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-slate-200 rounded-xl text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors"
                  >
                    Não mostrar novamente
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
};
