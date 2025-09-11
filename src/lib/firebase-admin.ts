
import * as admin from 'firebase-admin';

// This is the recommended way to initialize Firebase Admin in a Next.js server environment.
// It ensures that the SDK is initialized only once.

// Ensure the service account key environment variable exists.
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in the environment variables. Please add it to your .env file.');
}

// Initialize Firebase Admin only if it hasn't been initialized yet.
if (!admin.apps.length) {
  try {
    // The service account key from an environment variable needs to be parsed from a string.
    // The replace call is crucial for handling the newline characters in the private key.
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n')
    );
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    // Provide a more helpful error message if JSON parsing fails.
    console.error('Firebase Admin SDK initialization failed:', error.message);
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY in your .env file is not a valid JSON string. Please check its formatting and ensure it is on a single line.');
  }
}

// Export the initialized admin instance.
export { admin };
