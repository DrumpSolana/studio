import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import PreOrderModal from './pre-order-modal';

export default function TasteTheDrumpSection() {
    return (
        <section className="bg-background pt-24 pb-12 overflow-hidden">
            <div className="container mx-auto px-8 sm:px-12 lg:px-32">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold font-headline text-white leading-none tracking-normal uppercase">
                            Still here? Time to taste the drump
                        </h2>
                        <hr className="border-t-2 border-white w-48" />
                        <p className="text-lg text-white/90 max-w-md">
                            Not financial advice... but they taste like a 10x. Get yours before your friends flex their bags.
                        </p>
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <Zap className="h-6 w-6" />
                            <span>JOIN THE DRUMP SIDE.</span>
                        </div>
                        <PreOrderModal>
                            <Button
                                size="lg"
                                className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
                            >
                                Pre Order Now
                            </Button>
                        </PreOrderModal>
                    </div>
                    <div className="relative h-[500px] w-full flex items-center justify-center">
                        <Image
                            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752641646/Drump_Mockup_7_9_pleh9h.png"
                            alt="Drump snack bags"
                            width={600}
                            height={600}
                            className="drop-shadow-2xl"
                            data-ai-hint="snack bags"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
