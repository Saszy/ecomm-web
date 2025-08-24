import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { uploadEventToS3, UploadEvent as S3UploadEvent } from '../services/s3Service';

interface User {
  id: string;
  username: string;
  email?: string;
  createdAt: string;
  lastLoginAt: string;
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

interface UserEvent {
  id: string;
  userId: string;
  eventType: 'like' | 'unlike' | 'share' | 'view';
  productId: number;
  productName: string;
  categoryName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  trackEvent: (event: Omit<UserEvent, 'id' | 'userId' | 'timestamp'>) => void;
  getUserEvents: () => UserEvent[];
  clearUserEvents: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is already logged in from localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      const savedEvents = localStorage.getItem('userEvents');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const [userEvents, setUserEvents] = useState<UserEvent[]>(() => {
    // Load user events from localStorage
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('userEvents');
      return savedEvents ? JSON.parse(savedEvents) : [];
    }
    return [];
  });

  // Generate a unique user ID
  const generateUserId = (): string => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const login = (username: string, email?: string) => {
    const now = new Date().toISOString();
    const newUser: User = {
      id: generateUserId(),
      username,
      email,
      createdAt: now,
      lastLoginAt: now,
      preferences: {
        theme: 'light',
        notifications: true,
      },
    };
    
    setUser(newUser);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Initialize user events array
      const existingEvents = localStorage.getItem('userEvents');
      if (!existingEvents) {
        localStorage.setItem('userEvents', JSON.stringify([]));
      }
    }
  };

  const logout = () => {
    setUser(null);
    setUserEvents([]);
    
    // Remove from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('userEvents');
    }
  };

  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      };
      
      setUser(updatedUser);
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  const trackEvent = async (event: Omit<UserEvent, 'id' | 'userId' | 'timestamp'>) => {
    if (!user) return;

    const newEvent: UserEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      timestamp: new Date().toISOString(),
      ...event,
    };

    const updatedEvents = [...userEvents, newEvent];
    setUserEvents(updatedEvents);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('userEvents', JSON.stringify(updatedEvents));
    }

    // Send event to S3
    try {
      const s3Event: S3UploadEvent = {
        userId: user.id,
        eventType: event.eventType,
        productId: event.productId,
        productName: event.productName,
        categoryName: event.categoryName,
        timestamp: newEvent.timestamp,
        metadata: event.metadata,
      };

      await uploadEventToS3(s3Event);
      console.log('Event successfully uploaded to S3:', newEvent);
    } catch (error) {
      console.error('Failed to upload event to S3:', error);
      // Event is still tracked locally even if S3 upload fails
    }
  };

  const getUserEvents = () => {
    return userEvents;
  };

  const clearUserEvents = () => {
    setUserEvents([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEvents');
    }
  };

  // Update last login time when user is loaded
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      const updatedUser = {
        ...user,
        lastLoginAt: new Date().toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    updateUserPreferences,
    trackEvent,
    getUserEvents,
    clearUserEvents,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
