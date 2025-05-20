import type { MenuItem } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={400}
          height={250}
          className="object-cover w-full h-48"
          data-ai-hint={item.dataAiHint || "food dish"}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold text-primary mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm text-foreground/80 mb-2 h-16 overflow-y-auto">
          {item.description}
        </CardDescription>
        <p className="text-lg font-bold text-accent">
          ${item.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" aria-label={`Add ${item.name} to cart`}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
}
