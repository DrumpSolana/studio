
import * as admin from 'firebase-admin';

// This is the recommended way to initialize Firebase Admin in a Next.js server environment.
// It ensures that the SDK is initialized only once.

// Check if the Base64 environment variable exists before initializing.
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 && !admin.apps.length) {
  try {
    const serviceAccountJson = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(serviceAccountJson);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    // Provide a more helpful error message if decoding or parsing fails.
    console.error('Firebase Admin SDK initialization failed:', error.message);
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 in your .env file could not be decoded or parsed. Ensure it is a valid Base64 string from a correctly formatted service account key.');
  }
}

// Export the initialized admin instance.
export { admin };
