
'use client';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createBusinessAccount } from './actions';
import Link from 'next/link';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  phoneNumber: z.string().optional(),
  businessAddress: z.string().optional(),
  industry: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      email: '',
      password: '',
      phoneNumber: '',
      businessAddress: '',
      industry: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const result = await createBusinessAccount(data);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Sign-up failed',
        description: result.error || 'An unknown error occurred. Please try again.',
      });
    }
    setIsLoading(false);
  }
  
  if (isSubmitted) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md bg-card text-card-foreground border-2 border-border">
                <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">Application Received!</CardTitle>
                <CardDescription>
                    Thank you for registering. Your application is under review, and we will notify you within 1-2 business days.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl bg-card text-card-foreground border-2 border-border">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Business Sign-Up</CardTitle>
          <CardDescription>Create your Drump Loyalty Platform account.
             Already have an account? <Link href="/for-business/login" className="text-primary hover:underline">Log In</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Drump Corp" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="owner@drump.com" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Business Address (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Crunch St, Flavor Town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Industry (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Retail, Food Service" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
