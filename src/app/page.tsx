import Header from '@/components/header';
import HeroSection from '@/components/hero-section';

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
