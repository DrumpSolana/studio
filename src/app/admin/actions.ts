
'use server';

import { admin } from '@/lib/firebase-admin';
import type { Timestamp } from 'firebase-admin/firestore';

// A server-side utility to convert an array of objects to a CSV string.
function convertToCsv(data: any[]): string {
  if (!data || data.length === 0) {
    return '';
  }
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row => 
      headers.map(fieldName => {
        // Stringify and handle commas and quotes within fields
        const value = row[fieldName] ?? '';
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        // Escape double quotes by doubling them, and wrap in double quotes if it contains commas or newlines
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
}


export async function getEmailsAsCsv() {
  try {
    const db = admin.firestore();
    const preOrdersCollection = db.collection('pre-orders');
    const snapshot = await preOrdersCollection.get();

    if (snapshot.empty) {
      return { csv: null, error: 'No pre-order emails found.' };
    }

    const emails = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp as Timestamp | undefined;
        return {
            email: data.email,
            // Convert Firestore timestamp to a readable date, if it exists
            timestamp: timestamp?.toDate()?.toISOString() || ''
        }
    });

    const csvString = convertToCsv(emails);
    return { csv: csvString };
  } catch (error) {
    console.error('Error fetching emails from Firestore:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return { error: errorMessage };
  }
}
