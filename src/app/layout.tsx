import type { Metadata } from 'next';
import { Josefin_Slab, Alegreya_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

const josefinSlab = Josefin_Slab({
  weight: ['100', '200', '300', '400'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const alegreyaSans = Alegreya_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Anil Bronson — Portfolio',
  description: 'Production Services Technician at Sony Pictures Imageworks. Pipeline automation, render farm management, and full-stack development.',
  keywords: ['Anil Bronson', 'Sony Pictures Imageworks', 'Production Services', 'Pipeline', 'VFX', 'Software Engineer', 'Vancouver'],
  authors: [{ name: 'Anil Bronson' }],
  openGraph: {
    title: 'Anil Bronson — Portfolio',
    description: 'Production Services Technician at Sony Pictures Imageworks. Pipeline automation, render farm management, and full-stack development.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anil Bronson — Portfolio',
    description: 'Production Services Technician at Sony Pictures Imageworks.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${josefinSlab.variable} ${alegreyaSans.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
