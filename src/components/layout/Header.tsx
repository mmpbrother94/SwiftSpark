
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, BookOpen, LogOut, MessageSquare, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const { getUnreadNotificationsCount, getNotificationsForUser, markNotificationAsRead } = useNotifications();
  const navigate = useNavigate();
  
  const unreadCount = currentUser ? getUnreadNotificationsCount(currentUser.id) : 0;
  const notifications = currentUser ? getNotificationsForUser(currentUser.id) : [];
  
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-edu-primary" />
          <span className="text-xl font-bold edu-gradient">Campus Learning Sphere</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/courses">Courses</Link>
          </Button>
          {currentUser?.role === 'student' && (
            <Button variant="ghost" asChild>
              <Link to="/assignments">Assignments</Link>
            </Button>
          )}
          {currentUser?.role === 'faculty' && (
            <Button variant="ghost" asChild>
              <Link to="/my-courses">My Courses</Link>
            </Button>
          )}
          {currentUser?.role === 'admin' && (
            <Button variant="ghost" asChild>
              <Link to="/admin">Admin Panel</Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="hidden md:flex items-center relative w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search for courses, lessons..."
          className="pl-10 rounded-full bg-gray-50 border-gray-200"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-edu-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 bg-gray-50 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
                        onClick={() => {
                          markNotificationAsRead(notification.id);
                          if (notification.linkTo) {
                            navigate(notification.linkTo);
                          }
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && <Badge className="bg-edu-primary">New</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 5 && (
                  <div className="p-2 text-center border-t">
                    <Button variant="link" asChild>
                      <Link to="/notifications">View all notifications</Link>
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/messages')}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                    <Badge className="mt-1 w-fit capitalize">
                      {currentUser.role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
