
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Settings, 
  BarChart, 
  BellRing, 
  Shield, 
  Database, 
  LineChart,
  AlertTriangle,
  Server,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock admin data
  const stats = {
    users: {
      total: 1250,
      students: 1150,
      faculty: 75,
      admins: 25,
      growth: 5.2,
    },
    courses: {
      total: 120,
      active: 85,
      archived: 35,
      growth: 3.8,
    },
    system: {
      uptime: '99.8%',
      storage: '42%',
      requests: '15.2k/day',
      avgResponseTime: '120ms',
    },
    support: {
      openTickets: 12,
      criticalTickets: 2,
      resolvedThisWeek: 35,
    }
  };
  
  const AdminCard = ({ title, icon: Icon, description, onClick }: { 
    title: string, 
    icon: React.ElementType, 
    description: string,
    onClick: () => void
  }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow duration-300" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all aspects of the Campus Learning Sphere platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Users" 
            value={stats.users.total} 
            description={`${stats.users.growth}% growth this month`}
            icon={<Users />} 
            trend={{ value: stats.users.growth, isPositive: true }}
          />
          <StatsCard 
            title="Active Courses" 
            value={stats.courses.active} 
            description={`${stats.courses.growth}% increase from last month`} 
            icon={<BookOpen />} 
            trend={{ value: stats.courses.growth, isPositive: true }}
          />
          <StatsCard 
            title="System Uptime" 
            value={stats.system.uptime} 
            description="Last 30 days" 
            icon={<Server />} 
          />
          <StatsCard 
            title="Open Support Tickets" 
            value={stats.support.openTickets} 
            description={`${stats.support.criticalTickets} critical`} 
            icon={<AlertTriangle />} 
            className={stats.support.criticalTickets > 0 ? "border-amber-200 bg-amber-50" : ""}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminCard 
            title="User Management" 
            icon={Users} 
            description="Add, edit, or remove users. Manage permissions and roles."
            onClick={() => navigate('/admin/users')}
          />
          <AdminCard 
            title="Course Management" 
            icon={BookOpen} 
            description="Create, update, and archive courses. Assign instructors."
            onClick={() => navigate('/admin/courses')}
          />
          <AdminCard 
            title="System Settings" 
            icon={Settings} 
            description="Configure platform settings, integrations, and appearance."
            onClick={() => navigate('/admin/settings')}
          />
          <AdminCard 
            title="Reports & Analytics" 
            icon={BarChart} 
            description="Generate reports on user activity, course performance, and more."
            onClick={() => navigate('/admin/reports')}
          />
          <AdminCard 
            title="Announcements" 
            icon={BellRing} 
            description="Create and manage system-wide announcements and notifications."
            onClick={() => navigate('/admin/announcements')}
          />
          <AdminCard 
            title="Security" 
            icon={Shield} 
            description="Review security logs, manage access control, and configure authentication."
            onClick={() => navigate('/admin/security')}
          />
          <AdminCard 
            title="Database Management" 
            icon={Database} 
            description="Backup, optimize, and maintain the platform's database."
            onClick={() => navigate('/admin/database')}
          />
          <AdminCard 
            title="Usage Analytics" 
            icon={LineChart} 
            description="View detailed analytics on platform usage and user engagement."
            onClick={() => navigate('/admin/analytics')}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current status of system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>API Services</span>
                  </div>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Database</span>
                  </div>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Authentication</span>
                  </div>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Storage</span>
                  </div>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                    <span>Video Processing</span>
                  </div>
                  <span className="text-sm text-amber-500">Degraded Performance</span>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/system-status')}>
                  View Detailed Status
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => navigate('/admin/users/create')}>
                  Add New User
                </Button>
                <Button onClick={() => navigate('/admin/courses/create')}>
                  Create Course
                </Button>
                <Button onClick={() => navigate('/admin/announcements/create')}>
                  Send Announcement
                </Button>
                <Button onClick={() => navigate('/admin/reports/generate')}>
                  Generate Reports
                </Button>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="text-sm flex justify-between">
                    <span>System update completed</span>
                    <span className="text-gray-500">2 hours ago</span>
                  </div>
                  <div className="text-sm flex justify-between">
                    <span>Database backup completed</span>
                    <span className="text-gray-500">Yesterday</span>
                  </div>
                  <div className="text-sm flex justify-between">
                    <span>10 new users registered</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
