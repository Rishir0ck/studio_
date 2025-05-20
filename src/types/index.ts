import type { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  email: string;
  role: 'guest' | 'staff';
  name?: string;
  preferences?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface MenuCategory {
  name: string;
  icon?: LucideIcon;
  items: MenuItem[];
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'Pending' | 'In Progress' | 'Ready for Pickup' | 'Delivered' | 'Cancelled';
  timestamp: string; // ISO string
  userId: string; 
  preferences?: string;
  totalAmount: number;
}
