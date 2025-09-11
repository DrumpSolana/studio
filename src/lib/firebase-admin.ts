
import * as admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import * as path from 'path';
import * as fs from 'fs';

let app: App | undefined;

function initializeAdminApp(): App {
  if (admin.apps.length > 0 && admin.apps[0]) {
    return admin.apps[0];
  }

  // Path to the service account key file
  const serviceAccountKeyPath = path.resolve(process.cwd(), 'src/lib/server/firebase-service-account-key.json');

  if (!fs.existsSync(serviceAccountKeyPath)) {
      throw new Error(`Firebase service account key file not found at: ${serviceAccountKeyPath}. Please ensure the file exists and contains your service account credentials.`);
  }

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountKeyPath, 'utf8'));

    // Check if the file has content
    if (!serviceAccount || Object.keys(serviceAccount).length === 0 || serviceAccount.type !== 'service_account') {
        throw new Error('Service account key file is empty, malformed, or not a valid service account key. Please paste the correct JSON content into firebase-service-account-key.json.');
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e: any) {
    throw new Error(`Firebase admin initialization error: Failed to parse service account key from file. ${e.message}`);
  }
}

export function getAdminApp(): App {
  if (!app) {
    app = initializeAdminApp();
  }
  return app;
}

export function getDb(): Firestore {
  const initializedApp = getAdminApp();
  return admin.firestore(initializedApp);
}
