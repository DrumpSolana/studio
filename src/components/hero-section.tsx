import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="pt-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6 text-center md:text-left">
                        <h1 className="text-5xl md:text-7xl font-bold font-headline text-accent leading-tight">
                            The Snack That Smiles Back. But Bigger.
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Drump is the cheesy, crunchy, and oh-so-satisfying snack you've been dreaming of. Made with real ingredients for a guilt-free crunch time, anytime.
                        </p>
                        <Button size="lg" asChild>
                           <a href="#taste">
                            Get Your Drump On <ArrowRight className="ml-2" />
                           </a>
                        </Button>
                    </div>
                    <div className="relative h-96 w-full flex items-center justify-center">
                         <Image
                            src="https://placehold.co/500x500.png"
                            alt="Drump product bag"
                            width={450}
                            height={450}
                            className="absolute drop-shadow-2xl -translate-x-1/4 -translate-y-1/4 rotate-[-15deg] transition-transform duration-500 hover:rotate-[-5deg] hover:scale-105"
                            data-ai-hint="snack bag"
                        />
                        <Image
                            src="https://placehold.co/400x400.png"
                            alt="Drump product bag"
                            width={350}
                            height={350}
                            className="absolute drop-shadow-2xl translate-x-1/4 translate-y-1/4 rotate-[10deg] transition-transform duration-500 hover:rotate-[2deg] hover:scale-105"
                            data-ai-hint="snack bag"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
