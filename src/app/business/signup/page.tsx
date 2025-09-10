
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";

export default function BusinessSignUpPage() {
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
                    <h1 className="text-3xl font-bold font-headline text-white mb-2 text-center">Apply for a Business Account</h1>
                    <p className="text-white/80 mb-6 text-center">Join the Drump loyalty platform.</p>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="businessName" className="text-white/90">Business Name</Label>
                            <Input id="businessName" type="text" placeholder="Your Company LLC" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-white/90">Email</Label>
                            <Input id="email" type="email" placeholder="you@yourbusiness.com" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                        </div>
                         <div>
                            <Label htmlFor="password"  className="text-white/90">Password</Label>
                            <Input id="password" type="password" placeholder="••••••••" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                        </div>
                        
                        <div className="pt-2">
                             <p className="text-white/80 mb-2 text-sm font-semibold">Optional Information</p>
                             <div className="space-y-4">
                                <div>
                                    <Label htmlFor="phone" className="text-white/90">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                                </div>
                                <div>
                                    <Label htmlFor="address" className="text-white/90">Business Address</Label>
                                    <Input id="address" type="text" placeholder="123 Main St, Anytown USA" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                                </div>
                                <div>
                                    <Label htmlFor="industry" className="text-white/90">Industry</Label>
                                     <Select>
                                        <SelectTrigger className="w-full bg-background/50 border-border text-white placeholder:text-white/50">
                                            <SelectValue placeholder="Select an industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="food-and-bev">Food & Beverage</SelectItem>
                                            <SelectItem value="retail">Retail</SelectItem>
                                            <SelectItem value="services">Services</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                             </div>
                        </div>

                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4">Create Account</Button>
                        <div className="text-center text-sm text-white/70">
                            Already have an account?{' '}
                            <Link href="/business" className="font-bold text-primary hover:underline">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
