'use client';
import { CheckCircle, Circle, Milestone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ExploreCareerPathDetailsOutput } from '@/ai/flows/explore-career-path-details';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type RoadmapProps = {
  roadmap: ExploreCareerPathDetailsOutput['roadmap'];
};

export function Roadmap({ roadmap }: RoadmapProps) {
  // Open all milestones by default
  const defaultOpenMilestones = roadmap.map(m => m.title);

  return (
    <Accordion type="multiple" defaultValue={defaultOpenMilestones}>
      <div className="space-y-8">
        {roadmap.map((milestone, milestoneIndex) => (
          <AccordionItem value={milestone.title} key={milestone.title} className="border-b-0">
            <div className="relative pl-8">
              {/* Vertical line connecting milestones */}
              {milestoneIndex < roadmap.length - 1 && (
                <div className="absolute left-4 top-4 -bottom-4 w-0.5 bg-border" />
              )}

              {/* Milestone Icon */}
              <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Milestone className="h-5 w-5" />
              </div>
              
              <AccordionTrigger className="mb-4 text-xl font-bold font-headline text-primary hover:no-underline">
                 {milestone.title}
              </AccordionTrigger>

              <AccordionContent>
                <div className="space-y-6">
                  {milestone.steps.map((step) => (
                    <div key={step.title} className="relative pl-8">
                      {/* Connector line from milestone to step */}
                      <div className="absolute -left-4 top-4 h-0.5 w-12 bg-border" />
                      
                      {/* Step Icon */}
                      <div className="absolute left-0 top-0">
                        {step.isCompleted ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                          <Circle className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>

                      <Card
                        className={cn(
                          'transition-all',
                          step.isCompleted
                            ? 'bg-card/50 border-green-500/30'
                            : 'bg-card'
                        )}
                      >
                        <CardHeader>
                          <CardTitle
                            className={cn(
                              'text-base font-semibold',
                              step.isCompleted && 'text-muted-foreground line-through'
                            )}
                          >
                            {step.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </div>
    </Accordion>
  );
}
