// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/contexts/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creative Digital Agency',
  description: 'Exceptional design, seamless collaboration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning // Add this
    >
      <body 
        className="min-h-full flex flex-col"
        suppressHydrationWarning // Add this
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}