import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import IngredientsSection from '@/components/new-ingredients-section';
import SnackStackSwapItSection from '@/components/snack-stack-swap-it-section';
import SoWhyDrump from '@/components/so-why-drump-section';
import TasteTheDrumpSection from '@/components/taste-the-drump-section';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="pb-0">
        <HeroSection />
        <SoWhyDrump />
        <IngredientsSection />
        <SnackStackSwapItSection />
        <TasteTheDrumpSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
