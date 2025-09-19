'use client';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();
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
          <span className="font-bold font-headline text-lg">Horizon</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-medium transition-colors hover:text-foreground',
                pathname.startsWith(item.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Horizon. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
