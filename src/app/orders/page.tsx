"use client";

import { useEffect, useState } from 'react';
import type { Order } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { OrderCard } from '@/components/OrderCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClipboardList, Info, Loader2 } from 'lucide-react';
import { mockMenuData } from './mockMenuData'; // Using a shared mock data for menu items

// Mock orders - in a real app, this would come from a backend
const MOCK_ORDERS: Order[] = [
  {
    id: 'ord123xyz',
    userId: 'guest1', // Corresponds to mock user 'guest@example.com'
    items: [
      { menuItem: mockMenuData[1].items[0], quantity: 1 }, // Grilled Salmon
      { menuItem: mockMenuData[0].items[1], quantity: 2 }, // Bruschetta
    ],
    status: 'In Progress',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    preferences: "No nuts, extra spicy on the salmon.",
    totalAmount: mockMenuData[1].items[0].price * 1 + mockMenuData[0].items[1].price * 2,
  },
  {
    id: 'ord456abc',
    userId: 'guest1',
    items: [
      { menuItem: mockMenuData[2].items[0], quantity: 1 }, // Chocolate Lava Cake
    ],
    status: 'Delivered',
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 1 day and 2 hours ago
    totalAmount: mockMenuData[2].items[0].price * 1,
  },
   {
    id: 'ord789def',
    userId: 'staff1', // Corresponds to mock user 'staff@example.com'
    items: [
      { menuItem: mockMenuData[3].items[0], quantity: 2 }, // Espresso
    ],
    status: 'Ready for Pickup',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    preferences: "Double shot, no sugar.",
    totalAmount: mockMenuData[3].items[0].price * 2,
  },
];


export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        // Simulate fetching orders for the logged-in user
        const fetchedOrders = MOCK_ORDERS.filter(order => order.userId === user.id);
        // If user has preferences set in their profile, and an order doesn't have one,
        // assign it for demo purposes. In real app, preferences are tied to order at creation.
        const ordersWithPrefs = fetchedOrders.map(o => ({
            ...o,
            preferences: o.preferences || user.preferences
        }));
        setUserOrders(ordersWithPrefs.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() ));
      } else {
        setUserOrders([]);
      }
      setIsLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading your orders...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <Info className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Please Log In</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to view your orders.</p>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  if (userOrders.length === 0) {
    return (
      <div className="text-center space-y-6">
        <ClipboardList className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight text-primary">No Orders Yet</h1>
        <p className="text-lg text-foreground/80">You haven't placed any orders. Why not check out our menu?</p>
        <Link href="/menu">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Explore Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Your Orders</h1>
        <p className="text-lg text-foreground/80">Track the status of your current and past orders.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
