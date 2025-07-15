import Image from 'next/image';

const steps = [
    {
        step: 1,
        title: 'Snack It',
        description: 'Grab a handful (or the whole bag, we don’t judge) for a quick and satisfying snack.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'person snacking'
    },
    {
        step: 2,
        title: 'Stack It',
        description: 'Level up your meals. Crumble Drump on salads, soups, or mac and cheese for an extra crunch.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'food bowl'
    },
    {
        step: 3,
        title: 'Swap It',
        description: 'Ditch the boring chips. Swap them for Drump on your next movie night or party.',
        image: 'https://placehold.co/400x400.png',
        dataAiHint: 'people party'
    }
];

export default function SnackStackSwapSection() {
    return (
        <section id="how-to" className="py-20 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-4xl font-bold text-accent font-headline">Snack. Stack. Swap.</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        There are many ways to enjoy Drump. Here are a few of our favorites.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {steps.map((step) => (
                        <div key={step.step} className="p-2 rounded-xl transition-all duration-300 group">
                           <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-shadow">
                             <Image
                                src={step.image}
                                alt={step.title}
                                fill
                                objectFit="cover"
                                data-ai-hint={step.dataAiHint}
                                className="transition-transform duration-500 group-hover:scale-110"
                             />
                           </div>
                           <h3 className="text-2xl font-bold text-primary mb-2">{`0${step.step}`}</h3>
                           <h4 className="text-xl font-semibold text-accent mb-2">{step.title}</h4>
                           <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
