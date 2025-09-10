
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function PortalPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                 <div className="text-center mb-8">
                     <Link href="/" className="inline-block">
                        <Image 
                            src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752616337/join_the_punch_1_i9twgu.png" 
                            alt="Drump Logo"
                            width={160}
                            height={54}
                            className="object-contain"
                        />
                    </Link>
                </div>
                <Card className="bg-secondary/20 border-2 border-border text-white text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/20 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                            <Briefcase className="h-8 w-8"/>
                        </div>
                        <CardTitle className="font-headline text-2xl">Business Portal</CardTitle>
                            <CardDescription className="text-white/80">
                            Manage your loyalty program.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link href="/business">Business Login</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full text-white border-white/50 hover:bg-white/10 hover:text-white">
                            <Link href="/business/signup">Apply for an Account</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
