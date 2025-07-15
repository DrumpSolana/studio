import Image from 'next/image';
import { Button } from '@/components/ui/button';

const SolanaLogo = () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-auto">
    <path fillRule="evenodd" clipRule="evenodd" d="M21.7827 5.187C21.1444 4.562 20.25 4.75 19.825 5.562L10.2327 22.187C9.80772 23 10.0001 23.875 10.6327 24.5C11.2711 25.125 12.1654 24.938 12.5904 24.125L22.1827 7.5C22.6077 6.688 22.4211 5.812 21.7827 5.187Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.2173 5.187C9.57894 4.562 8.68465 4.75 8.25965 5.562L-1.31296 22.187C-1.73796 23 -1.54561 23.875 -0.912963 24.5C-0.274633 25.125 0.619653 24.938 1.04465 24.125L10.637 7.5C11.062 6.688 10.8556 5.812 10.2173 5.187Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M31.363 5.187C30.7246 4.562 29.8303 4.75 29.4053 5.562L19.813 22.187C19.388 23 19.5803 23.875 20.213 24.5C20.8513 25.125 21.7456 24.938 22.1706 24.125L31.763 7.5C32.188 6.688 31.9956 5.812 31.363 5.187Z" fill="white"/>
    </svg>
)

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center pt-24">
                    <div className="space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 text-sm">
                           Drump - First Snack on <SolanaLogo /> <span className="font-bold">SOLANA</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold font-headline text-accent leading-none tracking-tighter">
                            SNACK, SECURE, SWAP
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md">
                            Munch on Drump Cheese Puffs while earning loyalty points. Exchange Drump points for fun prizes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="font-bold border-2 border-b-4 border-r-4 border-black hover:bg-primary/90">
                               ORDER NOW
                            </Button>
                            <Button size="lg" variant="secondary" className="font-bold border-2 border-b-4 border-r-4 border-black hover:bg-secondary/90">
                               WHAT'S WITH THE CHEESEBALL?
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[500px] w-full flex items-center justify-center">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
                            <div className="bg-secondary text-secondary-foreground rounded-lg p-2 font-bold shadow-lg -mr-12 z-10">Tasty &</div>
                            <div className="bg-primary text-primary-foreground rounded-lg p-2 font-bold shadow-lg mt-20">Crunchy</div>
                         </div>
                         <Image
                            src="https://placehold.co/400x480.png"
                            alt="Drump product bag"
                            width={350}
                            height={420}
                            className="absolute drop-shadow-2xl translate-x-10 -rotate-[15deg] z-0"
                            data-ai-hint="snack bag"
                        />
                        <Image
                            src="https://placehold.co/400x480.png"
                            alt="Drump product bag"
                            width={350}
                            height={420}
                            className="absolute drop-shadow-2xl -translate-x-10 rotate-[5deg] z-10"
                            data-ai-hint="snack bag"
                        />
                        
                        {/* Decorative elements */}
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-primary rounded-full animate-pulse delay-500"></div>
                        <div className="absolute top-20 right-10 w-5 h-5 bg-secondary rounded-full animate-bounce"></div>
                        <div className="absolute bottom-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping"></div>

                    </div>
                </div>
            </div>
        </section>
    );
}
