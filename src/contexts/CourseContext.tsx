
import React, { createContext, useContext, useState } from 'react';
import { Course, Assignment, Quiz, AssignmentSubmission, QuizAttempt } from '@/lib/types';
import { mockCourses, mockStudentAssignments } from '@/lib/mock-data';
import { useToast } from '@/components/ui/use-toast';

interface CourseContextType {
  courses: Course[];
  studentAssignments: Assignment[];
  enrollInCourse: (courseId: string, studentId: string) => void;
  getCourse: (courseId: string) => Course | undefined;
  getEnrolledCourses: (studentId: string) => Course[];
  getInstructorCourses: (instructorId: string) => Course[];
  submitAssignment: (assignmentId: string, studentId: string, submission: Partial<AssignmentSubmission>) => void;
  gradeAssignment: (submissionId: string, grade: number, feedback: string) => void;
  submitQuiz: (quizId: string, studentId: string, attempt: Partial<QuizAttempt>) => void;
  searchCourses: (query: string) => Course[];
  createCourse: (course: Partial<Course>) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [studentAssignments, setStudentAssignments] = useState<Assignment[]>(mockStudentAssignments);
  const { toast } = useToast();

  const getCourse = (courseId: string) => {
    return courses.find(course => course.id === courseId);
  };

  const getEnrolledCourses = (studentId: string) => {
    // In a real app, we'd check enrollment records
    // For demo, return all courses
    return courses;
  };

  const getInstructorCourses = (instructorId: string) => {
    return courses.filter(course => course.instructor.id === instructorId);
  };

  const enrollInCourse = (courseId: string, studentId: string) => {
    setCourses(prevCourses => {
      return prevCourses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            enrolledStudents: course.enrolledStudents + 1
          };
        }
        return course;
      });
    });
    
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in the course.",
    });
  };

  const submitAssignment = (assignmentId: string, studentId: string, submission: Partial<AssignmentSubmission>) => {
    // Update assignment status
    setStudentAssignments(prevAssignments => {
      return prevAssignments.map(assignment => {
        if (assignment.id === assignmentId) {
          return {
            ...assignment,
            status: "submitted",
            submission: {
              id: `submission-${Date.now()}`,
              studentId,
              assignmentId,
              submittedAt: new Date(),
              content: submission.content || "",
              attachments: submission.attachments || [],
            }
          };
        }
        return assignment;
      });
    });
    
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully.",
    });
  };

  const gradeAssignment = (submissionId: string, grade: number, feedback: string) => {
    setStudentAssignments(prevAssignments => {
      return prevAssignments.map(assignment => {
        if (assignment.submission?.id === submissionId) {
          return {
            ...assignment,
            status: "graded",
            submission: {
              ...assignment.submission,
              grade,
              feedback
            }
          };
        }
        return assignment;
      });
    });
    
    toast({
      title: "Assignment Graded",
      description: "The assignment has been graded successfully.",
    });
  };

  const submitQuiz = (quizId: string, studentId: string, attempt: Partial<QuizAttempt>) => {
    // For demo purposes, we won't update the quiz state
    toast({
      title: "Quiz Submitted",
      description: "Your quiz has been submitted successfully.",
    });
  };

  const searchCourses = (query: string) => {
    if (!query) return courses;
    
    const lowercaseQuery = query.toLowerCase();
    return courses.filter(course => {
      return (
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.instructor.name.toLowerCase().includes(lowercaseQuery)
      );
    });
  };

  const createCourse = (course: Partial<Course>) => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: course.title || "New Course",
      description: course.description || "Course description",
      instructor: course.instructor!,
      coverImage: course.coverImage || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop",
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledStudents: 0,
      duration: course.duration || "10 weeks",
      level: course.level || "beginner",
      modules: course.modules || [],
    };
    
    setCourses(prevCourses => [...prevCourses, newCourse]);
    
    toast({
      title: "Course Created",
      description: "The course has been created successfully.",
    });
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses(prevCourses => {
      return prevCourses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            ...updates,
            updatedAt: new Date()
          };
        }
        return course;
      });
    });
    
    toast({
      title: "Course Updated",
      description: "The course has been updated successfully.",
    });
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    
    toast({
      title: "Course Deleted",
      description: "The course has been deleted successfully.",
    });
  };

  const value = {
    courses,
    studentAssignments,
    enrollInCourse,
    getCourse,
    getEnrolledCourses,
    getInstructorCourses,
    submitAssignment,
    gradeAssignment,
    submitQuiz,
    searchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};
