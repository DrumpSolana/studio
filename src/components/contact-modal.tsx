
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
import Image from 'next/image';
import { logGtagEvent } from '@/lib/gtag';

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

export default function ContactModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  
  const trigger = children ?? (
    <button className="text-white/90 hover:text-white transition-colors duration-300 font-medium text-sm group">
        Contact Us
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary"></span>
    </button>
  );

  const handleOpenChange = (isOpen: boolean) => {
    if(isOpen) {
        logGtagEvent('open_modal', { modal_name: 'contact_us' });
    }
    setOpen(isOpen);
  }

  const handleSocialClick = (socialName: string) => {
    logGtagEvent('social_click', {
        location: 'contact_modal',
        social_platform: socialName,
    });
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
            Get In Touch!
          </DialogTitle>
          <DialogDescription className="font-solway text-black/80">
            Follow us and send a DM with any questions. We'd love to hear from you!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="!flex-col !justify-center space-y-4 sm:!space-y-4 sm:!justify-center pt-4">
            <div className="flex flex-row justify-center gap-4">
                {socialLinks.map((link) => (
                    <Button key={link.name} asChild variant="outline" className="font-solway bg-white border-2 border-black hover:bg-white/80 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] hover:shadow-none transition-shadow h-12 px-6">
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-black flex items-center justify-center" onClick={() => handleSocialClick(link.name)}>
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
