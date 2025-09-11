
import * as admin from 'firebase-admin';

// This is the recommended way to initialize Firebase Admin in a Next.js server environment.
// It ensures that the SDK is initialized only once.

// Check if the Base64 environment variable exists before initializing.
if (!admin.apps.length) {
  const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;

  if (!base64Key) {
    // This error is thrown if the environment variable is missing entirely.
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set. Please add it to your .env file.');
  }

  // Decode the base64 string to get the JSON service account key.
  const serviceAccountJson = Buffer.from(base64Key, 'base64').toString('utf-8');
  
  // Parse the JSON string into an object.
  const serviceAccount = JSON.parse(serviceAccountJson);

  // Initialize the Firebase Admin SDK.
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
     console.error('Firebase admin.initializeApp failed:', error.message);
     throw new Error(`Firebase Admin SDK failed to initialize. The service account key seems valid, but initialization failed. Original error: ${error.message}`);
  }
}

// Export the initialized admin instance.
export { admin };
