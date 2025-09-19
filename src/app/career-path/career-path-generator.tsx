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
import { generateCareerPaths, type CareerPathOutput } from '@/ai/flows/generate-career-paths';
import { exploreCareerPathDetails, type ExploreCareerPathDetailsOutput } from '@/ai/flows/explore-career-path-details';
import { Loader2, Lightbulb, Zap, LineChart } from 'lucide-react';
import { Roadmap } from './roadmap';


const careerFormSchema = z.object({
  skills: z.string().min(3, 'Please list at least one skill.'),
  experience: z.string().min(10, 'Please describe your experience.'),
  education: z.string().min(10, 'Please describe your education.'),
});

export function CareerPathGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [careerPaths, setCareerPaths] = useState<CareerPathOutput | null>(null);
  const [pathDetails, setPathDetails] = useState<ExploreCareerPathDetailsOutput | null>(null);
  const [activePath, setActivePath] = useState<string | null>(null);

  const form = useForm<z.infer<typeof careerFormSchema>>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: { skills: '', experience: '', education: '' },
  });

  const onSubmit = async (values: z.infer<typeof careerFormSchema>) => {
    setIsLoading(true);
    setCareerPaths(null);
    setPathDetails(null);
    setActivePath(null);

    try {
      const skillsArray = values.skills.split(',').map(s => s.trim()).filter(Boolean);
      const result = await generateCareerPaths({ ...values, skills: skillsArray });
      setCareerPaths(result);
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

  const onPathClick = async (title: string) => {
    // If the user clicks the same path again, hide the details
    if (activePath === title) {
        setActivePath(null);
        setPathDetails(null);
        return;
    }
    
    setActivePath(title);
    setIsDetailsLoading(true);
    setPathDetails(null);

    try {
        const skills = form.getValues('skills').split(',').map(s => s.trim()).filter(Boolean);
        const result = await exploreCareerPathDetails({ careerPath: title, userSkills: skills });
        setPathDetails(result);
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Error Fetching Details',
            description: 'Could not load details for this career path.',
        });
    } finally {
        setIsDetailsLoading(false);
    }
  };
  
  const ICONS = [<Lightbulb />, <Zap />, <LineChart />];

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

      {careerPaths && (
        <div>
            <h2 className="text-2xl font-bold font-headline text-center mb-8">Your Suggested Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerPaths.careerPaths.map((path, index) => (
                <Card 
                    key={path.title} 
                    className="cursor-pointer hover:shadow-accent/20 hover:shadow-lg transition-all" 
                    onClick={() => onPathClick(path.title)}
                    data-active={activePath === path.title}
                >
                    <CardHeader className='flex-row items-center gap-4'>
                        <span className="p-3 bg-accent/20 rounded-lg text-accent">{ICONS[index % ICONS.length]}</span>
                        <div>
                            <CardTitle className="font-headline text-lg">{path.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                    </CardContent>
                </Card>
            ))}
            </div>
        </div>
      )}

      {activePath && (
        <div className="mt-8">
            <h2 className="text-2xl font-bold font-headline text-center mb-4">Roadmap for: <span className="text-primary">{activePath}</span></h2>
            {isDetailsLoading && (
                <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">Building your roadmap...</p>
                </div>
            )}
            {pathDetails && pathDetails.roadmap && (
                <Roadmap roadmap={pathDetails.roadmap} />
            )}
        </div>
      )}
    </div>
  );
}
