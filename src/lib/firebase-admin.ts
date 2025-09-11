
import * as admin from 'firebase-admin';

export async function getFirebaseAdmin() {
    if (!admin.apps.length) {
        try {
            const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
            if (!serviceAccountKey) {
                throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set or is empty.');
            }
            
            const serviceAccount = JSON.parse(serviceAccountKey);

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
