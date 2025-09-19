'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitMerge, Briefcase, ChevronRight } from 'lucide-react';
import type { CareerPathOutput } from '@/ai/flows/generate-career-paths';

type CareerPathTreeProps = {
  data: CareerPathOutput;
  userSkills: string[];
};

export function CareerPathTree({ data }: CareerPathTreeProps) {
  // For now, we will just display the three root career paths
  // and lay the groundwork for the tree structure.
  
  return (
    <div className="flex h-full">
      {/* Sidebar - 30% */}
      <aside className="w-[30%] border-r border-border p-6 overflow-y-auto">
        <h2 className="text-xl font-bold font-headline mb-4">Suggested Paths</h2>
        <div className="space-y-4">
          {data.careerPaths.map((path) => (
            <Card key={path.title} className="cursor-pointer hover:shadow-primary/20 transition-shadow">
              <CardHeader>
                <CardTitle className="text-base font-semibold">{path.title}</CardTitle>
                <CardDescription className="text-xs">{path.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </aside>

      {/* Tree View - 70% */}
      <main className="w-[70%] p-8 overflow-y-auto">
        <div className="flex justify-center">
          <div className="space-y-16 flex flex-col items-center">
            {/* Root Node */}
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                    <Briefcase className="h-8 w-8" />
                </div>
                <div className="mt-2 text-lg font-bold">Your Profile</div>
            </div>

            {/* Main Branches */}
            <div className="relative flex justify-center items-start">
                 {/* Lines connecting root to branches */}
                <div className="absolute top-[-4rem] h-16 w-0.5 bg-border z-0"></div>
                <div className="absolute top-[-0.5px] h-0.5 w-full bg-border z-0"></div>

                <div className="flex justify-around w-[60vw] gap-8">
                    {data.careerPaths.map((path, index) => (
                        <div key={path.title} className="relative flex flex-col items-center pt-16 text-center">
                            {/* Line from horizontal bar to node */}
                            <div className="absolute top-0 h-16 w-0.5 bg-border"></div>

                            <Button variant="outline" size="lg" className="h-auto py-4 px-6 rounded-lg shadow-lg relative bg-card">
                                <div className="flex flex-col items-center">
                                    <GitMerge className="h-6 w-6 mb-2 text-accent" />
                                    <span className="font-semibold text-base">{path.title}</span>
                                </div>
                                <ChevronRight className="absolute right-4 h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
