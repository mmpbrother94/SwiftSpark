
import { Assignment, Course, Message, Notification, User, UserRole } from "./types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@college.edu",
    name: "John Doe",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    department: "Computer Science",
    joinedAt: new Date(2023, 8, 1)
  },
  {
    id: "2",
    email: "jane.smith@college.edu",
    name: "Jane Smith",
    role: "faculty",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    department: "Computer Science",
    joinedAt: new Date(2022, 0, 15)
  },
  {
    id: "3",
    email: "admin@college.edu",
    name: "Admin User",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    joinedAt: new Date(2021, 5, 10)
  },
  {
    id: "4",
    email: "mike.wilson@college.edu",
    name: "Mike Wilson",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    department: "Mathematics",
    joinedAt: new Date(2023, 7, 15)
  },
  {
    id: "5",
    email: "sarah.johnson@college.edu",
    name: "Sarah Johnson",
    role: "faculty",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    department: "Physics",
    joinedAt: new Date(2022, 2, 20)
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "A beginner-friendly course that introduces fundamental programming concepts using Python.",
    instructor: mockUsers[1], // Jane Smith
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop",
    createdAt: new Date(2023, 0, 10),
    updatedAt: new Date(2023, 7, 15),
    enrolledStudents: 120,
    duration: "12 weeks",
    level: "beginner",
    modules: [
      {
        id: "101",
        title: "Getting Started with Python",
        content: "<p>Learn the basics of Python programming language.</p>",
        resources: [
          {
            id: "r1",
            title: "Python Installation Guide",
            type: "pdf",
            url: "#",
            size: "2.5 MB",
            downloadable: true
          },
          {
            id: "r2",
            title: "Introduction to Programming Concepts",
            type: "video",
            url: "#",
            duration: "45 minutes",
            downloadable: false
          }
        ],
        assignments: [
          {
            id: "a1",
            title: "Basic Python Syntax",
            description: "Complete the exercises on basic Python syntax and structures.",
            dueDate: new Date(2023, 8, 15),
            points: 10,
            status: "upcoming"
          }
        ],
        quiz: {
          id: "q1",
          title: "Python Basics Quiz",
          description: "Test your understanding of Python basics.",
          timeLimit: 30,
          questions: [
            {
              id: "q1-1",
              question: "What is the correct way to create a variable in Python?",
              type: "multiple-choice",
              options: ["var x = 5", "x = 5", "int x = 5", "let x = 5"],
              correctAnswer: "x = 5",
              points: 1
            }
          ],
          dueDate: new Date(2023, 8, 20),
          status: "upcoming"
        }
      }
    ]
  },
  {
    id: "2",
    title: "Advanced Data Structures",
    description: "Explore complex data structures and algorithms for efficient problem-solving.",
    instructor: mockUsers[1], // Jane Smith
    coverImage: "https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?q=80&w=2670&auto=format&fit=crop",
    createdAt: new Date(2023, 1, 5),
    updatedAt: new Date(2023, 6, 20),
    enrolledStudents: 85,
    duration: "10 weeks",
    level: "advanced",
    modules: [
      {
        id: "201",
        title: "Trees and Graphs",
        content: "<p>Understanding tree and graph data structures.</p>",
        resources: [
          {
            id: "r3",
            title: "Trees and Graphs Lecture Notes",
            type: "pdf",
            url: "#",
            size: "3.2 MB",
            downloadable: true
          }
        ],
        assignments: [
          {
            id: "a2",
            title: "Graph Traversal Implementation",
            description: "Implement BFS and DFS algorithms for graph traversal.",
            dueDate: new Date(2023, 8, 25),
            points: 20,
            status: "active"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Quantum Physics Fundamentals",
    description: "Introduction to the principles of quantum mechanics and its applications.",
    instructor: mockUsers[4], // Sarah Johnson
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
    createdAt: new Date(2023, 2, 15),
    updatedAt: new Date(2023, 5, 10),
    enrolledStudents: 65,
    duration: "14 weeks",
    level: "intermediate",
    modules: [
      {
        id: "301",
        title: "Quantum States and Measurements",
        content: "<p>Understanding quantum states and the measurement problem.</p>",
        resources: [
          {
            id: "r4",
            title: "Quantum Mechanics Lecture",
            type: "video",
            url: "#",
            duration: "60 minutes",
            downloadable: false
          }
        ],
        assignments: [
          {
            id: "a3",
            title: "Quantum State Analysis",
            description: "Analyze given quantum states and predict measurement outcomes.",
            dueDate: new Date(2023, 9, 5),
            points: 15,
            status: "upcoming"
          }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "Calculus I",
    description: "Introduction to differential and integral calculus with applications.",
    instructor: mockUsers[4], // Sarah Johnson
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
    createdAt: new Date(2023, 3, 20),
    updatedAt: new Date(2023, 7, 5),
    enrolledStudents: 130,
    duration: "15 weeks",
    level: "beginner",
    modules: [
      {
        id: "401",
        title: "Limits and Continuity",
        content: "<p>Understanding the concept of limits and continuity of functions.</p>",
        resources: [
          {
            id: "r5",
            title: "Limits and Continuity Notes",
            type: "pdf",
            url: "#",
            size: "2.8 MB",
            downloadable: true
          }
        ],
        assignments: [
          {
            id: "a4",
            title: "Limits Problem Set",
            description: "Solve the given problems on limits and continuity.",
            dueDate: new Date(2023, 8, 30),
            points: 10,
            status: "upcoming"
          }
        ]
      }
    ]
  }
];

// Mock Assignments for the student
export const mockStudentAssignments: Assignment[] = [
  {
    id: "a1",
    title: "Basic Python Syntax",
    description: "Complete the exercises on basic Python syntax and structures.",
    dueDate: new Date(2023, 8, 15),
    points: 10,
    status: "upcoming"
  },
  {
    id: "a5",
    title: "Object-Oriented Programming",
    description: "Implement a simple class hierarchy demonstrating OOP principles.",
    dueDate: new Date(2023, 8, 10),
    points: 15,
    status: "active"
  },
  {
    id: "a6",
    title: "Python Libraries Research",
    description: "Research and present on a Python library of your choice.",
    dueDate: new Date(2023, 7, 30),
    points: 20,
    status: "submitted",
    submission: {
      id: "s1",
      studentId: "1",
      assignmentId: "a6",
      submittedAt: new Date(2023, 7, 29),
      content: "My research on NumPy library and its applications in data science.",
      attachments: ["numpy_research.pdf"],
    }
  },
  {
    id: "a7",
    title: "Algorithm Complexity Analysis",
    description: "Analyze the time and space complexity of given algorithms.",
    dueDate: new Date(2023, 7, 25),
    points: 15,
    status: "graded",
    submission: {
      id: "s2",
      studentId: "1",
      assignmentId: "a7",
      submittedAt: new Date(2023, 7, 24),
      content: "My analysis of the provided algorithms.",
      attachments: ["algorithm_analysis.pdf"],
      grade: 14,
      feedback: "Excellent analysis! Very clear explanations of the time complexities."
    }
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "n1",
    userId: "1", // John Doe (student)
    title: "New Assignment Posted",
    message: "A new assignment 'Basic Python Syntax' has been posted in Introduction to Programming.",
    createdAt: new Date(2023, 8, 1, 9, 30),
    read: false,
    type: "assignment",
    linkTo: "/courses/1/assignments/a1"
  },
  {
    id: "n2",
    userId: "1",
    title: "Assignment Graded",
    message: "Your assignment 'Algorithm Complexity Analysis' has been graded. You received 14/15 points.",
    createdAt: new Date(2023, 7, 26, 15, 45),
    read: true,
    type: "grade",
    linkTo: "/assignments/a7"
  },
  {
    id: "n3",
    userId: "1",
    title: "Upcoming Quiz",
    message: "Don't forget about the 'Python Basics Quiz' scheduled for next week.",
    createdAt: new Date(2023, 8, 5, 10, 0),
    read: false,
    type: "quiz",
    linkTo: "/courses/1/quizzes/q1"
  },
  {
    id: "n4",
    userId: "2", // Jane Smith (faculty)
    title: "New Student Enrollment",
    message: "5 new students have enrolled in your 'Introduction to Programming' course.",
    createdAt: new Date(2023, 8, 2, 11, 15),
    read: false,
    type: "announcement",
    linkTo: "/courses/1/students"
  },
  {
    id: "n5",
    userId: "3", // Admin User
    title: "System Maintenance",
    message: "The platform will undergo maintenance on Sunday from 2 AM to 4 AM.",
    createdAt: new Date(2023, 8, 3, 16, 0),
    read: true,
    type: "announcement"
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "1", // John Doe (student)
    receiverId: "2", // Jane Smith (faculty)
    content: "Hello Professor, I had a question about the assignment due next week.",
    sentAt: new Date(2023, 8, 2, 14, 30),
    read: true
  },
  {
    id: "m2",
    senderId: "2", // Jane Smith (faculty)
    receiverId: "1", // John Doe (student)
    content: "Hi John, what's your question?",
    sentAt: new Date(2023, 8, 2, 15, 0),
    read: true
  },
  {
    id: "m3",
    senderId: "1", // John Doe (student)
    receiverId: "2", // Jane Smith (faculty)
    content: "I'm having trouble understanding the requirements for the second part of the assignment.",
    sentAt: new Date(2023, 8, 2, 15, 10),
    read: true
  },
  {
    id: "m4",
    senderId: "2", // Jane Smith (faculty)
    receiverId: "1", // John Doe (student)
    content: "The second part is about implementing a recursive algorithm for the problem. Perhaps we could discuss this during office hours tomorrow?",
    sentAt: new Date(2023, 8, 2, 15, 20),
    read: false
  },
  {
    id: "m5",
    senderId: "4", // Mike Wilson (student)
    receiverId: "2", // Jane Smith (faculty)
    content: "Professor Smith, will the quiz include content from the optional readings?",
    sentAt: new Date(2023, 8, 3, 10, 45),
    read: false
  }
];
