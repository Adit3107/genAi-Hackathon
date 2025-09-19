'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';
import React from 'react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  headline: z.string().optional(),
  skills: z.string().min(3, 'Please list at least one skill.'),
  experience: z.string().min(10, 'Please describe your experience.'),
  education: z.string().min(10, 'Please describe your education.'),
});

export function ProfileForm() {
  const { toast } = useToast();
  const [fileName, setFileName] = React.useState('');

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      headline: '',
      skills: '',
      experience: '',
      education: '',
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast({
      title: 'Profile Updated',
      description: 'Your professional profile has been saved successfully.',
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast({
        title: 'Resume Uploaded',
        description: `${file.name} is ready for parsing. (Frontend only demo)`,
      });
      // In a real app, you would send this file to the backend for parsing.
      // The backend would return the parsed data to pre-fill the form.
      // For now, we just show the file name.
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Upload your resume to autofill or enter details manually.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="mb-6">
          <FormLabel>Upload Resume</FormLabel>
          <div className="mt-2 flex items-center justify-center w-full">
            <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-secondary">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX (MAX. 5MB)</p>
              </div>
              <input id="resume-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            </label>
          </div>
          {fileName && (
              <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground bg-secondary p-3 rounded-md">
                <FileText className="w-4 h-4 mr-2"/>
                <span>{fileName}</span>
              </div>
            )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Software Engineer at Tech Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your skills, separated by commas (e.g., TypeScript, React, Project Management)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will help us find the best career paths for you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your work experience..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your educational background..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full md:w-auto">Save Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
