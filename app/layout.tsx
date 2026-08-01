import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const yatraOne = localFont({
  src: '../Yatra_One/YatraOne-Regular.ttf',
  variable: '--font-yatra-one',
  display: 'swap',
});

const cormorantGaramond = localFont({
  src: '../Cormorant_Garamond/CormorantGaramond-VariableFont_wght.ttf',
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diksha Damahe',
  description:
    'AI/ML engineer and full-stack developer. Explore my work through an interactive monsoon world.',
};

export const viewport: Viewport = {
  themeColor: '#B4C7D9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${yatraOne.variable} ${cormorantGaramond.variable}`}>
      <body className={cormorantGaramond.className}>{children}</body>
    </html>
  );
}
