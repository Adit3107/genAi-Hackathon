'use client';
import { useState } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Briefcase, Loader2, ChevronRight, CheckCircle, Circle, Milestone as MilestoneIcon } from 'lucide-react';
import type { CareerPathOutput } from '@/ai/flows/generate-career-paths';
import { exploreCareerPathDetails, ExploreCareerPathDetailsOutput } from '@/ai/flows/explore-career-path-details';
import { useToast } from '@/hooks/use-toast';
import { Roadmap } from '../roadmap';
import { cn } from '@/lib/utils';

type CareerPathTreeProps = {
  data: CareerPathOutput;
  userSkills: string[];
};

export function CareerPathTree({ data, userSkills }: CareerPathTreeProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<ExploreCareerPathDetailsOutput | null>(null);
  const { toast } = useToast();

  const handlePathClick = async (careerPath: string) => {
    if (selectedPath === careerPath) {
        // If the same path is clicked again, you could choose to collapse it
        // setSelectedPath(null);
        // setRoadmap(null);
        return;
    }
    
    setIsLoading(true);
    setSelectedPath(careerPath);
    setRoadmap(null); // Clear previous roadmap
    try {
      const result = await exploreCareerPathDetails({ careerPath, userSkills });
      setRoadmap(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Exploring Path',
        description: 'Could not fetch the detailed roadmap. Please try again.',
      });
      setSelectedPath(null); // Deselect on error
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex h-full">
      {/* Sidebar - 20% */}
      <aside className="w-[20%] border-r border-border p-6 overflow-y-auto">
        <h2 className="text-xl font-bold font-headline mb-4">Suggested Paths</h2>
        <div className="space-y-4">
          {data.careerPaths.map((path) => (
            <Card 
              key={path.title} 
              onClick={() => handlePathClick(path.title)}
              className={cn(
                "cursor-pointer hover:shadow-primary/20 transition-shadow",
                selectedPath === path.title && "border-primary shadow-primary/20"
                )}
            >
              <CardHeader>
                <CardTitle className="text-base font-semibold">{path.title}</CardTitle>
                <CardDescription className="text-xs">{path.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </aside>

      {/* Main Content Area - 80% */}
      <main className="w-[80%] p-8 overflow-y-auto">
        {isLoading && (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )}

        {!isLoading && roadmap && (
           <div>
            <h2 className="text-2xl font-bold font-headline mb-2">{selectedPath}</h2>
            <p className="text-muted-foreground mb-8">Here is a step-by-step guide to help you achieve your career goals.</p>
            <Roadmap roadmap={roadmap.roadmap} />
           </div>
        )}

        {!isLoading && !roadmap && (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                    <Briefcase className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold font-headline">Select a Career Path</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                    Click on one of the suggested career paths on the left to see a detailed, step-by-step roadmap to success.
                </p>
            </div>
        )}
      </main>
    </div>
  );
}
