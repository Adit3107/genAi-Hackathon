'use client';
import { ProfileForm } from '../profile-form';
import { useEffect, useState } from 'react';
import type { ParsedResume } from '@/ai/flows/parse-resume-flow';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProfilePage() {
    const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const data = localStorage.getItem('parsedResume');
            if (data) {
                setParsedData(JSON.parse(data));
            } else {
                // If no data, maybe redirect or show a message
                setError("No profile data found. Please start over.");
            }
        } catch (e) {
            console.error("Failed to parse profile data from storage", e);
            setError("Could not load profile data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="container py-10 max-w-3xl mx-auto">
                <div className="space-y-8">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-8 w-3/4" />
                    <div className="space-y-6">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        );
    }
    
    if (error || !parsedData) {
        return (
            <div className="container py-10 text-center">
                <h2 className="text-xl font-semibold text-destructive">{error || "Could not load profile."}</h2>
            </div>
        )
    }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <ProfileForm parsedData={parsedData} />
      </div>
    </div>
  );
}
