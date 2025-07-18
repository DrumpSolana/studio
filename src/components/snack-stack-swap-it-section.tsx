import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PreOrderModal from './pre-order-modal';

const cards = [
    {
        number: '01',
        title: 'Snack So Tasty, Even Crypto Can’t Resist',
        description: 'Red or Blue? Doesn’t matter. Both are mooning in flavor.',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752641003/Drump_Mockup_6_1_o9mndw.png',
        dataAiHint: 'snack bags collage',
        isLarge: true,
    },
    {
        number: '02',
        title: 'Snack Your Way to Rewards',
        description: 'Crunch & Collect. Earn your Drump loyalty points every time you snack',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752641223/Drump_Mockup_7_9_ogvpo6.png',
        dataAiHint: 'snack bags coins',
        isLarge: false,
    },
    {
        number: '03',
        title: 'Redeem for Real Rewards',
        description: 'Use your points to unlock exclusive prizes.',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752641223/Drump_Mockup_3_4_wqcsdz.png',
        dataAiHint: 'snack bags gifts',
        isLarge: false,
    }
];


export default function SnackStackSwapItSection() {
    return (
        <section id="snack-stack-swap-it" className="pt-12 pb-4 bg-primary border-b-4 border-black">
            <div className="container mx-auto px-8 sm:px-12 lg:px-32">
                <div className="text-center mb-12">
                    <div className="inline-block bg-secondary border-2 border-black rounded-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl md:text-4xl font-bold text-black font-headline">Snack It. Stack It. Swap It. All In One</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* First Card - Large */}
                    <div className="lg:col-span-3">
                        <div className="bg-secondary border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full">
                            <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                                <div className="relative w-full h-96 md:h-full">
                                    <Image
                                        src={cards[0].image}
                                        alt={cards[0].title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="md:rounded-l-lg"
                                        data-ai-hint={cards[0].dataAiHint}
                                    />
                                </div>
                                <div className="space-y-4 p-8">
                                    <div className="text-5xl font-bold font-headline text-black">{cards[0].number}</div>
                                    <h3 className="text-3xl font-bold font-headline text-black leading-tight">
                                        {cards[0].title}
                                    </h3>
                                    <hr className="border-t-2 border-black w-32" />
                                    <p className="text-lg text-black/80 font-solway">
                                        {cards[0].description}
                                    </p>
                                    <PreOrderModal>
                                        <Button
                                            size="lg"
                                            className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
                                        >
                                            Pre Order Now
                                        </Button>
                                    </PreOrderModal>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second and Third Cards */}
                    {cards.slice(1).map((card) => (
                        <div key={card.number} className="lg:col-span-1 bg-secondary border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden h-full">
                             <div className="space-y-4 p-8 flex-shrink-0">
                                <div className="text-5xl font-bold font-headline text-black">{card.number}</div>
                                <h3 className="text-3xl font-bold font-headline text-black leading-tight">
                                    {card.title}
                                </h3>
                                <hr className="border-t-2 border-black w-32" />
                                <p className="text-lg text-black/80 font-solway h-16">
                                    {card.description}
                                </p>
                            </div>
                            <div className="relative w-full h-[300px] mt-auto">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    layout="fill"
                                    objectFit="contain"
                                    className="w-full h-full"
                                    data-ai-hint={card.dataAiHint}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}