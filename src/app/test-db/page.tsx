'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function TestDbPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string; docId?: string } | null>(null);

  const handleTestDatabase = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      // Attempt to write a document to a 'test-entries' collection
      const docRef = await addDoc(collection(db, 'test-entries'), {
        message: 'This is a test document.',
        createdAt: new Date(), // Using client-side timestamp for simplicity and reliability
      });

      console.log('Document written with ID: ', docRef.id);
      setResult({
        status: 'success',
        message: 'Successfully wrote a document to the database.',
        docId: docRef.id,
      });

    } catch (error: any) {
      console.error('Database write error:', error);
      setResult({
        status: 'error',
        message: `Failed to write to database. Error: ${error.message} (Code: ${error.code})`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
        <div className="absolute top-4 left-4">
            <Button asChild variant="outline">
                <Link href="/">&larr; Back to Home</Link>
            </Button>
        </div>
      <Card className="w-full max-w-lg bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-black">Database Connection Test</CardTitle>
          <CardDescription className="font-solway text-black/80">
            Click the button below to perform a test write to your Firestore database.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            onClick={handleTestDatabase}
            disabled={isLoading}
            className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Run Database Test'}
          </Button>

          {result && (
            <div className="mt-6 p-4 border-2 border-black rounded-lg bg-gray-100 text-left">
              <div className="flex items-center">
                {result.status === 'success' ? (
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500 mr-3" />
                )}
                <h3 className={`text-lg font-bold ${result.status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {result.status === 'success' ? 'Success!' : 'Error!'}
                </h3>
              </div>
              <p className="font-solway text-black/80 mt-2 break-words">{result.message}</p>
              {result.docId && (
                 <p className="font-solway text-black/80 mt-1">
                    Document ID: <span className="font-mono bg-gray-200 p-1 rounded text-sm">{result.docId}</span>
                </p>
              )}
               <p className="font-solway text-black/80 mt-4">
                  You can verify this in the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold hover:underline">Firebase Console</a> by navigating to Firestore Database and looking for the `test-entries` collection.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
