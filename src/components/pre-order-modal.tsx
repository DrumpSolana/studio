
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logAnalyticsEvent } from '@/lib/firebase';

const PreOrderSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type PreOrderFormValues = z.infer<typeof PreOrderSchema>;

export default function PreOrderModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PreOrderFormValues>({
    resolver: zodResolver(PreOrderSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<PreOrderFormValues> = async (data) => {
    setIsLoading(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted with:', data.email);
    
    // Log analytics event
    logAnalyticsEvent('pre_order_submit', { email: data.email });

    setIsLoading(false);
    setIsSubmitted(true);
    form.reset(); 
  };
  
  const trigger = children ?? (
      <Button
          className="bg-yellow-400 text-black font-bold border-2 border-black hover:bg-yellow-500 px-6 py-3 rounded-lg text-base uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
      >
        Pre Order Now
      </Button>
  );

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
        logAnalyticsEvent('open_modal', { modal_name: 'pre_order' });
    }
    setOpen(isOpen);
    // Reset form state when dialog closes
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary border-black border-4 rounded-lg p-8">
        <DialogHeader className="text-center items-center space-y-4">
            <Image 
                src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Drump_Cheese_Ball_4_daedqc.png"
                alt="Drump Cheeseball"
                width={80}
                height={80}
            />
          <DialogTitle className="font-headline text-3xl text-black">
            {isSubmitted ? 'Thanks!' : 'Join The Pre-Order List!'}
          </DialogTitle>
          <DialogDescription className="font-solway text-black/80">
            {isSubmitted
              ? "You're on the list! We'll notify you when pre-orders are live."
              : 'Be the first to know when Drump Cheeseballs are available. Drop your email below.'}
          </DialogDescription>
        </DialogHeader>
        
        {!isSubmitted && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        {...field} 
                        className="bg-white border-black border-2 text-black placeholder:text-black/50 focus:ring-black focus:ring-offset-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Join Waitlist'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
        
        {isSubmitted && (
            <DialogFooter>
                <Button 
                  onClick={() => setOpen(false)}
                  className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
                >
                  Close
                </Button>
            </DialogFooter>
        )}

      </DialogContent>
    </Dialog>
  );
}
