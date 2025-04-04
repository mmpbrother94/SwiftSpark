
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BookOpenCheck, Building2, GraduationCap, BarChart, Users, ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/ui/animated-button';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import CourseCard from '@/components/courses/CourseCard';
import { mockCourses } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const featuredCourses = mockCourses.slice(0, 3);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-edu-primary to-edu-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your College Learning Experience
            </h1>
            <p className="text-xl mb-8">
              Discover a seamless e-learning platform designed specifically for college students and faculty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <AnimatedButton
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-edu-primary hover:bg-gray-100 group"
                  glowColor="rgba(255, 255, 255, 0.6)"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-white text-edu-primary hover:bg-gray-100 group"
                  glowColor="rgba(255, 255, 255, 0.6)"
                >
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </AnimatedButton>
              )}
              <AnimatedButton 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/courses')}
                className="border-white text-white hover:bg-white/10"
                glowColor="rgba(255, 255, 255, 0.3)"
              >
                Browse Courses
              </AnimatedButton>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Campus Learning Sphere?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 hover:bg-blue-50 p-6 rounded-lg text-center animate-slide-up transition-colors duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-edu-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-edu-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Course Management</h3>
              <p className="text-gray-600">
                Create, organize, and access course materials with ease. Everything you need in one place.
              </p>
            </div>
            
            <div className="bg-gray-50 hover:bg-purple-50 p-6 rounded-lg text-center animate-slide-up transition-colors duration-300 hover:shadow-lg" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-edu-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-edu-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Learning Experience</h3>
              <p className="text-gray-600">
                Engage with instructors and peers through discussion forums, live sessions, and collaborative projects.
              </p>
            </div>
            
            <div className="bg-gray-50 hover:bg-green-50 p-6 rounded-lg text-center animate-slide-up transition-colors duration-300 hover:shadow-lg" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-edu-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-edu-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your academic journey with detailed analytics and performance insights.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button variant="outline" onClick={() => navigate('/courses')} className="group">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-blue-50 rounded-lg transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-edu-primary mb-2">1,200+</div>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-edu-secondary mb-2">50+</div>
              <p className="text-gray-600">Faculty Members</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-edu-accent mb-2">120+</div>
              <p className="text-gray-600">Courses</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-lg transition-transform hover:scale-105 duration-300">
              <div className="text-4xl font-bold text-edu-warning mb-2">95%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-edu-secondary to-edu-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students and faculty members who are already using Campus Learning Sphere to enhance their educational experience.
          </p>
          <AnimatedButton 
            size="lg" 
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
            className="bg-white text-edu-primary hover:bg-gray-100 group"
            glowColor="rgba(255, 255, 255, 0.6)"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </AnimatedButton>
        </div>
      </section>
      
      {/* User Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Who Campus Learning Sphere is For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-edu-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Students</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access course materials anytime, anywhere</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Submit assignments and take quizzes online</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Track your progress and get instant feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Collaborate with peers on group projects</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BookOpenCheck className="h-6 w-6 text-edu-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Faculty</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Create and manage course content efficiently</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Grade assignments and provide feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Track student performance with analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Communicate directly with students</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-edu-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Administrators</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Manage user accounts and permissions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Generate reports on system usage and performance</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Configure system settings and integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Monitor overall platform health</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
