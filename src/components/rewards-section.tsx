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
        <section id="rewards" className="pt-10 pb-20 bg-primary border-b-4 border-black">
            <div className="container mx-auto px-8 sm:px-12 lg:px-32">
                <div className="grid md:grid-cols-2 gap-8">
                    {rewards.map((reward) => (
                        <div key={reward.number} className="bg-secondary border-2 border-black rounded-lg p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 flex flex-col h-[32rem]">
                            <div className="text-5xl font-bold font-headline text-black">{reward.number}</div>
                            <h3 className="text-4xl font-bold font-headline text-black leading-tight">
                                {reward.title}
                            </h3>
                            <hr className="border-t-2 border-black w-32" />
                            <p className="text-lg text-black/80 font-solway flex-grow">
                                {reward.description}
                            </p>
                            <div className="relative w-full h-full -mb-4">
                                <Image
                                    src={reward.image}
                                    alt={reward.title}
                                    fill
                                    style={{ objectFit: 'contain' }}
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
