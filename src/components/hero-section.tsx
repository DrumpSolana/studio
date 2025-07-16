import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center bg-transparent overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="container mx-auto px-8 sm:px-12 lg:px-64 z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center pt-24">
                    <div className="space-y-8 text-left">
                        <div className="font-poppins inline-flex items-center gap-2 border-2 border-border rounded-lg px-3 py-2 text-white">
                           <span className="text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap">Drump - First Snack on</span>
                           <Image src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752615308/Solana_lsczky.png" alt="Solana" width={120} height={24} className="h-5 sm:h-6 w-auto max-w-[120px]" />
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold font-headline text-white leading-none tracking-normal uppercase">
                            Snack, Secure, Swap
                        </h1>
                        <p className="text-2xl text-white/90 max-w-lg">
                            Munch on Drump Cheese Puffs while earning loyalty points. Exchange Drump points for fun prizes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">
                               ORDER NOW
                            </Button>
                            <Button size="lg" variant="secondary" className="bg-yellow-400 text-black font-bold border-2 border-black hover:bg-yellow-500 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">
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
                            className="drop-shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105"
                            data-ai-hint="snack bag"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
