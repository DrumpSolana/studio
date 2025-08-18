
'use client';

// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, type Analytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "drump-landing-page",
  "appId": "1:256654255818:web:96d5b955d2ff8506403633",
  "storageBucket": "drump-landing-page.firebasestorage.app",
  "apiKey": "AIzaSyCeQ9lDlX91r6N9XOVYLwfO6wntmmBgyiQ",
  "authDomain": "drump-landing-page.firebaseapp.com",
  "measurementId": "G-BTB79XW4G9",
  "messagingSenderId": "256654255818"
};

// Initialize Firebase App
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Initialize Analytics only on the client side
const analytics: Promise<Analytics | null> = typeof window !== 'undefined' 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null) 
  : Promise.resolve(null);

export const logAnalyticsEvent = async (eventName: string, params?: { [key: string]: any }) => {
    const analyticsInstance = await analytics;
    if (analyticsInstance) {
      try {
        firebaseLogEvent(analyticsInstance, eventName, params);
      } catch (error) {
        console.error('Failed to log analytics event:', error);
      }
    }
};

export { app, db, analytics };
