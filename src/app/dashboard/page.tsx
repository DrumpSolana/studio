
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 relative z-10">
             <div className="absolute top-4 left-4">
                <Button asChild variant="outline">
                    <Link href="/">&larr; Back to Home</Link>
                </Button>
            </div>
            <Card className="w-full max-w-4xl bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-black">Business Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-solway text-black/80">Welcome to your dashboard. This area is under construction.</p>
                </CardContent>
            </Card>
        </div>
    );
}

    
