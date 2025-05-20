"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'guest' | 'staff'>('guest');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(email, role); // Role is used in mock login
    // setIsLoading(false); // Login redirects, so no need to set false here
  };

  const title = mode === 'login' ? 'Welcome Back!' : 'Create an Account';
  const description = mode === 'login' ? 'Log in to manage your restaurant or view your orders.' : 'Sign up to get started with TableTalk.';
  const buttonText = mode === 'login' ? 'Login' : 'Sign Up';
  const buttonIcon = mode === 'login' ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />;

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>
            
            {mode === 'signup' && (
                 <div className="space-y-3">
                 <Label>Account Type</Label>
                 <Tabs defaultValue="guest" onValueChange={(value) => setRole(value as 'guest' | 'staff')} className="w-full">
                   <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="guest">Guest</TabsTrigger>
                     <TabsTrigger value="staff">Staff</TabsTrigger>
                   </TabsList>
                 </Tabs>
                 <p className="text-xs text-muted-foreground">
                    {role === 'guest' ? "Guests can view menus, track personal orders, and set preferences." : "Staff can access management tools like the AI Recipe Helper."}
                 </p>
               </div>
            )}
             {mode === 'login' && (
                 <div className="space-y-3">
                 <Label>Login As</Label>
                 <Tabs defaultValue="guest" onValueChange={(value) => setRole(value as 'guest' | 'staff')} className="w-full">
                   <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="guest">Guest</TabsTrigger>
                     <TabsTrigger value="staff">Staff</TabsTrigger>
                   </TabsList>
                 </Tabs>
               </div>
            )}


            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base py-3" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : buttonIcon}
              {buttonText}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <Link href={mode === 'login' ? '/signup' : '/login'} className="ml-1 font-semibold text-primary hover:underline">
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
