
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';

let app: App | undefined;

function initializeAdminApp(): App {
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK cannot be initialized.'
    );
  }

  try {
    // Stringify and then re-parse to handle multi-line environment variables.
    // This ensures that newline characters in the key are correctly interpreted.
    const parsedCredentials = JSON.parse(serviceAccountKey);

    return admin.initializeApp({
      credential: admin.credential.cert(parsedCredentials),
    });
  } catch (e: any) {
    // Throw a more informative error if parsing fails
    throw new Error(`Firebase admin initialization error: Failed to parse service account key. ${e.message}`);
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
