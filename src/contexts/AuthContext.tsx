"use client";

import type { User } from '@/types';
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Using next/navigation

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'guest' | 'staff') => void;
  logout: () => void;
  updateUserPreferences: (preferences: string) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
  'guest@example.com': { id: 'guest1', email: 'guest@example.com', role: 'guest', name: 'Guest User', preferences: 'No nuts' },
  'staff@example.com': { id: 'staff1', email: 'staff@example.com', role: 'staff', name: 'Staff Member' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Try to load user from localStorage on initial load
    try {
      const storedUser = localStorage.getItem('tabletalk-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('tabletalk-user');
    }
    setLoading(false);
  }, []);

  const login = useCallback((email: string, role: 'guest' | 'staff') => {
    // In a real app, you'd authenticate against a backend.
    // For this mock, we'll use predefined users or create a generic one.
    let foundUser = MOCK_USERS[email];
    if (!foundUser || foundUser.role !== role) {
      // Create a generic user if not in mock list or role mismatch
      foundUser = { id: Date.now().toString(), email, role, name: email.split('@')[0] };
    }
    
    setUser(foundUser);
    localStorage.setItem('tabletalk-user', JSON.stringify(foundUser));
    if (role === 'staff') {
      router.push('/staff/recipe-tool');
    } else {
      router.push('/menu');
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('tabletalk-user');
    router.push('/login');
  }, [router]);

  const updateUserPreferences = useCallback((preferences: string) => {
    setUser(currentUser => {
      if (currentUser) {
        const updatedUser = { ...currentUser, preferences };
        localStorage.setItem('tabletalk-user', JSON.stringify(updatedUser));
        // Update mock users list if the user is one of them (for demo persistence across logins)
        if(MOCK_USERS[currentUser.email]) {
            MOCK_USERS[currentUser.email].preferences = preferences;
        }
        return updatedUser;
      }
      return null;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserPreferences, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
