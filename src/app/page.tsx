import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import IngredientsSection from '@/components/ingredients-section';
import SnackStackSwapSection from '@/components/snack-stack-swap-section';
import TasteTheDrumpSection from '@/components/taste-the-drump-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <IngredientsSection />
        <SnackStackSwapSection />
        <TasteTheDrumpSection />
      </main>
      <Footer />
    </div>
  );
}
