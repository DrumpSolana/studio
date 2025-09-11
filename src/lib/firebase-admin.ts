
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

let app: App;
let auth: Auth;
let db: Firestore;

try {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
  }

  const serviceAccount = JSON.parse(serviceAccountKey);

  if (!admin.apps.length) {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    app = admin.app();
  }

  auth = admin.auth(app);
  db = admin.firestore(app);

} catch (error: any) {
  console.error('Firebase Admin SDK initialization failed:', error);
  // We don't re-throw the error here, so the app can still run.
  // Getter functions will handle the uninitialized state.
}


export function getAdminApp(): App {
  if (!app) {
    throw new Error('Firebase Admin SDK has not been initialized. Check server logs for the reason.');
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) {
    throw new Error('Firebase Admin SDK has not been initialized. Check server logs for the reason.');
  }
  return db;
}

export function getAdminAuth(): Auth {
  if (!auth) {
    throw new Error('Firebase Admin SDK has not been initialized. Check server logs for the reason.');
  }
  return auth;
}
