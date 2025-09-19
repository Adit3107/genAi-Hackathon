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
import { MapPin, Briefcase, Bookmark, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
                <CardDescription className="font-semibold text-primary pt-1">{job.company}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                </Button>
            </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground pt-2 gap-4">
            <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
            </div>
            <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>{job.experienceLevel}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <h4 className="font-semibold mb-2">Minimum qualifications:</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>{job.degree} or equivalent practical experience.</li>
            <li>{job.description}</li>
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
            {job.skills.slice(0, 4).map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
            {job.skills.length > 4 && <Badge variant="outline">+{job.skills.length-4}</Badge>}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">
            Learn more
        </Button>
      </CardFooter>
    </Card>
  );
}
