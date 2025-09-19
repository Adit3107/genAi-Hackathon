'use client';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobCard } from './job-card';
import { JOBS, LOCATIONS, EXPERIENCE_LEVELS, type Job } from '@/lib/dummy-data';
import { Search } from 'lucide-react';

export function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('all');
  const [experienceLevel, setExperienceLevel] = useState('all');
  
  // To avoid hydration mismatch, we load jobs on the client
  useEffect(() => {
    setJobs(JOBS);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchMatch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const locationMatch = location === 'all' || job.location === location;
      const experienceMatch =
        experienceLevel === 'all' || job.experienceLevel === experienceLevel;

      return searchMatch && locationMatch && experienceMatch;
    });
  }, [jobs, searchQuery, location, experienceLevel]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 border rounded-lg bg-card">
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title or skill..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={experienceLevel} onValueChange={setExperienceLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Experience Levels</SelectItem>
            {EXPERIENCE_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg">
          <h3 className="text-xl font-semibold">No Jobs Found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
}
