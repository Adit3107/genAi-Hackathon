'use client';
import { useEffect, useState } from 'react';
import type { ProfileFormData } from '../profile-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, GraduationCap, Mail, Phone, User, Pin, Sparkles, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | string[] }) => {
    if (!value || value.length === 0) return null;
    return (
        <div className="grid grid-cols-3 gap-4 items-start py-3">
            <dt className="flex items-center text-sm font-medium text-muted-foreground">
                {icon}
                <span className="ml-2">{label}</span>
            </dt>
            <dd className="col-span-2 text-sm">
                {Array.isArray(value) ? (
                    <div className="flex flex-wrap gap-2">
                        {value.map(v => <Badge key={v} variant="secondary">{v}</Badge>)}
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap">{value}</div>
                )}
            </dd>
        </div>
    );
};

export default function ViewProfilePage() {
    const [profile, setProfile] = useState<ProfileFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            const data = localStorage.getItem('userProfile');
            if (data) {
                setProfile(JSON.parse(data));
            } else {
                // If no profile, send to creation page
                router.replace('/profile');
            }
        } catch (e) {
            console.error("Failed to load profile data", e);
            router.replace('/profile');
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
             <div className="container py-10 max-w-4xl mx-auto space-y-8">
                <Skeleton className="h-12 w-1/3" />
                <Card>
                    <CardHeader><Skeleton className="h-8 w-1/4" /></CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><Skeleton className="h-8 w-1/4" /></CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                </Card>
             </div>
        );
    }
    
    if (!profile) {
        // This will be brief as the redirect should kick in
        return null;
    }

  return (
    <div className="container py-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Your Professional Profile</h1>
            <Button variant="outline" onClick={() => router.push('/profile/edit')}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
            </Button>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                        <User className="mr-3 h-5 w-5 text-primary" />
                        Contact Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="divide-y">
                        <InfoRow icon={<User />} label="Full Name" value={profile.fullName} />
                        <InfoRow icon={<Mail />} label="Email" value={profile.email} />
                        <InfoRow icon={<Phone />} label="Phone" value={profile.phone} />
                        <InfoRow icon={<Pin />} label="Headline" value={profile.headline} />
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                        <Sparkles className="mr-3 h-5 w-5 text-primary" />
                        Skills
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map(skill => (
                            <Badge key={skill} variant="default" className="text-sm px-3 py-1">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                        <Briefcase className="mr-3 h-5 w-5 text-primary" />
                        Work Experience
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                        {profile.experience}
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                        <GraduationCap className="mr-3 h-5 w-5 text-primary" />
                        Education
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                        {profile.education}
                    </div>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
