
'use client';
import { useActionState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createBusinessAccount, type SignUpFormState } from './actions';
import { logGtagEvent } from '@/lib/gtag';


function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" 
        disabled={pending}
      >
        {pending ? <Loader2 className="animate-spin" /> : 'Apply'}
      </Button>
    );
}


export default function BusinessSignUpPage() {
  const initialState: SignUpFormState = {
    success: false,
    message: '',
    errors: null,
  };

  const [formState, formAction] = useActionState(createBusinessAccount, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const passwordsMatch = password === confirmPassword;
  const passwordsNotEmpty = password !== '' && confirmPassword !== '';


  useEffect(() => {
    if(formState.success) {
        logGtagEvent('business_signup_success');
        toast({
            title: 'Application Submitted!',
            description: formState.message,
        });
        formRef.current?.reset();
        setPassword('');
        setConfirmPassword('');
    } else if (formState.message && formState.errors) {
        const errorMessage = formState.errors?._form?.[0] || formState.message;
        logGtagEvent('business_signup_error', { error_message: errorMessage });
        toast({
            variant: 'destructive',
            title: 'Application Failed',
            description: errorMessage
        });
    }
  }, [formState, toast]);

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
          <h1 className="text-3xl font-bold font-headline text-white mb-2 text-center">
            Apply for a Business Account
          </h1>
          <p className="text-white/80 mb-6 text-center">
            Join the Drump loyalty platform.
          </p>

          <form ref={formRef} action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="businessName" className="text-white/90">
                Business Name
              </Label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Your Company LLC"
                className="bg-background/50 border-border text-white placeholder:text-white/50"
                required
              />
               {formState.errors?.businessName && <p className="text-sm text-red-500 mt-1">{formState.errors.businessName[0]}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-white/90">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@yourbusiness.com"
                className="bg-background/50 border-border text-white placeholder:text-white/50"
                required
              />
               {formState.errors?.email && <p className="text-sm text-red-500 mt-1">{formState.errors.email[0]}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="text-white/90">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 555-5555"
                className="bg-background/50 border-border text-white placeholder:text-white/50"
                required
              />
               {formState.errors?.phone && <p className="text-sm text-red-500 mt-1">{formState.errors.phone[0]}</p>}
            </div>
            <div className="relative">
              <Label htmlFor="password" className="text-white/90">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="bg-background/50 border-border text-white placeholder:text-white/50 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-white/70 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
               {formState.errors?.password && <p className="text-sm text-red-500 mt-1">{formState.errors.password[0]}</p>}
            </div>
            <div className="relative">
              <Label htmlFor="confirmPassword" className="text-white/90">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="bg-background/50 border-border text-white placeholder:text-white/50 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-white/70 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {passwordsNotEmpty && !passwordsMatch && (
              <p className="text-sm text-red-500">Passwords do not match.</p>
            )}

            <div className="pt-2 space-y-4">
              <div>
                <Label htmlFor="address" className="text-white/90">
                  Business Address (Optional)
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main St, Anytown USA"
                  className="bg-background/50 border-border text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <Label htmlFor="industry" className="text-white/90">
                  Industry (Optional)
                </Label>
                <Select name="industry">
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
            
            <SubmitButton />

            <div className="text-center text-sm text-white/70">
              Already have an account?{' '}
              <Link
                href="/for-business/login"
                className="font-bold text-primary hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
