'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
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

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#products', label: 'Products' },
        { href: '#contact-us', label: 'Contact Us' },
    ];

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24 border-b-2 border-white">
                    <DrumpLogo />
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-white/90 hover:text-white transition-colors duration-300 font-medium text-sm">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-700">Order Now</Button>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-background/90 backdrop-blur-sm pb-4">
                    <nav className="flex flex-col items-center space-y-4 pt-4">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-foreground hover:text-secondary transition-colors duration-300 font-medium" onClick={() => setIsOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-700">Order Now</Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
