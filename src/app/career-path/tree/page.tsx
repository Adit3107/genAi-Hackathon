'use client';

import { CareerPathTree } from './career-path-tree';
import { useEffect, useState } from 'react';
import type { CareerPathOutput } from '@/ai/flows/generate-career-paths';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function TreePage() {
  const [careerData, setCareerData] = useState<CareerPathOutput | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('careerPathsResult');
    const skills = localStorage.getItem('userSkills');

    if (data && skills) {
      setCareerData(JSON.parse(data));
      setUserSkills(JSON.parse(skills));
    } else {
      // Redirect if no data is found, as this page depends on it
      router.replace('/career-path');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!careerData) {
    return null; // or a message indicating no data
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <CareerPathTree data={careerData} userSkills={userSkills} />
    </div>
  );
}
