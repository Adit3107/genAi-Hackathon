'use client';
import Link from 'next/link';
import { Briefcase, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      href: '#',
      label: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      href: '#',
      label: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      href: '#',
      label: 'GitHub',
      icon: <Github className="h-5 w-5" />,
    },
  ];

  const mainLinks = [
    {
      title: 'For You',
      links: [
        { href: '/jobs', label: 'Find Jobs' },
        { href: '/career-path', label: 'Plan Career Path' },
        { href: '/profile', label: 'Your Profile' },
      ],
    },
    {
      title: 'About',
      links: [
        { href: '#', label: 'About Horizon' },
        { href: '#', label: 'Contact Us' },
        { href: '#', label: 'Privacy Policy' },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-8 w-8 text-primary" />
              <Link href="/">
                <span className="font-bold font-headline text-2xl cursor-pointer">
                  Horizon
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Your personalized career tracker and skill advisor.
            </p>
          </div>
          {mainLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Horizon. All Rights Reserved.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
                {socialLinks.map(link => (
                    <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors" aria-label={link.label}>
                        {link.icon}
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
