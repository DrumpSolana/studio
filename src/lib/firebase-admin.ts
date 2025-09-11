
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';

// This function handles the initialization of the Firebase Admin SDK.
// It ensures that it's only initialized once, which is crucial in a serverless environment like Next.js.
function initializeAdminApp(): App {
  // If an app is already initialized, return it to prevent errors.
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }

  // First, ensure the environment variable is actually set.
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. The application cannot initialize Firebase Admin SDK.');
  }

  let serviceAccount;
  try {
    // Parse the service account key from the environment variable.
    serviceAccount = JSON.parse(serviceAccountKey);
  } catch (e: any) {
    // Throw a clear error if the key is not valid JSON.
    throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY as JSON. Please ensure it's a valid JSON object in your .env file. Original Error: ${e.message}`);
  }

  // Now, initialize the app with the parsed credentials.
  try {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    // Catch any other initialization errors from Firebase.
    throw new Error(`Firebase Admin SDK initialization failed. Error: ${error.message}`);
  }
}

let app: App | undefined;

// This function provides a singleton instance of the Firebase Admin App.
export function getAdminApp(): App {
  if (!app) {
    app = initializeAdminApp();
  }
  return app;
}

// This function provides a singleton instance of the Firestore database.
export function getDb(): Firestore {
  const initializedApp = getAdminApp();
  return admin.firestore(initializedApp);
}
