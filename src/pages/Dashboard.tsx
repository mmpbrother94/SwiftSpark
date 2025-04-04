
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar, FileText, MessageSquare, BellRing, Clock, BookOpen, BarChart, Users, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import AssignmentList from '@/components/dashboard/AssignmentList';
import CourseCard from '@/components/courses/CourseCard';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { useNotifications } from '@/contexts/NotificationContext';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { courses, studentAssignments, getEnrolledCourses, getInstructorCourses } = useCourses();
  const { getNotificationsForUser } = useNotifications();
  const navigate = useNavigate();
  
  if (!currentUser) {
    // Redirect to sign in page if not logged in
    navigate('/signin');
    return null;
  }
  
  // Filter coursaes based on role
  const userCourses = currentUser.role === 'student' 
    ? getEnrolledCourses(currentUser.id).slice(0, 3)
    : currentUser.role === 'faculty'
    ? getInstructorCourses(currentUser.id).slice(0, 3)
    : courses.slice(0, 3);
  
  // Get notifications for the user
  const userNotifications = getNotificationsForUser(currentUser.id).slice(0, 5);
  
  // Active assignments for students
  const activeAssignments = studentAssignments.filter(a => a.status === 'active' || a.status === 'upcoming').slice(0, 3);
  
  // Helper function to render dashboard based on user role
  const renderRoleDashboard = () => {
    switch (currentUser.role) {
      case 'student':
        return renderStudentDashboard();
      case 'faculty':
        return renderFacultyDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return null;
    }
  };
  
  // Render student dashboard
  const renderStudentDashboard = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Enrolled Courses" 
            value={courses.length}
            description="Across different subjects"
            icon={<Book />}
          />
          <StatsCard 
            title="Upcoming Assignments" 
            value={studentAssignments.filter(a => a.status === 'upcoming').length}
            description="Due this week"
            icon={<FileText />}
          />
          <StatsCard 
            title="Completed Assignments" 
            value={studentAssignments.filter(a => a.status === 'graded').length}
            description="Out of total assignments"
            icon={<BarChart />}
          />
          <StatsCard 
            title="Average Grade" 
            value="85%"
            description="Up 5% from last term"
            icon={<BarChart />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AssignmentList assignments={activeAssignments} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-edu-primary/10 p-2 rounded">
                      <Calendar className="h-5 w-5 text-edu-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Data Structures Quiz</p>
                      <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-edu-secondary/10 p-2 rounded">
                      <Clock className="h-5 w-5 text-edu-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Python Project Deadline</p>
                      <p className="text-sm text-gray-500">Friday at 11:59 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-edu-accent/10 p-2 rounded">
                      <Users className="h-5 w-5 text-edu-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Group Project Meeting</p>
                      <p className="text-sm text-gray-500">Saturday at 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {userNotifications.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No new notifications</p>
                ) : (
                  <div className="space-y-4">
                    {userNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3">
                        <div className={`bg-${notification.read ? 'gray' : 'edu-primary'}/10 p-2 rounded`}>
                          <BellRing className={`h-5 w-5 ${notification.read ? 'text-gray-500' : 'text-edu-primary'}`} />
                        </div>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button variant="outline" onClick={() => navigate('/courses')}>
              View All Courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userCourses.map((course) => (
              <CourseCard key={course.id} course={course} isEnrolled={true} />
            ))}
          </div>
        </div>
      </>
    );
  };
  
  // Render faculty dashboard
  const renderFacultyDashboard = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Active Courses" 
            value={userCourses.length}
            description="You are teaching"
            icon={<BookOpen />}
          />
          <StatsCard 
            title="Total Students" 
            value={userCourses.reduce((acc, course) => acc + course.enrolledStudents, 0)}
            description="Across all courses"
            icon={<Users />}
          />
          <StatsCard 
            title="Pending Assignments" 
            value="15"
            description="Need grading"
            icon={<FileText />}
          />
          <StatsCard 
            title="Average Engagement" 
            value="78%"
            description="Up 3% from last month"
            icon={<BarChart />}
            trend={{ value: 3, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Activity across your courses in the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-edu-primary pl-4 py-2">
                    <p className="font-medium">5 new submissions for "Algorithm Complexity Analysis"</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-edu-secondary pl-4 py-2">
                    <p className="font-medium">3 students viewed your feedback on "Data Structures Quiz"</p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                  <div className="border-l-4 border-edu-accent pl-4 py-2">
                    <p className="font-medium">Updated course materials for "Introduction to Programming"</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4 py-2">
                    <p className="font-medium">Created new assignment "Python Project"</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/create-course')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <BookOpen className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Create New Course</p>
                      <p className="text-xs text-muted-foreground">Design and publish a new course</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/create-assignment')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <FileText className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Create Assignment</p>
                      <p className="text-xs text-muted-foreground">Add new assignments to courses</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/grade-assignments')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <BarChart className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Grade Assignments</p>
                      <p className="text-xs text-muted-foreground">Review and grade submissions</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/send-announcement')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <BellRing className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Send Announcement</p>
                      <p className="text-xs text-muted-foreground">Notify students with updates</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center">
                      <span className="font-medium text-sm">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500 line-clamp-1">I had a question about the assignment...</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center">
                      <span className="font-medium text-sm">MW</span>
                    </div>
                    <div>
                      <p className="font-medium">Mike Wilson</p>
                      <p className="text-sm text-gray-500 line-clamp-1">Will the quiz include content from the optional readings?</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/messages')}>
                    View All Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                {userNotifications.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No new notifications</p>
                ) : (
                  <div className="space-y-4">
                    {userNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3">
                        <div className={`bg-${notification.read ? 'gray' : 'edu-primary'}/10 p-2 rounded`}>
                          <BellRing className={`h-5 w-5 ${notification.read ? 'text-gray-500' : 'text-edu-primary'}`} />
                        </div>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button variant="outline" onClick={() => navigate('/my-courses')}>
              Manage All Courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </>
    );
  };
  
  // Render admin dashboard
  const renderAdminDashboard = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Total Users" 
            value="1,254"
            description="Students, faculty, and admins"
            icon={<Users />}
          />
          <StatsCard 
            title="Active Courses" 
            value={courses.length}
            description="Being offered this term"
            icon={<BookOpen />}
          />
          <StatsCard 
            title="System Uptime" 
            value="99.8%"
            description="Last 30 days"
            icon={<BarChart />}
          />
          <StatsCard 
            title="Support Tickets" 
            value="12"
            description="5 pending resolution"
            icon={<HelpCircle />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Summary of system performance and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">User Activity</h3>
                      <p className="text-sm text-gray-500">Last 30 days</p>
                    </div>
                    <div className="h-36 bg-gray-100 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">Activity charts would be displayed here</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Resource Utilization</h3>
                      <p className="text-sm text-gray-500">Current status</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Storage</p>
                        <p className="text-xl font-bold">42%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-edu-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Bandwidth</p>
                        <p className="text-xl font-bold">28%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-edu-secondary h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">CPU</p>
                        <p className="text-xl font-bold">15%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-edu-accent h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin/users')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <Users className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Manage Users</p>
                      <p className="text-xs text-muted-foreground">Add, edit, or remove users</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/admin/courses')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <BookOpen className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Manage Courses</p>
                      <p className="text-xs text-muted-foreground">Edit course catalog</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/admin/reports')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <BarChart className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Generate Reports</p>
                      <p className="text-xs text-muted-foreground">Analytics and metrics</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/admin/settings')}
                    className="flex items-center justify-start space-x-2 h-auto py-3"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">System Settings</p>
                      <p className="text-xs text-muted-foreground">Configure platform options</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-edu-primary/10 p-2 rounded">
                      <Users className="h-5 w-5 text-edu-primary" />
                    </div>
                    <div>
                      <p className="font-medium">New User Registration</p>
                      <p className="text-sm text-gray-500">5 new students registered today</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-edu-secondary/10 p-2 rounded">
                      <BookOpen className="h-5 w-5 text-edu-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">New Course Created</p>
                      <p className="text-sm text-gray-500">Web Development Fundamentals by Prof. Johnson</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-edu-accent/10 p-2 rounded">
                      <BellRing className="h-5 w-5 text-edu-accent" />
                    </div>
                    <div>
                      <p className="font-medium">System Update Completed</p>
                      <p className="text-sm text-gray-500">Platform updated to version 2.4.0</p>
                      <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-amber-100 p-2 rounded">
                      <HelpCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium mr-2">Login Issue</p>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          Medium
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">Users reporting password reset not working</p>
                      <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-100 p-2 rounded">
                      <HelpCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium mr-2">Video Streaming</p>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                          High
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">Lecture videos not loading for some users</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/admin/support')}>
                    View All Tickets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your {
              currentUser.role === 'student' ? 'learning' : 
              currentUser.role === 'faculty' ? 'courses' : 
              'platform'
            } today.
          </p>
        </div>
        
        {renderRoleDashboard()}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
