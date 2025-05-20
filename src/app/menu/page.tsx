"use client"; //This page involves state for potentially filtering/searching, client-side interaction heavy

import type { MenuCategory, MenuItem } from '@/types';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Utensils, Coffee, Cake, Salad, Soup, Fish, Beef, GlassWater } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';

const mockMenuData: MenuCategory[] = [
  {
    name: 'Appetizers',
    icon: Salad,
    items: [
      { id: 'app1', name: 'Spring Rolls', description: 'Crispy fried spring rolls with a savory vegetable filling, served with sweet chili sauce.', price: 8.99, category: 'Appetizers', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'spring rolls' },
      { id: 'app2', name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with fresh tomatoes, basil, and olive oil.', price: 7.50, category: 'Appetizers', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'bruschetta italian' },
    ],
  },
  {
    name: 'Main Courses',
    icon: Utensils,
    items: [
      { id: 'main1', name: 'Grilled Salmon', description: 'Fresh Atlantic salmon fillet, grilled to perfection, served with roasted asparagus and lemon butter sauce.', price: 22.99, category: 'Main Courses', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'grilled salmon' },
      { id: 'main2', name: 'Steak Frites', description: 'Classic French bistro dish: grilled sirloin steak with a side of crispy golden fries and peppercorn sauce.', price: 25.00, category: 'Main Courses', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'steak frites' },
      { id: 'main3', name: 'Pasta Primavera', description: 'Fettuccine pasta tossed with fresh seasonal vegetables in a light cream sauce.', price: 18.50, category: 'Main Courses', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'pasta vegetables' },
    ],
  },
  {
    name: 'Desserts',
    icon: Cake,
    items: [
      { id: 'des1', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream and raspberry coulis.', price: 9.99, category: 'Desserts', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'chocolate cake' },
      { id: 'des2', name: 'Tiramisu', description: 'Classic Italian dessert made with ladyfingers, mascarpone cheese, espresso, and cocoa powder.', price: 8.75, category: 'Desserts', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'tiramisu dessert' },
    ],
  },
  {
    name: 'Drinks',
    icon: Coffee,
    items: [
      { id: 'dri1', name: 'Espresso', description: 'Strong black coffee brewed by forcing steam through finely-ground coffee beans.', price: 3.50, category: 'Drinks', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'espresso coffee' },
      { id: 'dri2', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice, packed with vitamins.', price: 5.00, category: 'Drinks', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'orange juice' },
    ],
  },
];

const categoryIcons: { [key: string]: React.ElementType } = {
  'Appetizers': Salad,
  'Main Courses': Utensils,
  'Soups': Soup,
  'Seafood': Fish,
  'Meats': Beef,
  'Desserts': Cake,
  'Drinks': Coffee,
  'Beverages': GlassWater,
};

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenuData = useMemo(() => {
    if (!searchTerm) return mockMenuData;
    return mockMenuData.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [searchTerm]);

  const allCategories = mockMenuData.map(cat => cat.name);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Our Menu</h1>
        <p className="text-lg text-foreground/80">Explore our delicious offerings, crafted with the freshest ingredients.</p>
      </div>
      
      <div className="sticky top-16 bg-background/90 backdrop-blur-sm py-4 z-10">
        <Input 
          type="text"
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg mx-auto text-base"
        />
      </div>

      {filteredMenuData.length === 0 && searchTerm && (
        <p className="text-center text-muted-foreground text-lg">No dishes found matching your search "{searchTerm}".</p>
      )}
      
      <Tabs defaultValue={allCategories[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 h-auto flex-wrap">
          {allCategories.map((categoryName) => (
            <TabsTrigger key={categoryName} value={categoryName} className="text-sm md:text-base py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {React.createElement(categoryIcons[categoryName] || Utensils, {className: "mr-2 h-5 w-5 inline-block"})}
              {categoryName}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredMenuData.map((category) => (
          <TabsContent key={category.name} value={category.name}>
            {category.items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              !searchTerm && <p className="text-center text-muted-foreground mt-6">No items in this category.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
