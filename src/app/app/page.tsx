
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CustomerAppPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="container mx-auto max-w-2xl text-center p-8">
        <div className="bg-secondary/20 border-2 border-border p-12 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold font-headline text-white mb-4">Customer Portal</h1>
            <p className="text-white/80 mb-8">
              This is the main dashboard for customers. After signing in, they will see their points balance, available rewards, and a button to scan QR codes.
            </p>
            <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-8">
                <p className="text-lg">Your Points Balance</p>
                <p className="text-5xl font-bold">1,250</p>
            </div>
            <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">Scan QR Code</Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">View Rewards</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
