
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useForm as useResetForm } from 'react-hook-form';
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
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

const resetSchema = z.object({
    resetEmail: z.string().email({
        message: 'Please enter a valid email to send a reset link to.'
    }),
});

export default function BusinessLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetForm = useResetForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
        resetEmail: '',
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/dashboard');

    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });

    } finally {
      setIsLoading(false);
    }
  }

  async function onResetSubmit(values: z.infer<typeof resetSchema>) {
    setIsResetting(true);
    setResetSuccess(false);
    try {
        await sendPasswordResetEmail(auth, values.resetEmail);
        setResetSuccess(true);
    } catch(error: any) {
        console.error("Password reset error: ", error);
        toast({
            variant: 'destructive',
            title: 'Password Reset Failed',
            description: error.code === 'auth/user-not-found' ? 'No account found with this email.' : 'An error occurred. Please try again.'
        });
    } finally {
        setIsResetting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 relative z-10">
       <div className="absolute top-4 left-4">
            <Button asChild variant="outline">
                <Link href="/">&larr; Back to Home</Link>
            </Button>
        </div>
      <Card className="w-full max-w-md bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-black">Business Login</CardTitle>
          <CardDescription className="font-solway text-black/80">
            Access your Drump Business Portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                     <div className="flex justify-between items-center">
                        <FormLabel className="text-black font-solway">Password</FormLabel>
                        <Dialog>
                            <DialogTrigger asChild>
                                 <button type="button" className="text-sm text-black/70 hover:text-black font-solway hover:underline">
                                    Forgot Password?
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-secondary border-black border-4 rounded-lg p-8">
                                <DialogHeader>
                                    <DialogTitle className="font-headline text-3xl text-black">Reset Password</DialogTitle>
                                    <DialogDescription className="font-solway text-black/80">
                                         {resetSuccess ? 'Check your inbox for a password reset link.' : 'Enter your email address and we will send you a link to reset your password.'}
                                    </DialogDescription>
                                </DialogHeader>
                                {!resetSuccess && (
                                <Form {...resetForm}>
                                    <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                                        <FormField
                                            control={resetForm.control}
                                            name="resetEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="sr-only">Email</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white border-black border-2 text-black" placeholder="your.email@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                         <DialogFooter>
                                            <Button type="submit" className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow" disabled={isResetting}>
                                                {isResetting ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                                )}
                                {resetSuccess && (
                                     <DialogFooter>
                                         <DialogClose asChild>
                                             <Button type="button" className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">Close</Button>
                                         </DialogClose>
                                     </DialogFooter>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
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
              <Button type="submit" className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
              </Button>
            </form>
          </Form>
           <div className="mt-4 text-center">
              <Link href="/for-business/apply" className="text-sm text-black/70 hover:text-black font-solway">
                Don't have an account? <span className="text-red-600 font-bold hover:underline">Apply now.</span>
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
