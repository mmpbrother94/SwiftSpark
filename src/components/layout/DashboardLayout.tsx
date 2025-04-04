
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Calendar, FileText, Book, Settings, Home, Users, Layout, BarChart, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, children, isActive }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // Define sidebar items based on user role
  const getSidebarItems = () => {
    const baseItems = [
      { href: '/dashboard', icon: Home, label: 'Dashboard' },
      { href: '/courses', icon: BookOpen, label: 'Browse Courses' },
      { href: '/profile', icon: User, label: 'Profile' },
    ];
    
    if (currentUser?.role === 'student') {
      return [
        ...baseItems,
        { href: '/enrolled-courses', icon: Book, label: 'My Courses' },
        { href: '/assignments', icon: FileText, label: 'Assignments' },
        { href: '/calendar', icon: Calendar, label: 'Calendar' },
        { href: '/messages', icon: Bell, label: 'Messages' },
      ];
    }
    
    if (currentUser?.role === 'faculty') {
      return [
        ...baseItems,
        { href: '/my-courses', icon: Layout, label: 'My Courses' },
        { href: '/grades', icon: FileText, label: 'Grading' },
        { href: '/students', icon: Users, label: 'Students' },
        { href: '/messages', icon: Bell, label: 'Messages' },
        { href: '/faculty-settings', icon: Settings, label: 'Settings' },
      ];
    }
    
    if (currentUser?.role === 'admin') {
      return [
        ...baseItems,
        { href: '/admin/users', icon: Users, label: 'User Management' },
        { href: '/admin/courses', icon: Layout, label: 'Course Management' },
        { href: '/admin/reports', icon: BarChart, label: 'Reports' },
        { href: '/admin/settings', icon: Settings, label: 'System Settings' },
      ];
    }
    
    return baseItems;
  };
  
  const sidebarItems = getSidebarItems();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-background hidden md:block">
          <div className="p-6">
            <h2 className="text-lg font-semibold">
              {currentUser?.role === 'student' ? 'Student Portal' : 
               currentUser?.role === 'faculty' ? 'Faculty Portal' :
               currentUser?.role === 'admin' ? 'Admin Portal' : 'Dashboard'}
            </h2>
          </div>
          <nav className="space-y-1 px-3">
            {sidebarItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={location.pathname === item.href}
              >
                {item.label}
              </SidebarLink>
            ))}
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
