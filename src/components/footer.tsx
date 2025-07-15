import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const DrumpLogo = () => (
    <Link href="/" className="text-3xl font-bold text-accent font-headline">Drump.</Link>
);

export default function Footer() {
    const socialLinks = [
        { icon: <Twitter className="h-5 w-5" />, href: '#', name: 'Twitter' },
        { icon: <Instagram className="h-5 w-5" />, href: '#', name: 'Instagram' },
        { icon: <Facebook className="h-5 w-5" />, href: '#', name: 'Facebook' },
    ];
    return (
        <footer className="bg-background border-t border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <DrumpLogo />
                    <p className="text-sm text-muted-foreground order-last md:order-none">
                        &copy; {new Date().getFullYear()} Drump Snacks. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4">
                        {socialLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors" aria-label={link.name}>
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
