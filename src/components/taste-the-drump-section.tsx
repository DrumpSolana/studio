import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function TasteTheDrumpSection() {
    return (
        <section className="bg-background py-20 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                        <Button
                            size="lg"
                            className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
                        >
                            TRY DRUMP NOW
                        </Button>
                    </div>
                    <div className="relative h-[500px] w-full flex items-center justify-center">
                        <Image
                            src="https://placehold.co/600x600.png"
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
