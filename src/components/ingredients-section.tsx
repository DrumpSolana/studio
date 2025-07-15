const ingredients = [
    {
        name: 'Real Cheddar Cheese',
        description: 'Sharp, tangy, and sourced from happy cows. The heart of our flavor.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 19.5 9.5 19.5 2 12l7.5-7.5 5 0L22 12Z"></path><path d="M12.5 8.5v0"></path><path d="M16.5 13.5v0"></path><path d="M10.5 14.5v0"></path></svg>
        ),
    },
    {
        name: 'Organic Corn',
        description: 'Sun-kissed and non-GMO corn, puffed to perfection for that satisfying crunch.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12c0-2 2-2 2-2s2 0 2 2-2 2-2 2-2 0-2-2Z"></path><path d="M9 17c0-2 2-2 2-2s2 0 2 2-2 2-2 2-2 0-2-2Z"></path><path d="M9 7c0-2 2-2 2-2s2 0 2 2-2 2-2 2-2 0-2-2Z"></path><path d="m14 14.5 2.5-1-2.5-1"></path><path d="m14 9.5 2.5-1-2.5-1"></path><path d="m14 4.5 2.5-1-2.5-1"></path><path d="m5 14.5 2.5 1-2.5 1"></path><path d="m5 9.5 2.5 1-2.5 1"></path><path d="m5 4.5 2.5 1-2.5 1"></path><path d="m10 19.5 2.5-1-2.5-1"></path></svg>
        ),
    },
    {
        name: 'A Dash of Spice',
        description: 'A secret blend of spices that adds a little kick to every bite.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 11c-.3-2.6-2-4.8-4.4-4.8-2.4 0-4.1 2.2-4.4 4.8"></path><path d="M12.5 11h-1c-2.5 0-4.5 2-4.5 4.5V17h10v-1.5c0-2.5-2-4.5-4.5-4.5z"></path><path d="M10 2c1.3.4 2.3 1.4 2.7 2.7"></path></svg>
        ),
    },
    {
        name: 'Good Vibes Only',
        description: "That's right. Every bag is packed with a little extra happiness.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>
        ),
    }
];


export default function IngredientsSection() {
    return (
        <section id="ingredients" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-4xl font-bold text-accent font-headline">What's Inside? Only the Good Stuff.</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        We're transparent about our ingredients because we're proud of them. Simple, wholesome, and delicious.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ingredients.map((ingredient) => (
                        <div key={ingredient.name} className="bg-card p-6 rounded-xl shadow-lg text-center flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
                            <div className="mb-4">{ingredient.icon}</div>
                            <h3 className="text-xl font-semibold text-accent mb-2">{ingredient.name}</h3>
                            <p className="text-muted-foreground">{ingredient.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
