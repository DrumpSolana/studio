
'use server';

import * as admin from 'firebase-admin';

export async function getFirebaseAdmin() {
    if (!admin.apps.length) {
        try {
            const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
            if (!serviceAccountKey) {
                throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set or is empty.');
            }
            
            // The key is often stringified twice, and newlines are escaped.
            // We need to parse it once to a string, then replace escaped newlines.
            const keyAsString = JSON.parse(JSON.stringify(serviceAccountKey));
            const correctedKey = keyAsString.replace(/\\n/g, '\n');
            const serviceAccount = JSON.parse(correctedKey);

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } catch (error: any) {
            const originalErrorMessage = error.message;
            const newError = `Firebase Admin SDK initialization failed. Please ensure the FIREBASE_SERVICE_ACCOUNT_KEY in your .env file is a valid, single-line JSON object. Original Error: ${originalErrorMessage}`;
            console.error(newError);
            throw new Error(newError);
        }
    }
    return admin;
}
