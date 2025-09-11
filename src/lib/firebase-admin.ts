
import * as admin from 'firebase-admin';

// This is the recommended way to initialize Firebase Admin in a Next.js server environment.
// It ensures that the SDK is initialized only once.

if (!admin.apps.length) {
  // Directly use the environment variable which should be the base64 encoded key.
  const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;

  if (!base64Key) {
    // This error is thrown if the environment variable is missing entirely.
    console.error('The FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set. The app cannot connect to Firebase without it.');
  } else {
      try {
        // Decode the base64 string to get the JSON service account key.
        const serviceAccountJson = Buffer.from(base64Key, 'base64').toString('utf-8');
        
        // Parse the JSON string into an object.
        const serviceAccount = JSON.parse(serviceAccountJson);

        // Initialize the Firebase Admin SDK.
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } catch (error: any) {
         console.error('Firebase Admin SDK initialization failed:', error.message);
         // Re-throw a more user-friendly error.
         throw new Error(`Firebase Admin SDK failed to initialize. This is likely due to a malformed or improperly encoded service account key. Original error: ${error.message}`);
      }
  }
}

// Export the initialized admin instance.
export { admin };
