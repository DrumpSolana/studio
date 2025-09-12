
'use client';

import { useState } from 'react';
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
import { ArrowLeft } from 'lucide-react';

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
  phoneNumber: z.string().optional(),
  businessAddress: z.string().optional(),
  industry: z.string().optional(),
});

function SignUpForm({ onBack }: { onBack: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement sign-up logic
    console.log(values);
    alert('Sign-up submitted! (See console for values)');
  }

  return (
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
                    <Input className="bg-white border-black border-2 text-black" type="password" {...field} />
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
                    <FormLabel className="text-black font-solway">Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input className="bg-white border-black border-2 text-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-solway">Business Address (Optional)</FormLabel>
                    <FormControl>
                      <Input className="bg-white border-black border-2 text-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-solway">Industry (Optional)</FormLabel>
                    <FormControl>
                      <Input className="bg-white border-black border-2 text-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit" className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">Apply</Button>
            <Button variant="ghost" onClick={onBack} className="w-full text-black font-solway">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to options
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function InitialSelection({ onApply, onLogin }: { onApply: () => void; onLogin: () => void }) {
    return (
        <Card className="w-full max-w-md bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline text-black">Business Portal</CardTitle>
                <CardDescription className="font-solway text-black/80">
                    Manage your Drump loyalty program and rewards.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <Button onClick={onApply} className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">Apply for an Account</Button>
                <Button onClick={onLogin} variant="outline" className="w-full bg-white text-black font-bold border-2 border-black hover:bg-gray-100 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">
                    Login
                </Button>
            </CardContent>
        </Card>
    );
}


export default function ForBusinessPage() {
  const [view, setView] = useState<'initial' | 'apply'>('initial');

  const handleLoginClick = () => {
    // We will navigate to the login page. We're using a simple anchor tag for now, but this will be a Next.js Link.
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
       <div className="absolute top-4 left-4">
            <Button asChild variant="ghost">
                <Link href="/">&larr; Back to Home</Link>
            </Button>
        </div>
      
      {view === 'initial' && <InitialSelection onApply={() => setView('apply')} onLogin={handleLoginClick} />}
      
      {view === 'apply' && <SignUpForm onBack={() => setView('initial')} />}

    </div>
  );
}

    