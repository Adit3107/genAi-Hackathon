import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Horizon',
  description: 'Your personalized career tracker and skill advisor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3B82F633,transparent)]"></div>
                <div className="absolute right-[-5%] top-[20%] h-[800px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#EC489933,transparent)]"></div>
            </div>
            {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
