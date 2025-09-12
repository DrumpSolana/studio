
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function ForBusinessPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 relative z-10">
             <div className="absolute top-4 left-4">
                <Button asChild variant="ghost">
                    <Link href="/">&larr; Back to Home</Link>
                </Button>
            </div>
            <Card className="w-full max-w-md bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline text-black">Business Portal</CardTitle>
                    <CardDescription className="font-solway text-black/80">
                        Manage your Drump loyalty program and rewards.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Button asChild className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">
                        <Link href="/for-business/apply">Apply for an Account</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-white text-black font-bold border-2 border-black hover:bg-gray-100 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">
                        <Link href="/for-business/login">Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
