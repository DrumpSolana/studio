'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PreOrderSchema = z.object({
  email: z.string().email(),
});

export async function handlePreOrderSignUp(input: { email: string }) {
  const parsed = PreOrderSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid email address.',
    };
  }

  try {
    await addDoc(collection(db, 'pre-orders'), {
      email: parsed.data.email,
      timestamp: serverTimestamp(),
    });
    console.log(`New pre-order signup saved to Firestore: ${parsed.data.email}`);
    return {
      success: true,
      message: 'Thank you for signing up!',
    };
  } catch (error) {
    console.error("Error writing document to Firestore: ", error);
    return {
      success: false,
      message: 'There was an error saving your email. Please try again.',
    };
  }
}
