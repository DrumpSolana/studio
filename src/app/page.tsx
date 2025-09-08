import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import IngredientsSection from '@/components/new-ingredients-section';
import SnackStackSwapItSection from '@/components/snack-stack-swap-it-section';
import SoWhyDrump from '@/components/so-why-drump-section';
import TasteTheDrumpSection from '@/components/taste-the-drump-section';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
        <div className="text-center py-16 bg-secondary text-black">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold font-headline mb-4">Ready to Join?</h2>
            <p className="mb-8 font-solway max-w-2xl mx-auto">Whether you're a customer ready to earn rewards or a business looking to join our loyalty platform, we've got a place for you.</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login">Customer Login</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white text-black hover:bg-white/80">
                <Link href="/business">Business Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
