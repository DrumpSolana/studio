import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

const DrumpLogo = () => (
    <Link href="/">
        <Image 
            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752616337/join_the_punch_1_i9twgu.png" 
            alt="Drump Logo"
            width={120}
            height={40}
            className="object-contain"
        />
    </Link>
);

export default function Footer() {
    const socialLinks = [
        { icon: <Twitter className="h-6 w-6" />, href: '#', name: 'Twitter' },
        { icon: <Instagram className="h-6 w-6" />, href: '#', name: 'Instagram' },
        { icon: <Facebook className="h-6 w-6" />, href: '#', name: 'Facebook' },
    ];
    return (
        <footer className="bg-background border-t-2 border-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <DrumpLogo />
                    <p className="text-sm text-white/80 order-last md:order-none font-solway">
                        &copy; {new Date().getFullYear()} Drump Snacks. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        {socialLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-white hover:text-primary transition-colors" aria-label={link.name}>
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
