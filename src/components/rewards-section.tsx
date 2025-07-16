import Image from 'next/image';

const rewards = [
    {
        number: '02',
        title: 'Snack Your Way to Rewards',
        description: 'Crunch & Collect. Earn your Drump loyalty points every time you snack',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752641223/Drump_Mockup_7_9_ogvpo6.png',
        dataAiHint: 'snack bags coins',
    },
    {
        number: '03',
        title: 'Redeem for Real Rewards',
        description: 'Use your points to unlock exclusive prizes.',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752641223/Drump_Mockup_3_4_wqcsdz.png',
        dataAiHint: 'snack bags gifts',
    }
]

export default function RewardsSection() {
    return (
        <section id="rewards" className="pt-4 pb-12 bg-primary border-b-4 border-black">
            <div className="container mx-auto px-8 sm:px-12 lg:px-32">
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {rewards.map((reward) => (
                        <div key={reward.number} className="bg-secondary border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
                             <div className="space-y-4 p-8 flex-shrink-0">
                                <div className="text-5xl font-bold font-headline text-black">{reward.number}</div>
                                <h3 className="text-3xl font-bold font-headline text-black leading-tight">
                                    {reward.title}
                                </h3>
                                <hr className="border-t-2 border-black w-32" />
                                <p className="text-lg text-black/80 font-solway h-16">
                                    {reward.description}
                                </p>
                            </div>
                            <div className="relative w-full h-[300px] mt-auto">
                                <Image
                                    src={reward.image}
                                    alt={reward.title}
                                    layout="fill"
                                    objectFit="contain"
                                    className="w-full h-full"
                                    data-ai-hint={reward.dataAiHint}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
