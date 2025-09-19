import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'home-hero');

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter">
            Navigate Your Career Path with{' '}
            <span className="text-primary">Confidence</span>
          </h1>
          <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground">
            CareerCompass helps you understand your skills, discover new
            opportunities, and build a personalized roadmap to your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg">
              <Link href="/career-path">
                Find Your Path <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/jobs">Explore Jobs</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={600}
              height={400}
              className="rounded-xl shadow-2xl aspect-[3/2] object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </div>
      </section>
    </div>
  );
}
