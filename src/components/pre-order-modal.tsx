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
import { toast } from '@/hooks/use-toast';

const PreOrderSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

type PreOrderForm = z.infer<typeof PreOrderSchema>;

const socialLinks = [
  { 
    src: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752642254/Group_wlvy8u.png', 
    href: 'https://t.me/drumpofficial', 
    name: 'Telegram',
    text: 'Join on Telegram'
  },
  { 
    src: 'https://res.cloudinary.com/dwimflmjr/image/upload/v1752642253/Group_1_ixqd33.png', 
    href: '#', 
    name: 'X',
    text: 'Join on X'
  },
];

export default function PreOrderModal() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreOrderForm>({
    resolver: zodResolver(PreOrderSchema),
  });

  const onSubmit: SubmitHandler<PreOrderForm> = (data) => {
    console.log('Pre-order email submitted:', data.email);
    toast({
      title: "Thanks for your interest!",
      description: "Redirecting you to our Telegram group...",
    });
    
    // In a real app, you would send the email to your backend here.

    setTimeout(() => {
      window.location.href = 'https://t.me/drumpofficial';
      setOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-background"
        >
          Pre order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary border-black border-4 rounded-lg">
        <DialogHeader className="text-center items-center">
            <Image 
                src="https://res.cloudinary.com/dwimflmjr/image/upload/v1752640504/Drump_Cheese_Ball_4_daedqc.png"
                alt="Drump Cheeseball"
                width={80}
                height={80}
            />
          <DialogTitle className="font-headline text-2xl text-black">
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
              className="bg-white border-black border-2 focus:ring-primary text-black placeholder:text-black/50"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
          >
            Notify Me
          </Button>
        </form>
        <DialogFooter className="flex-col !justify-center space-y-4">
            <div className="text-center font-solway text-sm text-black/70">Or join our community</div>
            <div className="flex justify-center gap-4">
                {socialLinks.map((link) => (
                    <Button key={link.name} asChild variant="outline" className="bg-white border-2 border-black hover:bg-white/80 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] hover:shadow-none transition-shadow">
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-black">
                             <div className="relative h-5 w-5 mr-2">
                                <Image src={link.src} alt={link.name} fill objectFit="contain" />
                            </div>
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
