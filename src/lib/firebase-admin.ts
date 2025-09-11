
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';

let app: App | undefined;

function initializeAdminApp(): App {
  // If an app is already initialized, return it to prevent re-initialization errors.
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. The application cannot initialize Firebase Admin SDK.');
  }

  try {
    // Directly parse the environment variable.
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    if (!serviceAccount.project_id) {
        throw new Error('Service account key is not a valid JSON object. Please ensure it is correctly formatted in the .env file.');
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e: any) {
    throw new Error(`Failed to parse service account key from environment variable. Please check the format. Error: ${e.message}`);
  }
}

export function getAdminApp(): App {
  if (!app) {
    app = initializeAdminApp();
  }
  return app;
}

export function getDb(): Firestore {
  const initializedApp = getAdminApp();
  return admin.firestore(initializedApp);
}
