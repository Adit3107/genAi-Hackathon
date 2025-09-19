import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/dummy-data';
import { MapPin, Briefcase, Zap, ArrowRight } from 'lucide-react';

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
        <CardDescription className="font-semibold text-primary">{job.company}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>{job.type} - {job.experienceLevel} Level</span>
        </div>
        <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
            {job.skills.length > 3 && <Badge variant="outline">+{job.skills.length-3}</Badge>}
        </div>
        <p className="text-sm text-muted-foreground pt-2">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent hover:bg-accent/90">
            Apply Now
            <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
