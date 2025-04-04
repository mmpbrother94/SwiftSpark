
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, User, Calendar, FileText, Book, Settings, Home, 
  Users, Layout, BarChart, Bell, Menu, LogOut, ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
  isMobile?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  href, 
  icon: Icon, 
  children, 
  isActive,
  isMobile
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted hover:text-primary",
        isMobile && "justify-center"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isMobile && <span>{children}</span>}
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };
  
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
        { href: '/admin', icon: Users, label: 'Admin Panel' },
        { href: '/admin/courses', icon: Layout, label: 'Course Management' },
        { href: '/admin/reports', icon: BarChart, label: 'Reports' },
        { href: '/admin/settings', icon: Settings, label: 'System Settings' },
      ];
    }
    
    return baseItems;
  };
  
  const sidebarItems = getSidebarItems();
  
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 flex items-center justify-between bg-white shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h2 className="text-lg font-semibold">
          {currentUser?.role === 'student' ? 'Student Portal' : 
           currentUser?.role === 'faculty' ? 'Faculty Portal' :
           currentUser?.role === 'admin' ? 'Admin Portal' : 'Dashboard'}
        </h2>
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser?.avatar} />
          <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className={cn(
          "border-r bg-background transition-all duration-300 hidden md:block",
          sidebarOpen ? "w-64" : "w-16"
        )}>
          <div className={cn(
            "p-6 flex",
            sidebarOpen ? "justify-between" : "justify-center"
          )}>
            {sidebarOpen && (
              <h2 className="text-lg font-semibold">
                {currentUser?.role === 'student' ? 'Student Portal' : 
                 currentUser?.role === 'faculty' ? 'Faculty Portal' :
                 currentUser?.role === 'admin' ? 'Admin Portal' : 'Dashboard'}
              </h2>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hover:text-foreground"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronRight className={cn(
                "h-5 w-5 transition-transform",
                sidebarOpen ? "rotate-180" : ""
              )} />
            </Button>
          </div>
          
          <nav className="space-y-1 px-3">
            {sidebarItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={location.pathname === item.href}
                isMobile={!sidebarOpen}
              >
                {item.label}
              </SidebarLink>
            ))}
            
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-muted-foreground hover:bg-muted hover:text-destructive mt-4",
                !sidebarOpen && "justify-center"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </nav>
          
          {sidebarOpen && (
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{currentUser?.name || 'User'}</span>
                  <span className="text-sm text-muted-foreground capitalize">{currentUser?.role || 'student'}</span>
                </div>
              </div>
            </div>
          )}
        </aside>
        
        {/* Sidebar - Mobile */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-background animate-slide-in-right overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">
                  {currentUser?.role === 'student' ? 'Student Portal' : 
                   currentUser?.role === 'faculty' ? 'Faculty Portal' :
                   currentUser?.role === 'admin' ? 'Admin Portal' : 'Dashboard'}
                </h2>
              </div>
              
              <nav className="space-y-1 p-3">
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
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-destructive mt-4"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </Button>
              </nav>
              
              <div className="mt-auto p-4 border-t">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentUser?.avatar} />
                    <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentUser?.name || 'User'}</span>
                    <span className="text-sm text-muted-foreground capitalize">{currentUser?.role || 'student'}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
        
        {/* Main content */}
        <main className={cn(
          "flex-1 overflow-y-auto p-6",
          sidebarOpen ? "md:ml-64" : "md:ml-16",
          "transition-all duration-300"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
