
'use server';

import { z } from 'zod';
import { admin } from '@/lib/firebase-admin';

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
  
  try {
    const adminAuth = admin.auth();
    const db = admin.firestore();

    // Check if a user with this email already exists in Firebase Auth.
    try {
        await adminAuth.getUserByEmail(email);
        // If the above line does not throw, the user exists.
        return {
            success: false,
            message: 'An account with this email already exists.',
            errors: { _form: ['An account with this email already exists.'] },
        };
    } catch (error: any) {
        // 'auth/user-not-found' is the expected error if the user doesn't exist.
        // If it's any other error, we should rethrow it to the outer catch block.
        if (error.code !== 'auth/user-not-found') {
            throw error;
        }
    }

    // Create the new user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: businessName,
      emailVerified: false, 
      disabled: true, // The account is disabled until an admin approves it
    });

    // Create a corresponding business document in Firestore
    const businessData = {
      ownerId: userRecord.uid,
      businessName,
      email,
      phone,
      address,
      industry,
      status: 'pending_approval',
      role: 'business_owner',
      createdAt: new Date().toISOString(),
    };

    // Use the user's UID as the document ID for easy lookup
    await db.collection('businesses').doc(userRecord.uid).set(businessData);

    return {
      success: true,
      message: 'Account created successfully and is pending review.',
    };
  } catch (error: any) {
    console.error('Error creating business account:', error);
    
    let errorMessage = 'An unknown error occurred during account creation.';
    // Handle specific Firebase errors for more user-friendly messages.
    if (error.code === 'auth/email-already-exists') {
        errorMessage = 'An account with this email already exists.';
    } else if (error.message) {
        errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      errors: { _form: [errorMessage] },
    };
  }
}
