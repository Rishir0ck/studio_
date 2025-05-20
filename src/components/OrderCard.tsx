import type { Order } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, Clock, Truck, Utensils, Edit3 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  'Pending': { color: 'bg-yellow-500', icon: Clock, text: 'Pending' },
  'In Progress': { color: 'bg-blue-500', icon: Utensils, text: 'In Progress' },
  'Ready for Pickup': { color: 'bg-green-500', icon: CheckCircle2, text: 'Ready for Pickup' },
  'Delivered': { color: 'bg-teal-500', icon: Truck, text: 'Delivered' },
  'Cancelled': { color: 'bg-red-500', icon: AlertCircle, text: 'Cancelled' },
};

export function OrderCard({ order }: OrderCardProps) {
  const currentStatus = statusConfig[order.status] || statusConfig['Pending'];
  const IconComponent = currentStatus.icon;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-primary">Order #{order.id.substring(0, 8)}</CardTitle>
            <CardDescription>
              Placed on: {format(parseISO(order.timestamp), "MMM d, yyyy 'at' h:mm a")}
            </CardDescription>
          </div>
          <Badge className={`${currentStatus.color} text-white hover:${currentStatus.color} py-1 px-3 text-sm`}>
            <IconComponent className="mr-2 h-4 w-4" />
            {currentStatus.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-3">
        {order.preferences && (
          <div className="mb-4 p-3 bg-accent/20 border border-accent rounded-md">
            <div className="flex items-center text-accent-foreground font-semibold">
              <Edit3 className="h-5 w-5 mr-2 text-accent" />
              <span>Dietary Preferences / Notes:</span>
            </div>
            <p className="text-sm text-accent-foreground/80 mt-1 ml-7">{order.preferences}</p>
          </div>
        )}
        <h4 className="font-semibold mb-2 text-foreground/90">Items:</h4>
        <ScrollArea className="h-40 pr-3">
          <ul className="space-y-2">
            {order.items.map((orderItem, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span>{orderItem.menuItem.name} (x{orderItem.quantity})</span>
                <span>${(orderItem.menuItem.price * orderItem.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Separator className="my-3" />
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total:</span>
          <span className="text-accent">${order.totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
