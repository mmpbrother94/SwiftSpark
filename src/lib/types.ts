
export type UserRole = "student" | "faculty" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  joinedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: User;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
  enrolledStudents: number;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  content: string;
  resources: Resource[];
  assignments: Assignment[];
  quiz?: Quiz;
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video" | "link" | "document";
  url: string;
  size?: string;
  duration?: string;
  downloadable: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  points: number;
  status: "upcoming" | "active" | "submitted" | "graded";
  submission?: AssignmentSubmission;
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  assignmentId: string;
  submittedAt: Date;
  content: string;
  attachments: string[];
  grade?: number;
  feedback?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // In minutes
  questions: QuizQuestion[];
  dueDate: Date;
  status: "upcoming" | "active" | "completed";
  attempts?: QuizAttempt[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  type: "announcement" | "assignment" | "grade" | "quiz" | "message";
  linkTo?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}
