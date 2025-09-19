'use client';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export function Footer() {
  const navItems = [
    { href: '/jobs', label: 'Jobs' },
    { href: '/career-path', label: 'Career Path' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30 mt-auto">
      <div className="container flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <Link href="/">
            <span className="font-bold font-headline text-lg cursor-pointer">Horizon</span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Horizon. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
