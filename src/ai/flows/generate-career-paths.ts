'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized career paths based on user skills and experience.
 *
 * The flow takes user profile data as input and returns three career path suggestions.
 * Each suggestion includes a title and a brief description.  Clicking on the career path will display a tree-like structure
 * of milestones to reach the career.
 *
 * @exports generateCareerPaths - The main function to trigger the career path generation flow.
 * @exports CareerPathInput - The input type for the generateCareerPaths function.
 * @exports CareerPathOutput - The output type for the generateCareerPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerPathInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of the user current skills.'),
  experience: z
    .string()
    .describe('A description of the user experience.'),
  education: z
    .string()
    .describe('A description of the user education.'),
});
export type CareerPathInput = z.infer<typeof CareerPathInputSchema>;

const CareerPathOutputSchema = z.object({
  careerPaths: z.array(
    z.object({
      title: z.string().describe('The title of the career path.'),
      description: z.string().describe('A brief description of the career path.'),
    })
  ).describe('An array of three career path suggestions.'),
});
export type CareerPathOutput = z.infer<typeof CareerPathOutputSchema>;

export async function generateCareerPaths(input: CareerPathInput): Promise<CareerPathOutput> {
  return generateCareerPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerPathPrompt',
  input: {
    schema: CareerPathInputSchema,
  },
  output: {
    schema: CareerPathOutputSchema,
  },
  prompt: `You are a career advisor. A user will provide their skills, experience, and education. You will return three possible career paths for them.

Skills: {{skills}}
Experience: {{experience}}
Education: {{education}}

Return three diverse career paths that are suited to the user's background.  Make the career paths distinct from each other.
Each career path should include a title and a brief description.

Format the output as a JSON array of three objects, each with a title and description field:

[
  {
    "title": "Career Path 1 Title",
    "description": "Career Path 1 Description"
  },
  {
    "title": "Career Path 2 Title",
    "description": "Career Path 2 Description"
  },
  {
    "title": "Career Path 3 Title",
    "description": "Career Path 3 Description"
  }
]
`,
});

const generateCareerPathsFlow = ai.defineFlow(
  {
    name: 'generateCareerPathsFlow',
    inputSchema: CareerPathInputSchema,
    outputSchema: CareerPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
