
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
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export default function BusinessLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      // You could add a check here for email verification if needed
      // if (!user.emailVerified) { ... }

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
