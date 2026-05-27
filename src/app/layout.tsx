import type { Metadata } from 'next';
import { Josefin_Slab, Alegreya_Sans } from 'next/font/google';
import './globals.css';

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
  title: 'Anil Bronson',
  description: 'Production Services Technician & Software Engineer — Sony Pictures Imageworks',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${josefinSlab.variable} ${alegreyaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
