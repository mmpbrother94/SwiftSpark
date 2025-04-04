
import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import CourseCard from '@/components/courses/CourseCard';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';

const Courses: React.FC = () => {
  const { courses, searchCourses, enrollInCourse } = useCourses();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive from the input change
  };
  
  const handleEnroll = (courseId: string) => {
    if (currentUser) {
      enrollInCourse(courseId, currentUser.id);
    } else {
      // Could redirect to login or show a message
      console.log('Please sign in to enroll');
    }
  };
  
  // Filter courses based on search query and level filter
  const filteredCourses = (() => {
    const searchResults = searchQuery ? searchCourses(searchQuery) : courses;
    
    if (levelFilter === 'all') {
      return searchResults;
    } else {
      return searchResults.filter(course => course.level === levelFilter);
    }
  })();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse Courses</h1>
            <p className="text-gray-600">Discover our comprehensive selection of courses</p>
          </div>
          
          <form onSubmit={handleSearch} className="mt-4 md:mt-0 flex w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ml-2">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by level" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any courses matching your search criteria.
            </p>
            <Button onClick={() => { setSearchQuery(''); setLevelFilter('all'); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course}
                onEnroll={() => handleEnroll(course.id)}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Courses;
