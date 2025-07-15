import Image from 'next/image';

const features = [
    'Real, crunchy, flavor-packed cheese puffs',
    'Munch and collect your Drump loyalty points',
    'Swap Drump points for epic rewards'
];

export default function SoWhyDrump() {
    return (
        <section id="why-drump" className="py-20 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full h-[600px] rounded-lg overflow-hidden group">
                        <Image
                            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752617158/neww_1_ehuxda.png"
                            alt="Two bags of Drump cheese puffs"
                            fill
                            objectFit="contain"
                            className="transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint="snack bags"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold text-black font-headline">So, Why Drump?</h2>
                        <hr className="border-t-2 border-black w-24" />
                        <p className="text-lg text-black/80">
                            We dumped snacks that don&apos;t crunch and then we launched Drump, the first-ever snack brand born on Solana.
                        </p>
                        <p className="text-lg text-black/80">
                            Our signature Drump Cheese Puffs are made for true flavor lovers – bold, crunchy, and seriously addictive.
                        </p>
                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="bg-primary border-2 border-black rounded-lg p-3 w-full">
                                        <div className="flex items-center">
                                            <span className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 font-bold">•</span>
                                            <span className="text-black font-semibold">{feature}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
