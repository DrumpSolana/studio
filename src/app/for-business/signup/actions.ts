
'use server';

import { z } from 'zod';
import { admin } from '@/lib/firebase-admin';

const formSchema = z.object({
  businessName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().optional(),
  businessAddress: z.string().optional(),
  industry: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export async function createBusinessAccount(data: FormData): Promise<{ success: boolean; error?: string }> {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const { email, password, businessName, phoneNumber, businessAddress, industry } = validation.data;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: businessName,
    });
    
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'owner' });

    await admin.firestore().collection('businesses').doc(userRecord.uid).set({
      ownerUid: userRecord.uid,
      businessName,
      contactEmail: email,
      phoneNumber: phoneNumber || null,
      businessAddress: businessAddress || null,
      industry: industry || null,
      status: 'Pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      roles: {
        [userRecord.uid]: 'owner',
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error creating business account:', error);
    let errorMessage = 'An unexpected error occurred.';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'An account with this email address already exists.';
    } else if (error.code === 'auth/invalid-password') {
      errorMessage = 'The password is not strong enough.';
    }
    return { success: false, error: errorMessage };
  }
}
