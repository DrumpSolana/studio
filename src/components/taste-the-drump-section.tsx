import { Button } from '@/components/ui/button';

export default function TasteTheDrumpSection() {
    return (
        <section id="taste" className="bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground mb-4">
                        Ready to Taste the Obsession?
                    </h2>
                    <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                        Your snack game is about to change forever. Join the Drump revolution and discover your new favorite crunch.
                    </p>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform hover:scale-105">
                        I'm Ready for Drump!
                    </Button>
                </div>
            </div>
        </section>
    );
}
