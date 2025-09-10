
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function BusinessPage() {
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
                <div className="bg-secondary/20 border-2 border-border p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold font-headline text-white mb-2 text-center">Business Portal</h1>
                    <p className="text-white/80 mb-6 text-center">Sign in to manage your loyalty program.</p>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-white/90">Business Email</Label>
                            <Input id="email" type="email" placeholder="you@yourbusiness.com" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                        </div>
                         <div>
                            <Label htmlFor="password"  className="text-white/90">Password</Label>
                            <Input id="password" type="password" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                        </div>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Login</Button>
                        <div className="text-center text-sm text-white/70">
                            Don't have an account?{' '}
                            <Link href="/business/signup" className="font-bold text-primary hover:underline">
                                Sign Up
                            </Link>
                        </div>
                    </div>

                     <div className="mt-6 text-center">
                        <p className="text-sm text-white/70">
                            Are you a customer?{' '}
                            <Link href="/login" className="font-bold text-primary hover:underline">
                                Go to the Customer Portal
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
