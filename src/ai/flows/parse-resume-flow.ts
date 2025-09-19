'use server';
/**
 * @fileOverview This file defines a Genkit flow for parsing a user's resume and extracting key professional information.
 *
 * - parseResume - A function that takes a resume file and other details to return structured profile data.
 * - ParseResumeInput - The input type for the parseResume function.
 * - ParsedResume - The output type (the structured profile data).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fullName: z.string().optional().describe('The full name of the user, if provided separately.'),
  mobileNumber: z.string().optional().describe('The mobile number of the user, if provided separately.'),
});
export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;


const ParsedResumeSchema = z.object({
  fullName: z.string().describe("The user's full name."),
  email: z.string().describe("The user's primary email address."),
  phone: z.string().describe("The user's primary phone number.").optional(),
  headline: z.string().describe("A professional headline summarizing the user's role (e.g., 'Senior Software Engineer')."),
  skills: z.array(z.string()).describe("A list of the user's professional skills."),
  experience: z.string().describe("A summary of the user's work experience, formatted with clear job titles, companies, and dates."),
  education: z.string().describe("A summary of the user's educational background, including degrees and institutions."),
});
export type ParsedResume = z.infer<typeof ParsedResumeSchema>;


export async function parseResume(input: ParseResumeInput): Promise<ParsedResume> {
  return parseResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeParserPrompt',
  input: {schema: ParseResumeInputSchema},
  output: {schema: ParsedResumeSchema},
  prompt: `You are an expert resume parser. Your task is to extract structured information from the provided document.

You are given a resume file and potentially a separate full name and mobile number.
- Prioritize the separately provided 'fullName' and 'mobileNumber' if they exist, as they are likely more accurate.
- If they are not provided, extract them from the resume text.
- Extract all other fields (email, headline, skills, experience, education) from the resume.
- For 'experience' and 'education', summarize them neatly but keep all essential information like job titles, company names, dates, degrees, and institutions. Preserve the formatting like bullet points from the original resume.
- For 'skills', extract a list of individual skills. Do not include descriptions, just the skill names.

Resume: {{media url=resumeDataUri}}

{{#if fullName}}
Pre-filled Full Name: {{{fullName}}}
{{/if}}

{{#if mobileNumber}}
Pre-filled Mobile Number: {{{mobileNumber}}}
{{/if}}

Extract the information and return it as a JSON object matching the prescribed output schema.`,
});

const parseResumeFlow = ai.defineFlow(
  {
    name: 'parseResumeFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParsedResumeSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
