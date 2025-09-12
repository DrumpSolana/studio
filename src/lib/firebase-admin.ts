
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountKeyString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKeyString) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }

    const serviceAccount = JSON.parse(serviceAccountKeyString);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
      }),
    });

  } catch (error: any) {
     console.error('Firebase Admin SDK initialization failed:', error.message);
     // Re-throw a more user-friendly error to the client.
     throw new Error(`Firebase Admin SDK failed to initialize. This is likely due to a malformed or improperly encoded service account key. Original error: ${error.message}`);
  }
}

export { admin };
