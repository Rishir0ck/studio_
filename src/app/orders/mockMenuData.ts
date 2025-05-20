import type { MenuCategory } from '@/types';

export const mockMenuData: MenuCategory[] = [
  {
    name: 'Appetizers',
    items: [
      { id: 'app1', name: 'Spring Rolls', description: 'Crispy fried spring rolls with a savory vegetable filling, served with sweet chili sauce.', price: 8.99, category: 'Appetizers', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'spring rolls' },
      { id: 'app2', name: 'Bruschetta', description: 'Grilled bread rubbed with garlic and topped with fresh tomatoes, basil, and olive oil.', price: 7.50, category: 'Appetizers', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'bruschetta italian' },
    ],
  },
  {
    name: 'Main Courses',
    items: [
      { id: 'main1', name: 'Grilled Salmon', description: 'Fresh Atlantic salmon fillet, grilled to perfection, served with roasted asparagus and lemon butter sauce.', price: 22.99, category: 'Main Courses', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'grilled salmon' },
      { id: 'main2', name: 'Steak Frites', description: 'Classic French bistro dish: grilled sirloin steak with a side of crispy golden fries and peppercorn sauce.', price: 25.00, category: 'Main Courses', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'steak frites' },
      { id: 'main3', name: 'Pasta Primavera', description: 'Fettuccine pasta tossed with fresh seasonal vegetables in a light cream sauce.', price: 18.50, category: 'Main Courses', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'pasta vegetables' },
    ],
  },
  {
    name: 'Desserts',
    items: [
      { id: 'des1', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream and raspberry coulis.', price: 9.99, category: 'Desserts', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'chocolate cake' },
      { id: 'des2', name: 'Tiramisu', description: 'Classic Italian dessert made with ladyfingers, mascarpone cheese, espresso, and cocoa powder.', price: 8.75, category: 'Desserts', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'tiramisu dessert' },
    ],
  },
  {
    name: 'Drinks',
    items: [
      { id: 'dri1', name: 'Espresso', description: 'Strong black coffee brewed by forcing steam through finely-ground coffee beans.', price: 3.50, category: 'Drinks', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'espresso coffee' },
      { id: 'dri2', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice, packed with vitamins.', price: 5.00, category: 'Drinks', imageUrl: 'https://placehold.co/400x250.png', dataAiHint: 'orange juice' },
    ],
  },
];
