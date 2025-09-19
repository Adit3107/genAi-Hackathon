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
import { SkillInput } from './skill-input';
import type { ParsedResume } from '@/ai/flows/parse-resume-flow';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';


const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  headline: z.string().optional(),
  skills: z.array(z.string()).min(1, 'Please list at least one skill.'),
  experience: z.string().min(10, 'Please describe your experience.'),
  education: z.string().min(10, 'Please describe your education.'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  parsedData: ParsedResume;
}

export function ProfileForm({ parsedData }: ProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: parsedData.fullName || '',
      email: parsedData.email || '',
      phone: parsedData.phone || '',
      headline: parsedData.headline || '',
      skills: parsedData.skills || [],
      experience: parsedData.experience || '',
      education: parsedData.education || '',
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSaving(true);
    console.log(values);

    // In a real app, you would save this to a database.
    // We'll simulate a save and then navigate.
    setTimeout(() => {
        // Store in local storage to persist between navigations for this demo
        localStorage.setItem('userProfile', JSON.stringify(values));
        
        toast({
            title: 'Profile Saved',
            description: 'Your professional profile has been saved successfully.',
        });
        setIsSaving(false);
        router.push('/profile/view');
    }, 1000);
  }
  
  return (
    <Card>
        <CardHeader>
            <CardTitle>Your Professional Profile</CardTitle>
            <CardDescription>Review and complete your AI-generated profile. The more accurate your profile, the better your recommendations will be.</CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

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
                    <SkillInput value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Add relevant skills to help us tailor your career path.
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
                      rows={8}
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
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
