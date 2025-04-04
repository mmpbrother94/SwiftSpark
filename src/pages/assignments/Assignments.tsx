
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useCourses } from '@/contexts/CourseContext';

const Assignments: React.FC = () => {
  const { studentAssignments } = useCourses();
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  // Filter assignments based on the active tab
  const filteredAssignments = (() => {
    if (activeTab === 'all') {
      return studentAssignments;
    } else {
      return studentAssignments.filter(assignment => assignment.status === activeTab);
    }
  })();
  
  // Group assignments by status for the overview section
  const assignmentsByStatus = {
    upcoming: studentAssignments.filter(a => a.status === 'upcoming').length,
    active: studentAssignments.filter(a => a.status === 'active').length,
    submitted: studentAssignments.filter(a => a.status === 'submitted').length,
    graded: studentAssignments.filter(a => a.status === 'graded').length,
  };
  
  const totalAssignments = studentAssignments.length;
  const completedAssignments = assignmentsByStatus.submitted + assignmentsByStatus.graded;
  const completionPercentage = totalAssignments ? Math.round((completedAssignments / totalAssignments) * 100) : 0;
  
  const statusConfig = {
    upcoming: { color: 'bg-gray-500', icon: Clock },
    active: { color: 'bg-amber-500', icon: AlertCircle },
    submitted: { color: 'bg-blue-500', icon: Loader2 },
    graded: { color: 'bg-green-500', icon: CheckCircle2 },
  };
  
  const getTimeRemaining = (dueDate: Date) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Overdue';
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `${diffDays} days left`;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Assignments</h1>
          <p className="text-muted-foreground">
            Manage and track all your course assignments in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAssignments}</div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignmentsByStatus.upcoming}</div>
              <CardDescription>Assignments pending</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignmentsByStatus.active}</div>
              <CardDescription>Need to be submitted</CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignmentsByStatus.graded}</div>
              <CardDescription>Completed with feedback</CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 md:w-auto w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {filteredAssignments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No assignments found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    There are no {activeTab !== 'all' ? activeTab : ''} assignments at the moment.
                  </p>
                  <Button variant="outline" onClick={() => setActiveTab('all')}>
                    View All Assignments
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredAssignments.map((assignment) => {
                  const StatusIcon = statusConfig[assignment.status].icon;
                  
                  return (
                    <Card key={assignment.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className={`md:w-2 ${statusConfig[assignment.status].color}`}></div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{assignment.title}</h3>
                                <Badge className={statusConfig[assignment.status].color}>
                                  {assignment.status}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground">{assignment.description}</p>
                              <div className="flex items-center text-sm text-muted-foreground gap-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Due: {formatDate(assignment.dueDate)}</span>
                                </div>
                                <div>
                                  {assignment.status === 'upcoming' || assignment.status === 'active' ? (
                                    <span className="text-amber-500 font-medium">
                                      {getTimeRemaining(assignment.dueDate)}
                                    </span>
                                  ) : null}
                                </div>
                                <div>
                                  <span>{assignment.points} points</span>
                                </div>
                              </div>
                              
                              {assignment.status === 'graded' && assignment.submission && (
                                <div className="mt-2 flex items-center gap-2">
                                  <span className="text-sm font-medium">Grade:</span>
                                  <span className="text-sm">
                                    {assignment.submission.grade} / {assignment.points}
                                  </span>
                                  {(assignment.submission.grade! / assignment.points) >= 0.7 ? (
                                    <span className="text-green-500 text-sm">Good job!</span>
                                  ) : (
                                    <span className="text-amber-500 text-sm">Room for improvement</span>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <Button 
                                variant={assignment.status === 'active' ? 'default' : 'outline'}
                                onClick={() => navigate(`/assignments/${assignment.id}`)}
                              >
                                <StatusIcon className="mr-2 h-4 w-4" />
                                {assignment.status === 'upcoming' && 'View Details'}
                                {assignment.status === 'active' && 'Submit Assignment'}
                                {assignment.status === 'submitted' && 'View Submission'}
                                {assignment.status === 'graded' && 'View Feedback'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
