import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Leaf, Zap } from 'lucide-react';

const features = [
    {
        icon: <Smile className="h-8 w-8 text-secondary" />,
        title: 'Insanely Tasty',
        description: 'A flavor explosion that will make your taste buds do a happy dance.'
    },
    {
        icon: <Leaf className="h-8 w-8 text-secondary" />,
        title: 'Real Ingredients',
        description: 'No funny business here. Just wholesome goodness in every bite.'
    },
    {
        icon: <Zap className="h-8 w-8 text-secondary" />,
        title: 'Energy Booster',
        description: 'The perfect pick-me-up to power through your day.'
    }
];

export default function AboutSection() {
    return (
        <section id="about" className="py-20 bg-background/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl group">
                        <Image
                            src="https://placehold.co/600x600.png"
                            alt="Person enjoying Drump snacks"
                            fill
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint="person eating"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-accent font-headline">Why Drump? Because You Deserve Delicious.</h2>
                        <p className="text-lg text-muted-foreground">
                            We were tired of boring snacks. So we created Drump. It's the perfect combination of crunchy, cheesy, and utterly irresistible. We believe snacking should be a joyful experience, and that's what we deliver.
                        </p>
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-accent">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
