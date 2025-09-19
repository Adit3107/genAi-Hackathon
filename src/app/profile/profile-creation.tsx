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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText, Loader2, User, Phone } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { parseResume, type ParsedResume } from '@/ai/flows/parse-resume-flow';

const profileCreationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  mobileNumber: z.string().optional(),
  resume: z.instanceof(File).optional(),
});

type ProfileCreationValues = z.infer<typeof profileCreationSchema>;

function fileToDataURI(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ProfileCreation() {
  const { toast } = useToast();
  const router = useRouter();
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'home-hero');

  const form = useForm<ProfileCreationValues>({
    resolver: zodResolver(profileCreationSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
    },
  });

  const onSubmit = async (values: ProfileCreationValues) => {
    setIsLoading(true);

    if (!values.resume) {
      // If no resume, create a minimal profile and go to edit page
      const minimalProfile: ParsedResume = {
        fullName: values.fullName,
        email: '',
        phone: values.mobileNumber || '',
        headline: '',
        skills: [],
        experience: '',
        education: '',
      };
      localStorage.setItem('parsedResume', JSON.stringify(minimalProfile));
      router.push('/profile/edit');
      return;
    }

    try {
      const resumeDataUri = await fileToDataURI(values.resume);
      const parsedData = await parseResume({
        resumeDataUri: resumeDataUri,
        fullName: values.fullName,
        mobileNumber: values.mobileNumber,
       });

       // Store the parsed data to be picked up by the edit page
       localStorage.setItem('parsedResume', JSON.stringify(parsedData));

       toast({
        title: 'Resume Parsed!',
        description: "We've extracted your details. Please review them.",
      });

      router.push('/profile/edit');

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Parsing Failed',
        description: 'We couldn\'t parse your resume. Please try again or fill out the form manually.',
      });
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue('resume', file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="hidden md:flex justify-center items-center flex-col text-center px-8">
            {heroImage && (
                <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={400}
                height={400}
                className="rounded-full shadow-2xl aspect-square object-cover"
                data-ai-hint={heroImage.imageHint}
                />
            )}
            <h2 className="text-2xl font-bold font-headline mt-6">Unlock Your Career Potential</h2>
            <p className="text-muted-foreground mt-2">Just a few details to get started. Let our AI build your professional profile in seconds.</p>
        </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            Provide your name and resume to get started. We'll handle the rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="What's your name?" className="pl-10" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number (Optional)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Your contact number" className="pl-10" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume"
                render={() => (
                    <FormItem>
                        <FormLabel>Upload Resume</FormLabel>
                        <div className="mt-2 flex items-center justify-center w-full">
                        <label
                            htmlFor="resume-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-secondary transition-colors"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PDF, DOCX (MAX. 5MB)</p>
                            </div>
                            <input
                                id="resume-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                            />
                        </label>
                        </div>
                        {fileName && (
                        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground bg-secondary p-3 rounded-md">
                            <FileText className="w-4 h-4 mr-2" />
                            <span>{fileName}</span>
                        </div>
                        )}
                    </FormItem>
                )}
                />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Parsing Your Resume...' : 'Create My Profile'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
