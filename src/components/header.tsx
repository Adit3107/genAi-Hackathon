'use client';
import Link from 'next/link';
import { Briefcase, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/jobs', label: 'Jobs' },
    { href: '/career-path', label: 'Career Path' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">Horizon</span>
        </Link>

        {/* Desktop Nav */}
        <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm">
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

             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Nav */}
            <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                    <Link
                    href="/"
                    className="flex items-center gap-2 mb-4"
                    onClick={() => setIsOpen(false)}
                    >
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">
                        Horizon
                    </span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            'text-lg font-medium transition-colors hover:text-foreground',
                            pathname.startsWith(item.href)
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        )}
                        >
                        {item.label}
                        </Link>
                    ))}
                    </nav>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
