
import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FallingCheeseBalls from '@/components/falling-cheese-balls';
import { AnimationProvider } from '@/contexts/AnimationContext';
import GtagProvider from '@/components/gtag-provider';
import React from 'react';

const siteUrl = 'https://drump.app';
const socialImageUrl = 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752804102/2_14_h30mkm.png';
const faviconUrl = 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Drump_Cheese_Ball_4_daedqc.png';
const siteDescription = 'First Snack on Solana';
const GA_MEASUREMENT_ID = 'G-MT3LG8V1N2';
const GTM_ID = 'GTM-P2MS4RNN';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&family=Solway:wght@400;700&display=swap" rel="stylesheet" />
        
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* End Google Tag Manager */}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="font-body antialiased relative">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <AnimationProvider>
           <React.Suspense>
              <GtagProvider>
                <FallingCheeseBalls />
                {children}
              </GtagProvider>
           </React.Suspense>
        </AnimationProvider>
        <Toaster />
      </body>
    </html>
  );
}
