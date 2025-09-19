
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: 'Business name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function SignUpFormPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      businessName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // 2. Send verification email
      await sendEmailVerification(user);

      // 3. Create the business document in Firestore
      await setDoc(doc(db, "businesses", user.uid), {
        businessName: values.businessName,
        email: values.email,
        createdAt: new Date(),
        status: 'pending', // Add status field
        ownerId: user.uid,   // Add ownerId
      });

      router.push('/for-business/apply/success');

    } catch (error: any) {
      console.error("Sign up error:", error);

      let title = 'Sign-up Failed';
      let description = 'An unexpected error occurred. Please try again.';

      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            title = 'Email In Use';
            description = 'This email address is already registered. Please try logging in.';
            break;
          case 'auth/weak-password':
            title = 'Weak Password';
            description = 'Your password is too weak. It must be at least 8 characters long.';
            break;
          case 'auth/invalid-email':
            title = 'Invalid Email';
            description = 'The email address you entered is not valid.';
            break;
          default:
            title = `Error: ${error.code}`;
            description = error.message;
        }
      }
      
      toast({
        variant: 'destructive',
        title: title,
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 py-12 relative z-10">
        <div className="absolute top-4 left-4">
            <Button asChild variant="outline">
                <Link href="/for-business">&larr; Back to Business Portal</Link>
            </Button>
        </div>
        <Card className="w-full max-w-md bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline text-black">Business Application</CardTitle>
            <CardDescription className="font-solway text-black/80">
              Apply for an account to get started with Drump for your business.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-solway">Business Name</FormLabel>
                      <FormControl>
                        <Input className="bg-white border-black border-2 text-black" placeholder="Drump Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-solway">Email</FormLabel>
                      <FormControl>
                        <Input className="bg-white border-black border-2 text-black" placeholder="contact@drump.app" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-solway">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input className="bg-white border-black border-2 text-black pr-10" type={showPassword ? 'text' : 'password'} {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute inset-y-0 right-0 h-full px-3 text-black/70 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black font-solway">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input className="bg-white border-black border-2 text-black pr-10" type={showConfirmPassword ? 'text' : 'password'} {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute inset-y-0 right-0 h-full px-3 text-black/70 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Apply'}
                </Button>
              </form>
            </Form>
             <div className="mt-4 text-center">
                <Link href="/for-business/login" className="text-sm text-black/70 hover:text-black font-solway">
                    Already have an account? <span className="text-red-600 font-bold hover:underline">Login</span>
                </Link>
            </div>
          </CardContent>
        </Card>
     </div>
  );
}
