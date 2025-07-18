import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FallingCheeseBalls from '@/components/falling-cheese-balls';
import { AnimationProvider } from '@/contexts/AnimationContext';

const siteUrl = 'https://drump.app';
const socialImageUrl = 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752804102/2_14_h30mkm.png';
const faviconUrl = 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Drump_Cheese_Ball_4_daedqc.png';
const siteDescription = 'First Snack on Solana';

export const metadata: Metadata = {
  title: 'Drump',
  description: siteDescription,
  icons: {
    icon: faviconUrl,
  },
  openGraph: {
    title: 'Drump',
    description: siteDescription,
    url: siteUrl,
    siteName: 'Drump',
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: 'Drump - First Snack on Solana',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drump',
    description: siteDescription,
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={faviconUrl} sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&family=Solway:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased relative">
        <AnimationProvider>
          <FallingCheeseBalls />
          {children}
        </AnimationProvider>
        <Toaster />
      </body>
    </html>
  );
}
