
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountKeyBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
    
    if (!serviceAccountKeyBase64) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set.');
    }

    const serviceAccountJson = Buffer.from(serviceAccountKeyBase64, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    
  } catch (error: any) {
     console.error('Firebase Admin SDK initialization failed:', error.message);
     // Re-throw a more user-friendly error to the client.
     throw new Error(`Firebase Admin SDK failed to initialize. This is likely due to a malformed or improperly encoded service account key. Original error: ${error.message}`);
  }
}

export { admin };
