'use server';
/**
 * @fileOverview This file defines a Genkit flow for exploring detailed career path information.
 *
 * - exploreCareerPathDetails - A function that takes a career path as input and returns a detailed breakdown.
 * - ExploreCareerPathDetailsInput - The input type for the exploreCareerPathDetails function.
 * - ExploreCareerPathDetailsOutput - The return type for the exploreCareerPathDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExploreCareerPathDetailsInputSchema = z.object({
  careerPath: z.string().describe('The name of the career path to explore.'),
  userSkills: z.array(z.string()).describe('The current skills of the user.'),
});
export type ExploreCareerPathDetailsInput = z.infer<
  typeof ExploreCareerPathDetailsInputSchema
>;

const ExploreCareerPathDetailsOutputSchema = z.object({
  careerPathDetails: z
    .string()
    .describe('A detailed, tree-like structure of the career path.'),
});
export type ExploreCareerPathDetailsOutput = z.infer<
  typeof ExploreCareerPathDetailsOutputSchema
>;

export async function exploreCareerPathDetails(
  input: ExploreCareerPathDetailsInput
): Promise<ExploreCareerPathDetailsOutput> {
  return exploreCareerPathDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'exploreCareerPathDetailsPrompt',
  input: {schema: ExploreCareerPathDetailsInputSchema},
  output: {schema: ExploreCareerPathDetailsOutputSchema},
  prompt: `You are an expert career advisor. A user is interested in the following career path: {{{careerPath}}}.

  The user currently has the following skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}\n{{/each}}{{else}}None{{/if}}.

  Provide a detailed, tree-like structure outlining the skills, experience, and education needed to progress along that path.
  Consider the user's existing skills when suggesting the path. Lay out all the steps required to get there, including advanced skill levels, internships, and specific educational requirements.
  Be specific and actionable.`,
});

const exploreCareerPathDetailsFlow = ai.defineFlow(
  {
    name: 'exploreCareerPathDetailsFlow',
    inputSchema: ExploreCareerPathDetailsInputSchema,
    outputSchema: ExploreCareerPathDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
