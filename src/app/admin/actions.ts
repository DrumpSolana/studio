
'use server';

import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

interface ServiceAccount {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
}

// Prepare the service account credentials
// IMPORTANT: The private key needs its newlines escaped to be parsed correctly from an environment variable.
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize Firebase Admin SDK if not already initialized
let adminApp: App;
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  adminApp = getApps()[0];
}

const db = getFirestore(adminApp);

function convertToCsv(data: { email: string; timestamp: string }[]): string {
    if (!data.length) {
        return '';
    }
    const headers = 'email,timestamp\n';
    const rows = data.map(row => `${row.email},${row.timestamp}`).join('\n');
    return headers + rows;
}

export async function getEmailsAsCsv(): Promise<{ csv?: string; error?: string }> {
  try {
    const preOrdersCollection = db.collection('pre-orders');
    const snapshot = await preOrdersCollection.orderBy('timestamp', 'desc').get();

    if (snapshot.empty) {
      return { error: 'No pre-orders found.' };
    }

    const data = snapshot.docs.map(doc => {
        const docData = doc.data();
        const timestamp = docData.timestamp?.toDate()?.toISOString() || 'N/A';
        return {
            email: docData.email || 'N/A',
            timestamp: timestamp
        };
    });

    const csv = convertToCsv(data);
    return { csv };

  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate CSV due to an unknown server error.';
    return { error: errorMessage };
  }
}
