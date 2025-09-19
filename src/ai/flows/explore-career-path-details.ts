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

const MilestoneStepSchema = z.object({
  title: z.string().describe('The title of this roadmap step.'),
  description: z.string().describe('A description of this step.'),
  isCompleted: z.boolean().describe('Whether the user has already completed this step based on their skills.')
});

const MilestoneSchema = z.object({
    title: z.string().describe('The title of the milestone, e.g., "Foundational Skills", "Intermediate Level", "Advanced Specialization".'),
    steps: z.array(MilestoneStepSchema).describe('A list of concrete steps within this milestone.')
});


const ExploreCareerPathDetailsOutputSchema = z.object({
    roadmap: z.array(MilestoneSchema).describe('A structured, step-by-step roadmap for the career path.'),
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

  The user's current skills are:
  {{#if userSkills}}
  {{#each userSkills}}
  - {{{this}}}
  {{/each}}
  {{else}}
  The user has not listed any skills.
  {{/if}}

  Your task is to generate a structured, step-by-step roadmap to guide the user towards this career. The roadmap should be broken down into logical milestones (e.g., "Foundational Skills", "Intermediate Level", "Advanced Specialization").

  For each step within a milestone, you must determine if the user's current skills suggest that they have already completed it. Set the 'isCompleted' flag to true if their skills (like "React", "Node.js", "Figma", "Project Management") directly match the skill required for a step. Be strict in your matching; only mark as completed if the skill is a clear and direct match. For soft skills or experience-based steps, you can infer completion if their profile suggests it.

  Structure the output as a JSON object containing a 'roadmap' array, where each element is a milestone object. Each milestone should have a 'title' and a 'steps' array. Each step object must include a 'title', a 'description', and the 'isCompleted' boolean flag.`,
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
