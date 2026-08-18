export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  cpf?: string;
}

export type CourseStatus = 'Rascunho' | 'Publicado' | 'Inscrições abertas' | 'Inscrições encerradas' | 'Em andamento' | 'Concluído' | 'Cancelado';

export interface Course {
  id: string;
  title: string;
  description: string;
  objective: string;
  targetAudience: string;
  requirements: string;
  content: string;
  imageUrl: string;
  category: string;
  instructor: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  scheduleDays: string;
  scheduleTime: string;
  durationHours: number;
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  status: CourseStatus;
}

export type EnrollmentStatus = 'Confirmada' | 'Aguardando' | 'Em andamento' | 'Concluída' | 'Cancelada';

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  date: string;
  status: EnrollmentStatus;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
  status: 'Rascunho' | 'Publicado';
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'Informação' | 'Novo curso' | 'Inscrições abertas' | 'Aviso importante' | 'Evento';
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  active: boolean;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  participantName: string;
  workload: number;
  date: string;
  code: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  date: string;
  read: boolean;
}
