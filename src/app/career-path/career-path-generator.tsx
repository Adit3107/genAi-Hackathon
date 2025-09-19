'use client';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateCareerPaths } from '@/ai/flows/generate-career-paths';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


const careerFormSchema = z.object({
  skills: z.string().min(3, 'Please list at least one skill.'),
  experience: z.string().min(10, 'Please describe your experience.'),
  education: z.string().min(10, 'Please describe your education.'),
});

export function CareerPathGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof careerFormSchema>>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: { skills: '', experience: '', education: '' },
  });

  const onSubmit = async (values: z.infer<typeof careerFormSchema>) => {
    setIsLoading(true);

    try {
      const skillsArray = values.skills.split(',').map(s => s.trim()).filter(Boolean);
      const result = await generateCareerPaths({ ...values, skills: skillsArray });
      
      // Store result in localStorage to be read by the tree view page
      localStorage.setItem('careerPathsResult', JSON.stringify(result));
      localStorage.setItem('userSkills', JSON.stringify(skillsArray));

      router.push('/career-path/tree');

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Paths',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Career Inputs</CardTitle>
          <CardDescription>The more details you provide, the better the recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., TypeScript, React, Project Management" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Experience</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your work experience..." rows={4} {...field} />
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
                    <FormLabel>Your Education</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your educational background..." rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Paths
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
