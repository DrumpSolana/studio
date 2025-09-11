
import * as admin from 'firebase-admin';

// This is the recommended way to initialize Firebase Admin in a Next.js server environment.
// It ensures that the SDK is initialized only once.

// First, check if the environment variable exists.
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in the environment variables. Please add it to your .env file.');
}

// Then, check if the app is already initialized.
if (!admin.apps.length) {
    let serviceAccount;
    try {
        // The service account key from an environment variable needs to be parsed.
        // It's often a stringified JSON. We also handle the escaped newlines in the private key.
        const keyWithNewlines = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n');
        serviceAccount = JSON.parse(keyWithNewlines);
    } catch (error: any) {
        // This catch block provides a much clearer error if the key is malformed.
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Ensure it is a valid, single-line JSON string in your .env file.', error.message);
        throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY in your .env file is not a valid JSON string. Please check its formatting.');
    }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization failed.', error);
    throw new Error(`Firebase Admin SDK failed to initialize. Original error: ${error.message}`);
  }
}

// Export the initialized admin instance for use in server-side code.
export { admin };
