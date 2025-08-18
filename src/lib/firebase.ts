
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  "projectId": "drump-landing-page",
  "appId": "1:256654255818:web:96d5b955d2ff8506403633",
  "storageBucket": "drump-landing-page.firebasestorage.app",
  "apiKey": "AIzaSyCeQ9lDlX91r6N9XOVYLwfO6wntmmBgyiQ",
  "authDomain": "drump-landing-page.firebaseapp.com",
  "measurementId": "G-BTB79XW4G9",
  "messagingSenderId": "256654255818"
};

let app: FirebaseApp;
if (typeof window !== 'undefined' && !getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps().length > 0 ? getApp() : ({} as FirebaseApp);
}

const analytics: Promise<Analytics | null> = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : Promise.resolve(null);

export const logAnalyticsEvent = async (eventName: string, params?: { [key: string]: any }) => {
    const analyticsInstance = await analytics;
    if (analyticsInstance) {
      firebaseLogEvent(analyticsInstance, eventName, params);
    } else {
      console.log(`Analytics not supported or not initialized, event not logged: ${eventName}`);
    }
};

export { app, analytics };
