import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PreOrderModal from './pre-order-modal';
import Link from 'next/link';
import { Send, Twitter } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative flex items-center pt-24 pb-16 md:pt-32 md:pb-24 min-h-[80vh] md:min-h-screen bg-transparent overflow-x-clip">
             <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-16 z-10">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="space-y-8 text-center md:text-left md:w-1/2 flex-shrink-0">
                        <div className="font-poppins inline-flex items-center gap-2 border-2 border-border rounded-lg px-3 py-2 text-white">
                           <span className="text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap">Drump - First Snack on</span>
                           <Image src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752615308/Solana_lsczky.png" alt="Solana" width={120} height={24} className="h-5 sm:h-6 w-auto max-w-[100px]" />
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:whitespace-nowrap font-bold font-headline text-white leading-none tracking-normal uppercase">
                            Snack, Secure, Swap
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-lg mx-auto md:mx-0">
                            Munch on Drump Cheese Puffs while earning loyalty points. Exchange Drump points for fun prizes.
                        </p>
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                 <Button size="lg" variant="secondary" className="bg-yellow-400 text-black font-bold border-2 border-black hover:bg-yellow-500 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow" asChild>
                                    <Link href="https://t.me/drumpofficial" target="_blank" rel="noopener noreferrer">
                                       <Send /> Telegram
                                    </Link>
                                </Button>
                                <Button size="lg" variant="secondary" className="bg-yellow-400 text-black font-bold border-2 border-black hover:bg-yellow-500 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow" asChild>
                                    <Link href="https://x.com/DrumpSolana" target="_blank" rel="noopener noreferrer">
                                       <Twitter /> X
                                    </Link>
                                </Button>
                            </div>
                            <PreOrderModal>
                                <Button size="lg" className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">
                                   Pre Order Now
                                </Button>
                            </PreOrderModal>
                        </div>
                    </div>
                    <div className="relative md:w-1/2 w-full flex items-center justify-center mt-8 md:mt-0">
                         <Image
                            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752614149/Graphic_ry6hnt.png"
                            alt="Drump product graphic"
                            width={1200}
                            height={1200}
                            className="drop-shadow-2xl object-contain w-full h-auto md:absolute md:scale-[0.8] md:translate-x-1/4"
                            data-ai-hint="snack bag"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
