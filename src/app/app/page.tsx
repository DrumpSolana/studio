
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import { useAnimation } from '@/contexts/AnimationContext';
import PreOrderModal from '@/components/pre-order-modal';
import ContactModal from '@/components/contact-modal';
import { logGtagEvent } from '@/lib/gtag';

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
    const { isAnimating, toggleAnimation } = useAnimation();

    const navLinks = [
        { href: '#snack-stack-swap-it', label: 'About' },
        { href: '#ingredients', label: 'Ingredients' },
    ];

    const handleNavLinkClick = (label: string) => {
        logGtagEvent('nav_link_click', {
            location: 'header',
            link_label: label,
        });
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="container mx-auto px-8 sm:px-12 lg:px-16">
                <div className="flex items-center justify-between h-24 border-b-2 border-white">
                    <DrumpLogo />
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-white/90 hover:text-white transition-colors duration-300 font-medium text-sm group" onClick={() => handleNavLinkClick(link.label)}>
                                    {link.label}
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary"></span>
                                 </Link>
                            ))}
                            <ContactModal />
                        </nav>
                         <Button variant="ghost" size="icon" onClick={toggleAnimation} className="text-white hover:bg-white/10 hover:text-white">
                            {isAnimating ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            <span className="sr-only">{isAnimating ? 'Pause animation' : 'Play animation'}</span>
                        </Button>
                        <PreOrderModal location="header" />
                    </div>
                    <div className="md:hidden flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={toggleAnimation} className="text-white hover:bg-white/10 hover:text-white">
                            {isAnimating ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                            <span className="sr-only">{isAnimating ? 'Pause animation' : 'Play animation'}</span>
                        </Button>
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
                            <Link key={link.href} href={link.href} className="text-foreground hover:text-secondary transition-colors duration-300 font-medium" onClick={() => { setIsOpen(false); handleNavLinkClick(link.label); }}>
                                {link.label}
                            </Link>
                        ))}
                         <ContactModal />
                        <div className="flex items-center gap-4">
                           <PreOrderModal location="header_mobile" />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
