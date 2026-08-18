import { Course, Enrollment, Notification } from '../types';
import { mockCourses } from '../data/mockCourses';
import { mockEnrollments, mockNotifications } from '../data/mockData';

// Simulated database
let coursesDb = [...mockCourses];
let enrollmentsDb = [...mockEnrollments];
let notificationsDb = [...mockNotifications];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const courseService = {
  // TODO BACKEND: GET /api/courses
  getCourses: async (): Promise<Course[]> => {
    await delay(500);
    return [...coursesDb];
  },
  
  // TODO BACKEND: GET /api/courses/:id
  getCourseById: async (id: string): Promise<Course | undefined> => {
    await delay(300);
    return coursesDb.find(c => c.id === id);
  },

  // TODO BACKEND: POST /api/enrollments
  enrollCourse: async (userId: string, courseId: string, additionalData: any): Promise<{success: boolean, message?: string}> => {
    await delay(800);
    
    const courseIndex = coursesDb.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return { success: false, message: 'Curso não encontrado.' };
    
    const course = coursesDb[courseIndex];
    if (course.availableSeats <= 0) return { success: false, message: 'Vagas esgotadas.' };
    
    // Check if already enrolled
    if (enrollmentsDb.some(e => e.userId === userId && e.courseId === courseId)) {
      return { success: false, message: 'Você já está inscrito neste curso.' };
    }

    // Update course seats
    const updatedCourse = {
      ...course,
      occupiedSeats: course.occupiedSeats + 1,
      availableSeats: course.availableSeats - 1,
      status: course.availableSeats - 1 === 0 ? 'Inscrições encerradas' : course.status
    };
    
    coursesDb[courseIndex] = updatedCourse as Course;

    // Create enrollment
    const newEnrollment: Enrollment = {
      id: Math.random().toString(36).substring(7),
      userId,
      courseId,
      date: new Date().toISOString(),
      status: 'Confirmada'
    };
    enrollmentsDb.push(newEnrollment);

    // Create notification
    notificationsDb.unshift({
      id: Math.random().toString(36).substring(7),
      userId,
      title: 'Inscrição confirmada',
      message: `Sua inscrição no curso "${course.title}" foi confirmada com sucesso.`,
      type: 'success',
      date: new Date().toISOString(),
      read: false
    });

    return { success: true };
  }
};

export const userService = {
  // TODO BACKEND: GET /api/users/:id/enrollments
  getUserEnrollments: async (userId: string) => {
    await delay(400);
    return enrollmentsDb.filter(e => e.userId === userId).map(e => {
      const course = coursesDb.find(c => c.id === e.courseId);
      return { ...e, course };
    });
  },
  
  // TODO BACKEND: GET /api/users/:id/notifications
  getUserNotifications: async (userId: string) => {
    await delay(200);
    return notificationsDb.filter(n => n.userId === userId);
  }
};
