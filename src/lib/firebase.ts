
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, type Analytics } from 'firebase/analytics';

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
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export const logAnalyticsEvent = (eventName: string, params?: { [key: string]: any }) => {
    if (analytics) {
      firebaseLogEvent(analytics, eventName, params);
    } else {
      // This can happen if analytics is not supported or still initializing
      console.log(`Analytics not ready, event not logged: ${eventName}`);
    }
  };

export { app };
