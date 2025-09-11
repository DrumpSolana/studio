
import * as admin from 'firebase-admin';

// This is the recommended way to initialize Firebase Admin in a Next.js server environment.
// It ensures that the SDK is initialized only once.

// Check if the Base64 environment variable exists before initializing.
if (!admin.apps.length) {
  const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;

  if (!base64Key) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set. Please add it to your .env file.');
  }

  let serviceAccountJson: string;
  try {
    serviceAccountJson = Buffer.from(base64Key, 'base64').toString('utf-8');
  } catch (error: any) {
    console.error('Failed to decode Base64 service account key:', error.message);
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not a valid Base64 string. Please re-generate and paste the key.');
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch (error: any) {
    console.error('Failed to parse service account JSON:', error.message);
    throw new Error('The decoded service account key is not valid JSON. Ensure the original key was copied correctly.');
  }

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
