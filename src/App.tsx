import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/public/Home';
import { Courses } from './pages/public/Courses';
import { CourseDetails } from './pages/public/CourseDetails';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';
import { UserDashboard } from './pages/user/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';
import { About } from './pages/public/About';
import { News } from './pages/public/News';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cursos" element={<Courses />} />
              <Route path="/cursos/:id" element={<CourseDetails />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              
              {/* User Area */}
              <Route path="/minha-conta" element={<UserDashboard />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<Login />} />
          </Routes>
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
