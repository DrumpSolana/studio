import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import IngredientsSection from '@/components/new-ingredients-section';
import RewardsSection from '@/components/rewards-section';
import SnackStackSwapItSection from '@/components/snack-stack-swap-it-section';
import SoWhyDrump from '@/components/so-why-drump-section';
import TasteTheDrumpSection from '@/components/taste-the-drump-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <SoWhyDrump />
        <IngredientsSection />
        <SnackStackSwapItSection />
        <RewardsSection />
        <TasteTheDrumpSection />
      </main>
      <Footer />
    </div>
  );
}
