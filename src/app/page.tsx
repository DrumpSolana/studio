import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import IngredientsSection from '@/components/new-ingredients-section';
import SoWhyDrump from '@/components/so-why-drump-section';

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <SoWhyDrump />
        <IngredientsSection />
      </main>
    </div>
  );
}
