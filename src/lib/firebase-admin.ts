
'use server';

import * as admin from 'firebase-admin';

// This function will initialize the Firebase Admin SDK if it hasn't been already.
// It includes robust error handling to validate the service account key.
export async function getFirebaseAdmin() {
    if (admin.apps.length > 0) {
        return admin;
    }

    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in the environment variables. Please add it to your .env file.');
    }

    let serviceAccount;
    try {
        // The service account key from an environment variable needs to be parsed.
        // It's often a stringified JSON. We also handle the escaped newlines in the private key.
        const keyWithNewlines = serviceAccountKey.replace(/\\n/g, '\n');
        serviceAccount = JSON.parse(keyWithNewlines);
    } catch (error: any) {
        // This catch block provides a much clearer error if the key is malformed.
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Ensure it is a valid, single-line JSON string in your .env file.', error.message);
        throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY in your .env file is not a valid JSON string. Please check its formatting.');
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error: any) {
        // This catches errors during the actual initialization.
        console.error('Firebase Admin SDK initialization failed.', error);
        throw new Error(`Firebase Admin SDK failed to initialize. Original error: ${error.message}`);
    }

    return admin;
}
