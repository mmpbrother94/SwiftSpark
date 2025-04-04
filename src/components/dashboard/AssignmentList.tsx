
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Assignment } from '@/lib/types';

interface AssignmentListProps {
  assignments: Assignment[];
}

const AssignmentList: React.FC<AssignmentListProps> = ({ assignments }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gray-500';
      case 'active':
        return 'bg-amber-500';
      case 'submitted':
        return 'bg-blue-500';
      case 'graded':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const formatDueDate = (date: Date) => {
    const now = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Overdue';
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No assignments found</p>
            </div>
          ) : (
            assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h3 className="text-base font-medium text-gray-900 truncate mr-2">
                      {assignment.title}
                    </h3>
                    <Badge className={`${getStatusColor(assignment.status)} capitalize`}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {assignment.description}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-gray-500">
                      {formatDueDate(assignment.dueDate)} • {assignment.points} points
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex-shrink-0">
                  <Button
                    onClick={() => navigate(`/assignments/${assignment.id}`)}
                    variant={assignment.status === 'active' ? 'default' : 'outline'}
                    size="sm"
                  >
                    {assignment.status === 'upcoming' && 'View'}
                    {assignment.status === 'active' && 'Submit'}
                    {assignment.status === 'submitted' && 'View Submission'}
                    {assignment.status === 'graded' && 'View Feedback'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentList;
