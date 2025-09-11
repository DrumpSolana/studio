
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  // For debugging: Log the beginning of the environment variable to check its content.
  console.log("Private key sample:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.slice(0, 100));

  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountString) {
      throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }

    const serviceAccount = JSON.parse(serviceAccountString);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        // Important: replace escaped newlines with actual newlines
        privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization failed:', error.message);
    throw new Error(`Firebase Admin SDK initialization failed. This is likely due to a malformed service account key. Original error: ${error.message}`);
  }
}

export { admin };
export const db = admin.firestore();
