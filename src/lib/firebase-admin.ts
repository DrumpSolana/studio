
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  // Debug logs to check if the environment variable is loaded.
  console.log("ENV exists?", !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64);
  console.log("ENV preview:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64?.substring(0, 50));

  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
    if (!serviceAccountString) {
      throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set.');
    }

    // Decode the Base64 string to get the JSON key.
    const serviceAccountJson = Buffer.from(serviceAccountString, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization failed:', error.message);
    // Re-throw a more user-friendly error.
    throw new Error(`Firebase Admin SDK failed to initialize. This is likely due to a malformed or improperly encoded service account key. Original error: ${error.message}`);
  }
}

export { admin };
export const db = admin.firestore();
