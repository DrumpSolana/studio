
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForBusinessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
         <Link href="/" className="text-2xl font-bold font-headline text-white">
            Drump
        </Link>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  Partner with Us
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white font-headline">
                  Join the Drump Loyalty Platform
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Offer your customers the crunchiest rewards on Solana. Integrate your business with the Drump ecosystem and tap into a new world of customer engagement.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/for-business/signup">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
              <Card className="bg-card text-card-foreground border-2 border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Platform Benefits</CardTitle>
                  <CardDescription>Why partnering with Drump is a no-brainer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 text-primary" />
                      <span>Access a growing community of snack-loving crypto enthusiasts.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 text-primary" />
                      <span>Boost customer loyalty with fun, redeemable points.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 text-primary" />
                      <span>Easy integration with our simple and powerful tools.</span>
                    </li>
                     <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 text-primary" />
                      <span>Increase brand visibility within the Solana ecosystem.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
