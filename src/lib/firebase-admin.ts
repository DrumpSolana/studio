
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';

let app: App | undefined;
let db: Firestore | undefined;

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    app = admin.apps[0]!;
    db = admin.firestore(app);
    return;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    console.warn(
      'FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK will not be initialized.'
    );
    return;
  }

  try {
    app = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
    });
    db = admin.firestore(app);
  } catch (e) {
    console.error('Firebase admin initialization error', e);
  }
}

// Initialize on module load
initializeAdminApp();

export function getAdminApp(): App {
  if (!app) {
    throw new Error(
      'Firebase Admin app has not been initialized. Check your FIREBASE_SERVICE_ACCOUNT_KEY environment variable.'
    );
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) {
    throw new Error(
      'Firestore has not been initialized. Check your FIREBASE_SERVICE_ACCOUNT_KEY environment variable.'
    );
  }
  return db;
}

// For convenience, you might still want to export the initialized instances,
// but using the getters is safer.
export { app as adminApp, db };
