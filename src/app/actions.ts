
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function savePreOrderEmail(email: string) {
  if (!db) {
    throw new Error("Firestore is not initialized.");
  }

  try {
    await addDoc(collection(db, 'pre-orders'), {
      email: email,
      timestamp: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error writing document: ', error);
    return { success: false, error: 'Failed to save email.' };
  }
}
