"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateDishDescription, type GenerateDishDescriptionInput } from '@/ai/flows/generate-dish-description';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Sparkles, Lightbulb, ChefHat, Loader2, Info, AlertTriangle } from 'lucide-react';

export default function RecipeToolPage() {
  const { user, loading: authLoading } = useAuth();
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setDescription('');

    try {
      const input: GenerateDishDescriptionInput = { keywords };
      const result = await generateDishDescription(input);
      setDescription(result.description);
    } catch (e) {
      console.error(e);
      setError('Failed to generate description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (authLoading) {
     return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== 'staff') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <Info className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">This tool is available for staff members only.</p>
        <Link href="/login">
          <Button>Login as Staff</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 space-y-8">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <ChefHat className="mx-auto h-16 w-16 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold text-primary">AI Recipe Helper</CardTitle>
          <CardDescription>
            Generate creative dish descriptions or get inspiration for daily specials. Enter some keywords below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-base flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-accent" /> Keywords
              </Label>
              <Textarea
                id="keywords"
                placeholder="e.g., chicken, spicy, citrus, summer special, comfort food..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={3}
                className="text-base"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter ingredients, style, or concepts for the dish.
              </p>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base py-3" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Description
            </Button>
          </CardContent>
        </form>
        {error && (
          <CardFooter>
             <Alert variant="destructive" className="w-full">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>

      {description && !isLoading && (
        <Card className="w-full max-w-2xl shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-accent" /> Generated Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground/90 whitespace-pre-wrap">{description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
