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
                        <div className="inline-flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 text-sm text-white/90">
                           Drump - First Snack on <SolanaLogo /> <span className="font-bold">SOLANA</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold font-headline text-white leading-none tracking-normal">
                            SNACK, SECURE, SWAP
                        </h1>
                        <p className="text-2xl text-white/90 max-w-md">
                            Munch on Drump Cheese Puffs while earning loyalty points. Exchange Drump points for fun prizes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg">
                               ORDER NOW
                            </Button>
                            <Button size="lg" variant="secondary" className="bg-yellow-400 text-black font-bold border-2 border-black hover:bg-yellow-500 px-8 py-3 rounded-lg">
                               WHAT'S WITH THE CHEESEBALL?
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[600px] w-full flex items-center justify-center">
                         <Image
                            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752614149/Graphic_ry6hnt.png"
                            alt="Drump product graphic"
                            width={600}
                            height={600}
                            className="drop-shadow-2xl"
                            data-ai-hint="snack bag"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
