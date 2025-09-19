
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logGtagEvent } from '@/lib/gtag';
import ContactModal from './contact-modal';

const DrumpLogo = () => (
    <Link href="/">
        <Image 
            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752616337/join_the_punch_1_i9twgu.png" 
            alt="Drump Logo"
            width={144}
            height={48}
            className="object-contain"
        />
    </Link>
);

const socialLinks = [
    { src: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752642254/Group_wlvy8u.png', href: 'https://t.me/drumpofficial', name: 'Telegram' },
    { src: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752642253/Group_1_ixqd33.png', href: 'https://x.com/DrumpSolana', name: 'X' },
];

const footerLinks = [
    { href: '#snack-stack-swap-it', label: 'About' },
    { href: '#ingredients', label: 'Product' },
];

const legalLinks = [
     { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms & Condition' },
    { href: '#', label: 'Copyright Policy' },
]

export default function Footer() {
    const handleSocialClick = (socialName: string) => {
        logGtagEvent('social_click', {
            location: 'footer',
            social_platform: socialName,
        });
    };

    const handleFooterLinkClick = (label: string) => {
        logGtagEvent('nav_link_click', {
            location: 'footer',
            link_label: label,
        });
    };

    const handleContactClick = () => {
         logGtagEvent('nav_link_click', {
            location: 'footer',
            link_label: 'Contact Us',
        });
    }

    return (
        <footer className="bg-secondary text-black font-solway border-t-4 border-b-4 border-black">
            <div className="container mx-auto px-8 sm:px-12 lg:px-32 py-12 text-center">
                <div className="flex flex-col items-center gap-6">
                    <DrumpLogo />
                    <nav className="flex items-center gap-8">
                        {footerLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="text-black hover:text-black/70 transition-colors font-bold" onClick={() => handleFooterLinkClick(link.label)}>
                                {link.label}
                            </Link>
                        ))}
                        <div onClick={handleContactClick}>
                            <ContactModal>
                               <button className="text-black hover:text-black/70 transition-colors font-bold">
                                    Contact Us
                                </button>
                            </ContactModal>
                        </div>
                    </nav>
                     <div className="flex items-center space-x-4">
                        {socialLinks.map((link) => (
                            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="bg-[#2C2CB1] text-white p-2 rounded-md hover:bg-[#2C2CB1]/80 transition-colors" aria-label={link.name} onClick={() => handleSocialClick(link.name)}>
                                <div className="relative h-6 w-6">
                                    <Image src={link.src} alt={link.name} fill style={{objectFit:"contain"}} />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        {legalLinks.map((link, index) => (
                           <React.Fragment key={link.label}>
                                <Link href={link.href} className="text-black/70 hover:text-black transition-colors" onClick={() => handleFooterLinkClick(link.label)}>
                                    {link.label}
                                </Link>
                                {index < legalLinks.length - 1 && <span>|</span>}
                           </React.Fragment>
                        ))}
                    </div>
                    <p className="text-sm text-black/70">
                        &copy; {new Date().getFullYear()} Drump. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
