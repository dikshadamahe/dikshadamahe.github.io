import type { Metadata, Viewport } from 'next';
import { Architects_Daughter, Inter } from 'next/font/google';
import './globals.css';

const architects = Architects_Daughter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-architects',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diksha Damahe — Portfolio Vol. 1',
  description:
    'A sketchbook portfolio by Diksha Damahe. AI/ML engineer and full-stack developer.',
};

export const viewport: Viewport = {
  themeColor: '#f4f4f0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${architects.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
