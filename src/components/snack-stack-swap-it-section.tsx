import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function SnackStackSwapItSection() {
    return (
        <section id="snack-stack-swap-it" className="pt-12 pb-4 bg-primary">
            <div className="container mx-auto px-8 sm:px-12 lg:px-32">
                <div className="text-center mb-12">
                    <div className="inline-block bg-secondary border-2 border-black rounded-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl md:text-4xl font-bold text-black font-headline">Snack It. Stack It. Swap It. All In One</h2>
                    </div>
                </div>

                <div className="bg-secondary border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative w-full h-96 md:h-[28rem]">
                            <Image
                                src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752641003/Drump_Mockup_6_1_o9mndw.png"
                                alt="Drump snack bags collage"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="md:rounded-l-lg"
                                data-ai-hint="snack bags collage"
                            />
                        </div>
                        <div className="space-y-4 p-8">
                            <div className="text-5xl font-bold font-headline text-black">01</div>
                            <h3 className="text-3xl font-bold font-headline text-black leading-tight">
                                Snack So Tasty, Even Crypto Can&apos;t Resist
                            </h3>
                            <hr className="border-t-2 border-black w-32" />
                            <p className="text-lg text-black/80 font-solway">
                                Red or Blue? Doesn&apos;t matter. Both are mooning in flavor.
                            </p>
                            <Button
                                size="lg"
                                className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
                            >
                                ORDER NOW
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
