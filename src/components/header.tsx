'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const DrumpLogo = () => (
    <Link href="/" className="text-3xl font-bold text-accent font-headline">Drump.</Link>
);

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#ingredients', label: 'Ingredients' },
        { href: '#how-to', label: 'How To' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <DrumpLogo />
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="hidden md:block">
                        <Button>Buy Now</Button>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-background border-t border-border pb-4">
                    <nav className="flex flex-col items-center space-y-4 pt-4">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-foreground hover:text-primary transition-colors duration-300 font-medium" onClick={() => setIsOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                        <Button>Buy Now</Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
