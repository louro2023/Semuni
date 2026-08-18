import { News, Alert, Certificate, Notification, User, Enrollment } from '../types';

import imgPopup from '../assets/images/popup_alert_1787076727279.jpg';
import imgNews1 from '../assets/images/news_courses_open_1787077604978.jpg';
import imgNews2 from '../assets/images/news_entrepreneur_fair_1787077587491.jpg';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Prefeitura',
    email: 'admin@novaiaguacu.rj.gov.br',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'usuario@teste.com',
    role: 'user',
    cpf: '123.456.789-00'
  }
];

export const mockNews: News[] = [
  {
    id: '1',
    title: 'Secretaria da Mulher abre 150 novas vagas para cursos profissionalizantes',
    summary: 'A partir da próxima semana, mulheres iguaçuanas poderão se inscrever em diversos cursos focados em geração de renda.',
    content: 'A Prefeitura de Nova Iguaçu, através da Secretaria da Mulher, anuncia a abertura de 150 novas vagas para cursos presenciais...',
    imageUrl: imgNews1,
    category: 'Cursos',
    date: '2023-10-25',
    author: 'Assessoria de Comunicação',
    status: 'Publicado'
  },
  {
    id: '2',
    title: 'Feira de Empreendedoras atrai centenas de pessoas no Centro',
    summary: 'Evento promovido para dar visibilidade às alunas dos cursos de capacitação foi um sucesso de vendas.',
    content: 'O calçadão de Nova Iguaçu ficou movimentado neste final de semana com a 1ª Feira de Empreendedoras...',
    imageUrl: imgNews2,
    category: 'Eventos',
    date: '2023-10-20',
    author: 'Assessoria de Comunicação',
    status: 'Publicado'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'NOVOS CURSOS DISPONÍVEIS',
    message: 'Estão abertas as inscrições para a nova turma de "Direitos da Mulher e Cidadania". Garanta já a sua vaga e conheça seus direitos!',
    type: 'Inscrições abertas',
    buttonText: 'Ver detalhes do curso',
    buttonLink: '/cursos/3',
    imageUrl: imgPopup,
    active: true
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    userId: '2',
    courseId: '0',
    courseName: 'Corte e Costura Básico',
    participantName: 'Maria Silva',
    workload: 40,
    date: '2023-09-15',
    code: 'NI-2023-987654'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    title: 'Novo curso disponível',
    message: 'Foi aberta uma nova turma do curso de Empreendedorismo Feminino.',
    type: 'info',
    date: '2023-10-26T10:00:00Z',
    read: false
  },
  {
    id: '2',
    userId: '2',
    title: 'Inscrição confirmada',
    message: 'Sua inscrição no curso "Marketing Digital" foi confirmada.',
    type: 'success',
    date: '2023-10-10T14:30:00Z',
    read: true
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    userId: '2',
    courseId: '2',
    date: '2023-10-10T14:30:00Z',
    status: 'Confirmada'
  }
];
