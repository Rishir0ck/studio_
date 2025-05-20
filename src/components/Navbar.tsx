"use client";

import Link from 'next/link';
import { Utensils, ClipboardList, UserCircle, LogIn, LogOut, Settings, ChefHat, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/icons/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { user, logout, loading } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2" aria-label="TableTalk Home">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="text-sm">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
          <Link href="/menu" className="text-sm font-medium transition-colors hover:text-primary">
            <Button variant="ghost" className="text-sm">
              <Utensils className="mr-2 h-4 w-4" /> Menu
            </Button>
          </Link>
          {user && (
            <>
              <Link href="/orders" className="text-sm font-medium transition-colors hover:text-primary">
                <Button variant="ghost" className="text-sm">
                  <ClipboardList className="mr-2 h-4 w-4" /> Orders
                </Button>
              </Link>
              <Link href="/preferences" className="text-sm font-medium transition-colors hover:text-primary">
                <Button variant="ghost" className="text-sm">
                  <Settings className="mr-2 h-4 w-4" /> Preferences
                </Button>
              </Link>
            </>
          )}
          {user && user.role === 'staff' && (
            <Link href="/staff/recipe-tool" className="text-sm font-medium transition-colors hover:text-primary">
              <Button variant="ghost" className="text-sm">
                <ChefHat className="mr-2 h-4 w-4" /> Recipe Tool
              </Button>
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-2">
          {loading ? (
             <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(user.name)}`} alt={user.name || "User"} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email} ({user.role})
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">
                <LogIn className="mr-2 h-4 w-4" /> Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
