
import * as admin from 'firebase-admin';

// This check ensures that we only initialize the app once
if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set or is empty.');
    }
    
    const serviceAccount = JSON.parse(serviceAccountKey);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase Admin SDK initialization failed:', error);
    // We are not re-throwing the error here to avoid crashing the server on startup.
    // The functions that use the admin SDK will fail gracefully if initialization fails.
  }
}

// Export the initialized admin instance.
// Other files can now import this and use services like admin.auth() and admin.firestore().
export const adminAuth = admin.apps.length ? admin.auth() : null;
export const db = admin.apps.length ? admin.firestore() : null;

export default admin;
