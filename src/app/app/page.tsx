
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Trophy } from "lucide-react";
import Link from 'next/link';

export default function CustomerAppPage() {
    // This is a placeholder value. In the future, this will come from the user's connected wallet.
    const userPoints = 1250; 

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                 <div className="text-center mb-8">
                     <Link href="/" className="inline-block">
                        <h1 className="text-4xl font-headline text-white">Drump</h1>
                    </Link>
                </div>
                <Card className="bg-secondary/20 border-2 border-border text-white">
                    <CardHeader>
                        <CardDescription className="text-white/80 text-center">YOUR POINTS BALANCE</CardDescription>
                        <CardTitle className="text-5xl font-bold font-headline text-center text-primary">
                            {userPoints.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">
                            <QrCode className="mr-2" />
                            Scan QR Code
                        </Button>
                        <Button size="lg" variant="outline" className="w-full text-white border-white/50 hover:bg-white/10 hover:text-white text-lg py-6">
                            <Trophy className="mr-2" />
                            View Rewards
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
