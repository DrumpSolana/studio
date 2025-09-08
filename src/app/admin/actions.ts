
'use server';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming you have this configured

// A server-side utility to convert an array of objects to a CSV string.
function convertToCsv(data: any[]): string {
  if (!data || data.length === 0) {
    return '';
  }
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row => 
      headers.map(fieldName => 
        JSON.stringify(row[fieldName] || '', (key, value) => 
          value === null ? '' : value
        )
      ).join(',')
    )
  ];
  
  return csvRows.join('\n');
}


export async function getEmailsAsCsv() {
  try {
    const preOrdersCollection = collection(db, 'pre-orders');
    const snapshot = await getDocs(preOrdersCollection);

    if (snapshot.empty) {
      return { csv: null, error: 'No pre-order emails found.' };
    }

    const emails = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            email: data.email,
            // Convert Firestore timestamp to a readable date, if it exists
            timestamp: data.timestamp?.toDate()?.toISOString() || ''
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
