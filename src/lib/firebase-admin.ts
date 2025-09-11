
import * as admin from 'firebase-admin';

// This is the recommended way to initialize Firebase Admin in a Next.js server environment.
// It ensures that the SDK is initialized only once.

if (!admin.apps.length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
    
    if (!serviceAccountKey) {
        throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set.');
    }

    try {
        const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
        const serviceAccount = JSON.parse(decodedKey);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error: any) {
         console.error('Firebase Admin SDK initialization failed:', error.message);
         // Re-throw a more user-friendly error.
         throw new Error(`Firebase Admin SDK failed to initialize. This is likely due to a malformed or improperly encoded service account key. Original error: ${error.message}`);
    }
}

// Export the initialized admin instance.
export { admin };
