import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DrumpLogo = () => (
    <Link href="/">
        <Image 
            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752616337/join_the_punch_1_i9twgu.png" 
            alt="Drump Logo"
            width={180}
            height={60}
            className="object-contain"
        />
    </Link>
);

const socialLinks = [
    { src: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752642243/Vector_i7hrow.png', href: '#', name: 'Discord' },
    { src: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752642254/Group_wlvy8u.png', href: '#', name: 'Telegram' },
    { src: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752642253/Group_1_ixqd33.png', href: '#', name: 'X' },
];

const footerLinks = [
    { href: '#', label: 'About' },
    { href: '#', label: 'Product' },
    { href: '#', label: 'Contact' },
];

const legalLinks = [
     { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms & Condition' },
    { href: '#', label: 'Copyright Policy' },
]

export default function Footer() {
    return (
        <footer className="bg-secondary text-black font-solway">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="flex flex-col items-center gap-6">
                    <DrumpLogo />
                    <nav className="flex items-center gap-8">
                        {footerLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="text-black hover:text-black/70 transition-colors font-bold">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                     <div className="flex items-center space-x-4">
                        {socialLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="bg-black text-white p-2 rounded-md hover:bg-black/80 transition-colors" aria-label={link.name}>
                                <div className="relative h-6 w-6">
                                    <Image src={link.src} alt={link.name} fill objectFit="contain" />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        {legalLinks.map((link, index) => (
                           <React.Fragment key={link.label}>
                                <Link href={link.href} className="text-black/70 hover:text-black transition-colors">
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
