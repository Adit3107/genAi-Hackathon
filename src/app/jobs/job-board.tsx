'use client';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { JobCard } from './job-card';
import { JOBS, LOCATIONS, EXPERIENCE_LEVELS, DEGREES, type Job } from '@/lib/dummy-data';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

  useEffect(() => {
    setJobs(JOBS);
  }, []);
  
  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchMatch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(job.location);
      const experienceMatch = selectedExperience.length === 0 || selectedExperience.includes(job.experienceLevel);
      const degreeMatch = selectedDegrees.length === 0 || (job.degree && selectedDegrees.includes(job.degree));

      return searchMatch && locationMatch && experienceMatch && degreeMatch;
    });
  }, [jobs, searchQuery, selectedLocations, selectedExperience, selectedDegrees]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocations([]);
    setSelectedExperience([]);
    setSelectedDegrees([]);
  };

  const FilterCheckbox = ({ id, label, checked, onCheckedChange }: { id: string, label: string, checked: boolean, onCheckedChange: () => void }) => (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </Label>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <aside className="md:col-span-1">
        <div className="sticky top-24">
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-lg font-semibold flex items-center">
                    <SlidersHorizontal className="mr-2 h-5 w-5" />
                    Filters
                </h2>
                <Button variant="link" onClick={clearFilters} className="p-0 h-auto">Clear filters</Button>
            </div>
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="What do you want to do?"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Accordion type="multiple" defaultValue={['location', 'experience', 'degree']} className="w-full">
              <AccordionItem value="location">
                <AccordionTrigger>Locations</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {LOCATIONS.map((loc) => (
                    <FilterCheckbox
                      key={loc}
                      id={`loc-${loc}`}
                      label={loc}
                      checked={selectedLocations.includes(loc)}
                      onCheckedChange={() => handleFilterChange(setSelectedLocations, loc)}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="experience">
                <AccordionTrigger>Experience</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <FilterCheckbox
                      key={level}
                      id={`exp-${level}`}
                      label={level}
                      checked={selectedExperience.includes(level)}
                      onCheckedChange={() => handleFilterChange(setSelectedExperience, level)}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="degree">
                <AccordionTrigger>Degree</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {DEGREES.map((degree) => (
                    <FilterCheckbox
                      key={degree}
                      id={`deg-${degree}`}
                      label={degree}
                      checked={selectedDegrees.includes(degree)}
                      onCheckedChange={() => handleFilterChange(setSelectedDegrees, degree)}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </aside>

      {/* Job Listings */}
      <main className="md:col-span-3">
        <div className="mb-4">
            <p className="font-semibold text-primary">{filteredJobs.length} jobs matched</p>
        </div>
        {filteredJobs.length > 0 ? (
          <div className="space-y-6">
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
      </main>
    </div>
  );
}
