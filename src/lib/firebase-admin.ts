
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

// Define a type for our cached object to ensure type safety.
interface FirebaseAdminCache {
  app: App;
  auth: Auth;
  db: Firestore;
}

// Extend the NodeJS.Global interface to declare our custom cache property.
declare global {
  var __firebaseAdminCache: FirebaseAdminCache | undefined;
}

/**
 * This function initializes the Firebase Admin SDK and caches the instances.
 * It uses a global cache to prevent re-initialization during Next.js hot-reloads
 * in development, which is the root cause of the previous errors.
 */
function initializeAdminApp(): FirebaseAdminCache {
  // If the instance is already cached, return it immediately.
  if (global.__firebaseAdminCache) {
    return global.__firebaseAdminCache;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. The application cannot initialize Firebase Admin SDK.');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const auth = admin.auth(app);
    const db = admin.firestore(app);

    // Cache the initialized instances on the global object.
    global.__firebaseAdminCache = { app, auth, db };
    
    return global.__firebaseAdminCache;

  } catch (error: any) {
    // Provide a clearer error message for parsing or initialization failures.
    throw new Error(`Firebase Admin SDK initialization failed. Please ensure the FIREBASE_SERVICE_ACCOUNT_KEY in your .env file is a valid, single-line JSON object. Original Error: ${error.message}`);
  }
}

// Export getter functions that ensure initialization and return the cached instances.
export function getAdminApp(): App {
  return initializeAdminApp().app;
}

export function getDb(): Firestore {
  return initializeAdminApp().db;
}

export function getAdminAuth(): Auth {
    return initializeAdminApp().auth;
}
