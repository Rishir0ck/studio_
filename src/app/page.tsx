import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, LogIn, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <section className="text-center space-y-6 pt-8">
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl">
          Welcome to <span className="text-accent">TableTalk</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
          Your modern solution for seamless restaurant management. Explore digital menus, track orders, and delight your customers.
        </p>
        <div className="space-x-4">
          <Link href="/menu">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Utensils className="mr-2 h-5 w-5" /> View Menu
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <LogIn className="mr-2 h-5 w-5" /> Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Digital Menu" 
              width={600} 
              height={400} 
              className="rounded-t-lg object-cover aspect-[3/2]"
              data-ai-hint="food menu"
            />
            <CardTitle className="mt-4 text-2xl text-primary">Digital Menus</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Beautifully showcase your dishes with our easy-to-navigate digital menus. Update items and prices in real-time.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Order Tracking" 
              width={600} 
              height={400} 
              className="rounded-t-lg object-cover aspect-[3/2]"
              data-ai-hint="kitchen order"
            />
            <CardTitle className="mt-4 text-2xl text-primary">Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Keep customers informed with real-time order status updates from kitchen to table.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
             <Image 
              src="https://placehold.co/600x400.png" 
              alt="Recipe Tool" 
              width={600} 
              height={400} 
              className="rounded-t-lg object-cover aspect-[3/2]"
              data-ai-hint="chef writing"
            />
            <CardTitle className="mt-4 text-2xl text-primary">AI Recipe Helper</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Unleash creativity in the kitchen with AI-powered suggestions for daily specials and dish descriptions.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <footer className="text-center py-8 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TableTalk. All rights reserved.</p>
        <p>Powered by Firebase Studio</p>
      </footer>
    </div>
  );
}
