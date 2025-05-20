// src/ai/flows/generate-dish-description.ts
'use server';

/**
 * @fileOverview An AI agent that generates dish descriptions based on keywords.
 *
 * - generateDishDescription - A function that handles the dish description generation process.
 * - GenerateDishDescriptionInput - The input type for the generateDishDescription function.
 * - GenerateDishDescriptionOutput - The return type for the generateDishDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDishDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords describing the dish, ingredients, and style.'),
});
export type GenerateDishDescriptionInput = z.infer<typeof GenerateDishDescriptionInputSchema>;

const GenerateDishDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A creative and enticing description of the dish.'),
});
export type GenerateDishDescriptionOutput = z.infer<typeof GenerateDishDescriptionOutputSchema>;

export async function generateDishDescription(input: GenerateDishDescriptionInput): Promise<GenerateDishDescriptionOutput> {
  return generateDishDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDishDescriptionPrompt',
  input: {schema: GenerateDishDescriptionInputSchema},
  output: {schema: GenerateDishDescriptionOutputSchema},
  prompt: `You are a professional chef and food critic known for your creative and descriptive language.

  Based on the following keywords, generate a mouth-watering description for a new daily special dish.  The description should be concise and entice customers to try the dish.

  Keywords: {{{keywords}}} `,
});

const generateDishDescriptionFlow = ai.defineFlow(
  {
    name: 'generateDishDescriptionFlow',
    inputSchema: GenerateDishDescriptionInputSchema,
    outputSchema: GenerateDishDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
