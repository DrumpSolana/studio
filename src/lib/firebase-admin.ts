
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

// Use a symbol for the cache key to avoid collisions with other global variables.
const CACHE_KEY = Symbol.for('firebase-admin-cache');

// Extend the NodeJS.Global interface to declare our custom cache property.
declare global {
  var [CACHE_KEY]: FirebaseAdminCache | undefined;
}

/**
 * Initializes the Firebase Admin SDK and caches the instances.
 * This function uses a global cache to prevent re-initialization during 
 * Next.js hot-reloads in development, which is the root cause of the error.
 */
function initializeAdminApp(): FirebaseAdminCache {
  // If the instance is already cached, return it immediately.
  if (global[CACHE_KEY]) {
    return global[CACHE_KEY];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. The application cannot initialize Firebase Admin SDK.');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    
    // Check if an app is already initialized to be absolutely sure.
    const app = admin.apps.length > 0 
        ? admin.app() 
        : admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });

    const auth = admin.auth(app);
    const db = admin.firestore(app);

    // Cache the initialized instances on the global object.
    global[CACHE_KEY] = { app, auth, db };
    
    return global[CACHE_KEY];

  } catch (error: any) {
    // Provide a clearer error message for parsing or initialization failures.
    console.error('Full parsing/initialization error:', error);
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
