
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
import { ArrowLeft, Eye, EyeOff, Check, ChevronsUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { countries } from '@/lib/countries';
import { cn } from '@/lib/utils';

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
  country: z.string({
    required_error: 'Please select a country.',
  }),
  phoneNumber: z.string().optional(),
  businessAddress: z.string().optional(),
  industry: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function SignUpFormPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
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
     <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 py-12 relative z-10">
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
                 <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-black font-solway">Country</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between bg-white border-black border-2 text-black",
                                !field.value && "text-black/60"
                              )}
                            >
                              {field.value
                                ? countries.find(
                                    (country) => country.value === field.value
                                  )?.label
                                : "Select a country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                           <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                {countries.map((country) => (
                                    <CommandItem
                                      value={country.label}
                                      key={country.value}
                                      onSelect={() => {
                                          form.setValue("country", country.value)
                                      }}
                                    >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        country.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                    />
                                    {country.label}
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                           </Command>
                        </PopoverContent>
                      </Popover>
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
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="bg-white border-black border-2 text-black">
                                    <SelectValue placeholder="Select an industry" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white text-black border-black">
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="food-service">Food Service</SelectItem>
                                <SelectItem value="hospitality">Hospitality</SelectItem>
                                <SelectItem value="e-commerce">E-commerce</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <Button type="submit" className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">Apply</Button>
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
