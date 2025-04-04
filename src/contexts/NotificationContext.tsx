
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, Message, Conversation, User } from '@/lib/types';
import { mockNotifications, mockMessages } from '@/lib/mock-data';
import { useToast } from '@/components/ui/use-toast';

interface NotificationContextType {
  notifications: Notification[];
  messages: Message[];
  conversations: Conversation[];
  getNotificationsForUser: (userId: string) => Notification[];
  getUnreadNotificationsCount: (userId: string) => number;
  markNotificationAsRead: (notificationId: string) => void;
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
  getConversationsForUser: (userId: string) => Conversation[];
  getMessagesForConversation: (participantIds: string[]) => Message[];
  sendAnnouncement: (senderId: string, title: string, message: string, recipientIds: string[]) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { toast } = useToast();

  // Generate conversations from messages on initial load
  useEffect(() => {
    const convoMap = new Map<string, Conversation>();
    
    messages.forEach(message => {
      const participantIds = [message.senderId, message.receiverId].sort();
      const convoKey = participantIds.join('-');
      
      if (!convoMap.has(convoKey)) {
        convoMap.set(convoKey, {
          id: convoKey,
          participants: participantIds,
          lastMessage: message,
          unreadCount: message.read ? 0 : 1
        });
      } else {
        const convo = convoMap.get(convoKey)!;
        const messageDate = new Date(message.sentAt);
        const lastMessageDate = new Date(convo.lastMessage!.sentAt);
        
        if (messageDate > lastMessageDate) {
          convo.lastMessage = message;
        }
        
        if (!message.read) {
          convo.unreadCount += 1;
        }
      }
    });
    
    setConversations(Array.from(convoMap.values()));
  }, [messages]);

  const getNotificationsForUser = (userId: string) => {
    return notifications.filter(notification => notification.userId === userId);
  };

  const getUnreadNotificationsCount = (userId: string) => {
    return notifications.filter(notification => notification.userId === userId && !notification.read).length;
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prevNotifications => {
      return prevNotifications.map(notification => {
        if (notification.id === notificationId) {
          return { ...notification, read: true };
        }
        return notification;
      });
    });
  };

  const sendMessage = (senderId: string, receiverId: string, content: string) => {
    const newMessage: Message = {
      id: `message-${Date.now()}`,
      senderId,
      receiverId,
      content,
      sentAt: new Date(),
      read: false
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Update conversations
    const participantIds = [senderId, receiverId].sort();
    const convoKey = participantIds.join('-');
    
    setConversations(prevConversations => {
      const existingConvo = prevConversations.find(c => c.id === convoKey);
      
      if (existingConvo) {
        return prevConversations.map(convo => {
          if (convo.id === convoKey) {
            return {
              ...convo,
              lastMessage: newMessage,
              unreadCount: convo.unreadCount + 1
            };
          }
          return convo;
        });
      } else {
        return [
          ...prevConversations,
          {
            id: convoKey,
            participants: participantIds,
            lastMessage: newMessage,
            unreadCount: 1
          }
        ];
      }
    });
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };

  const getConversationsForUser = (userId: string) => {
    return conversations.filter(convo => convo.participants.includes(userId));
  };

  const getMessagesForConversation = (participantIds: string[]) => {
    const sortedParticipantIds = [...participantIds].sort();
    
    return messages.filter(message => {
      const messageParticipants = [message.senderId, message.receiverId].sort();
      return (
        messageParticipants[0] === sortedParticipantIds[0] &&
        messageParticipants[1] === sortedParticipantIds[1]
      );
    }).sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());
  };

  const sendAnnouncement = (senderId: string, title: string, message: string, recipientIds: string[]) => {
    const newNotifications = recipientIds.map(userId => ({
      id: `notification-${Date.now()}-${userId}`,
      userId,
      title,
      message,
      createdAt: new Date(),
      read: false,
      type: "announcement" as const
    }));
    
    setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
    
    toast({
      title: "Announcement Sent",
      description: `Announcement has been sent to ${recipientIds.length} recipients.`,
    });
  };

  const value = {
    notifications,
    messages,
    conversations,
    getNotificationsForUser,
    getUnreadNotificationsCount,
    markNotificationAsRead,
    sendMessage,
    getConversationsForUser,
    getMessagesForConversation,
    sendAnnouncement,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
