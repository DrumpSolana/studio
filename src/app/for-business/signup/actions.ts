
'use server';

import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase-admin';
import { z } from 'zod';

const SignUpSchema = z.object({
  businessName: z.string().min(1, 'Business name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(1, 'Phone number is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  address: z.string().optional(),
  industry: z.string().optional(),
});

export type SignUpFormState = {
  success: boolean;
  message: string;
  errors?: {
    businessName?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    address?: string[];
    industry?: string[];
    _form?: string[];
  } | null;
};

export async function createBusinessAccount(
  prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpSchema.safeParse({
    businessName: formData.get('businessName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    address: formData.get('address'),
    industry: formData.get('industry'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please check the form for errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, businessName, phone, address, industry } = validatedFields.data;
  const auth = getAuth(adminApp);

  try {
    // Check if user already exists
    try {
        await auth.getUserByEmail(email);
        return {
            success: false,
            message: 'An account with this email already exists.',
            errors: { _form: ['An account with this email already exists.'] },
        };
    } catch (error: any) {
        if (error.code !== 'auth/user-not-found') {
            throw error; // Re-throw unexpected errors
        }
        // If user does not exist, continue.
    }


    const userRecord = await auth.createUser({
      email,
      password,
      displayName: businessName,
      emailVerified: false, // You might want to implement an email verification flow
    });

    const businessData = {
      uid: userRecord.uid,
      businessName,
      email,
      phone,
      address: address || '',
      industry: industry || '',
      status: 'pending', // 'pending', 'approved', 'rejected'
      role: 'owner',
      createdAt: new Date().toISOString(),
    };

    await db.collection('businesses').doc(userRecord.uid).set(businessData);

    return {
      success: true,
      message: 'Thank you for registering! Your application is now under review. We will notify you by email within 1-2 business days.',
    };
  } catch (error: any) {
    console.error('Error creating business account:', error);
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if(error.code === 'auth/email-already-exists') {
        errorMessage = 'An account with this email already exists.';
    }
    return {
      success: false,
      message: errorMessage,
      errors: { _form: [errorMessage] },
    };
  }
}
