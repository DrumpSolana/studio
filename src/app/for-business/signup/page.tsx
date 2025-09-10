
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function BusinessSignUpPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const passwordsMatch = password === confirmPassword;
    const passwordsNotEmpty = password !== '' && confirmPassword !== '';

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
                            <Label htmlFor="phone" className="text-white/90">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                        </div>
                         <div className="relative">
                            <Label htmlFor="password"  className="text-white/90">Password</Label>
                            <Input 
                                id="password" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="bg-background/50 border-border text-white placeholder:text-white/50 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-white/70 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <div className="relative">
                            <Label htmlFor="confirmPassword"  className="text-white/90">Confirm Password</Label>
                            <Input 
                                id="confirmPassword" 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                className="bg-background/50 border-border text-white placeholder:text-white/50 pr-10"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                             <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-white/70 hover:text-white"
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {passwordsNotEmpty && !passwordsMatch && (
                            <p className="text-sm text-red-500">Passwords do not match.</p>
                        )}
                        
                        <div className="pt-2 space-y-4">
                            <div>
                                <Label htmlFor="address" className="text-white/90">Business Address (Optional)</Label>
                                <Input id="address" type="text" placeholder="123 Main St, Anytown USA" className="bg-background/50 border-border text-white placeholder:text-white/50" />
                            </div>
                            <div>
                                <Label htmlFor="industry" className="text-white/90">Industry (Optional)</Label>
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

                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" disabled={!passwordsMatch || !passwordsNotEmpty}>Apply</Button>
                        <div className="text-center text-sm text-white/70">
                            Already have an account?{' '}
                            <Link href="/for-business/login" className="font-bold text-primary hover:underline">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
