'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { handlePreOrderSignUp } from '@/app/actions/pre-order';

const PreOrderSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

type PreOrderForm = z.infer<typeof PreOrderSchema>;

const socialLinks = [
  { 
    href: 'https://t.me/drumpofficial', 
    name: 'Telegram',
    text: 'Telegram'
  },
  { 
    href: 'https://x.com/DrumpSolana', 
    name: 'X',
    text: 'X'
  },
];

export default function PreOrderModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PreOrderForm>({
    resolver: zodResolver(PreOrderSchema),
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<PreOrderForm> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await handlePreOrderSignUp(data);

      if (result.success) {
        toast({
          title: "Thanks for your interest!",
          description: "Redirecting you to our Telegram group...",
        });

        setTimeout(() => {
          window.open('https://t.me/drumpofficial', '_blank');
          setOpen(false);
          reset();
        }, 1500);
      } else {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: result.message || "There was a problem with your request. Please try again.",
        });
      }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Could not sign up for pre-order. Please try again later.",
        });
        console.error("Pre-order submission error:", error);
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const trigger = children ?? (
      <Button
          className="bg-yellow-400 text-black font-bold border-2 border-black hover:bg-yellow-500 px-6 py-3 rounded-lg text-base uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
      >
        Pre Order Now
      </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            Be the First to Know!
          </DialogTitle>
          <DialogDescription className="font-solway text-black/80">
            Drop your email to get notified when pre-orders go live.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              placeholder="you@email.com"
              {...register('email')}
              className="bg-white border-black border-2 focus:ring-primary text-black placeholder:text-black/50 h-12 rounded-lg font-solway"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600 font-solway">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 h-12 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow disabled:opacity-75 font-headline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Notify Me'}
          </Button>
        </form>
        <DialogFooter className="!flex-col !justify-center space-y-4 sm:!space-y-4 sm:!justify-center">
            <div className="text-center font-solway text-sm text-black/70">Or join our community</div>
            <div className="flex flex-row justify-center gap-4">
                {socialLinks.map((link) => (
                    <Button key={link.name} asChild variant="outline" className="font-solway bg-white border-2 border-black hover:bg-white/80 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] hover:shadow-none transition-shadow h-12 px-6">
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-black flex items-center justify-center">
                            {link.text}
                        </a>
                    </Button>
                ))}
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
