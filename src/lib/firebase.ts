
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  "projectId": "drump-landing-page",
  "appId": "1:256654255818:web:96d5b955d2ff8506403633",
  "storageBucket": "drump-landing-page.firebasestorage.app",
  "apiKey": "AIzaSyCeQ9lDlX91r6N9XOVYLwfO6wntmmBgyiQ",
  "authDomain": "drump-landing-page.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "256654255818"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const analytics: Promise<Analytics | null> = isSupported().then(yes => yes ? getAnalytics(app) : null);

export const logAnalyticsEvent = async (eventName: string, params?: { [key: string]: any }) => {
    const analyticsInstance = await analytics;
    if (analyticsInstance) {
      firebaseLogEvent(analyticsInstance, eventName, params);
    }
  };

export { app, analytics };
