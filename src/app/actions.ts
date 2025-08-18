
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function savePreOrderEmail(email: string) {
  if (!db) {
    // This case should not happen with the corrected firebase.ts
    console.error("Firestore is not initialized.");
    return { success: false, error: 'Firestore is not initialized.' };
  }

  try {
    const docRef = await addDoc(collection(db, 'pre-orders'), {
      email: email,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true };
  } catch (error) {
    console.error('Error writing document to Firestore: ', error);
    // Return a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : 'Failed to save email due to an unknown error.';
    return { success: false, error: errorMessage };
  }
}
