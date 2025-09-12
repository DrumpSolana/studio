
import * as admin from 'firebase-admin';
import { serviceAccount } from './firebase-service-account';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
     console.error('Firebase Admin SDK initialization failed:', error.message);
     throw new Error(`Firebase Admin SDK failed to initialize. This is likely due to a malformed or improperly encoded service account key. Original error: ${error.message}`);
  }
}

export { admin };
