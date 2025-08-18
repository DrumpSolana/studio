
'use client';

// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "drump-landing-page",
  "appId": "1:256654255818:web:96d5b955d2ff8506403633",
  "storageBucket": "drump-landing-page.firebasestorage.app",
  "apiKey": "AIzaSyCeQ9lDlX91r6N9XOVYLwfO6wntmmBgyiQ",
  "authDomain": "drump-landing-page.firebaseapp.com",
  "measurementId": "G-MT3LG8V1N2",
  "messagingSenderId": "256654255818"
};

// Initialize Firebase App
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
