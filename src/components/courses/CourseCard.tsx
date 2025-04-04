
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled = false, onEnroll }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-amber-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className={`absolute top-2 right-2 ${getLevelColor(course.level)}`}>
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 h-14">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <BookOpen className="mr-2 h-4 w-4" />
          <span>By {course.instructor.name}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{course.enrolledStudents} students</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link to={`/courses/${course.id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full"
          >
            View Details
          </Button>
        </Link>
        
        {!isEnrolled && onEnroll && (
          <Button 
            className="ml-2 w-full" 
            onClick={onEnroll}
          >
            Enroll Now
          </Button>
        )}
        
        {isEnrolled && (
          <Link to={`/courses/${course.id}/learn`} className="w-full ml-2">
            <Button className="w-full">
              Continue Learning
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
