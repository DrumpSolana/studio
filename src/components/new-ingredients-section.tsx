
import Image from 'next/image';

const ingredients = [
    {
        name: '100% Real Cheese',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752630283/cheese-slice-cartoon-vector-icon-illustration-food-object-icon-isolated-flat-vector_1_gqhvvi.png',
        dataAiHint: 'cheese block',
    },
    {
        name: 'Natural Spices & Seasoning',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Icon_nbfi91.png',
        dataAiHint: 'spice shakers',
    },
    {
        name: 'Made in Canada',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Made-in-Canada-English-French-300x300_1_xcuw0n.png',
        dataAiHint: 'canada maple leaf',
    },
    {
        name: 'Crunch Certified',
        image: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Drump_Cheese_Ball_4_daedqc.png',
        badge: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752640631/vector-award-ribbon-check-mark-with-stars_1_wyr4wf.png',
        dataAiHint: 'cheese puff mascot',
    }
];

export default function IngredientsSection() {
    return (
        <section id="ingredients" className="py-12 bg-primary border-t-4 border-black">
            <div className="container mx-auto px-8 sm:px-12 lg:px-16">
                <div className="text-center mb-12">
                    <div className="inline-block bg-secondary border-2 border-black rounded-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl md:text-4xl font-bold text-black font-headline">Ingredients? Yeah, We Got The Good Stuff</h2>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {ingredients.map((ingredient) => (
                        <div key={ingredient.name} className="text-center flex flex-col items-center">
                             <div className="bg-secondary p-4 rounded-lg border-2 border-black w-full max-w-48 h-48 flex items-center justify-center mb-4 relative">
                                <div className="absolute inset-x-0 bottom-4">
                                     <Image 
                                        src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752640822/Ellipse_3_j9f9bm.png"
                                        alt="shadow"
                                        width={100}
                                        height={20}
                                        className="mx-auto"
                                    />
                                </div>
                                <div className="relative w-32 h-32 z-10">
                                     <Image
                                        src={ingredient.image}
                                        alt={ingredient.name}
                                        fill
                                        style={{objectFit:"contain"}}
                                        data-ai-hint={ingredient.dataAiHint}
                                    />
                                    {ingredient.badge && (
                                        <div className="absolute bottom-[-1.5rem] right-[-1.5rem] w-24 h-24">
                                            <Image 
                                                src={ingredient.badge}
                                                alt="Certified Badge"
                                                fill
                                                style={{objectFit:"contain"}}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-black font-solway">{ingredient.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
