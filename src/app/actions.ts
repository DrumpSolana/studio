
'use server';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';

// This is the service account config.
// DO NOT ADD THIS TO A PUBLIC REPO.
// It is recommended to use environment variables for this.
const serviceAccount = {
  "projectId": "drump-landing-page",
  "privateKey": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "clientEmail": "firebase-adminsdk-h4g7p@drump-landing-page.iam.gserviceaccount.com"
};

const getAdminApp = (): App => {
    if (getApps().length > 0) {
        return getApps()[0];
    }
    return initializeApp({
        credential: credential.cert(serviceAccount)
    });
};

const db = getFirestore(getAdminApp());

export async function savePreOrderEmail(email: string) {
  if (!db) {
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to save email due to an unknown error.';
    return { success: false, error: errorMessage };
  }
}
