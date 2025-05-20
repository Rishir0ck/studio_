"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Info, Loader2, Save } from 'lucide-react';

export default function PreferencesPage() {
  const { user, updateUserPreferences, loading: authLoading } = useAuth();
  const [preferences, setPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user && user.preferences) {
      setPreferences(user.preferences);
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateUserPreferences(preferences);
    setIsLoading(false);
    toast({
      title: "Preferences Updated",
      description: "Your dietary preferences have been saved successfully.",
      variant: "default",
    });
  };
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <Info className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Please Log In</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to manage your preferences.</p>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Dietary Preferences</CardTitle>
          <CardDescription>
            Let us know about your dietary restrictions or preferences. This information will be noted with your orders.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="preferences" className="text-base">Your Preferences</Label>
              <Textarea
                id="preferences"
                placeholder="e.g., Vegetarian, Gluten-free, Allergic to peanuts, No spicy food..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={5}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                This information will help us tailor your orders. For critical allergies, please also inform staff directly.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base py-3" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" /> }
              Save Preferences
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
