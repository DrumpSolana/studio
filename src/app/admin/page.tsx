
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getEmailsAsCsv } from './actions';
import { Loader2, Download } from 'lucide-react';
import { logAnalyticsEvent } from '@/lib/firebase';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsLoading(true);
    logAnalyticsEvent('export_csv_start');
    try {
      const { csv, error } = await getEmailsAsCsv();

      if (error) {
        throw new Error(error);
      }

      if (csv) {
        // Create a blob from the CSV string
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-s-8;' });
        
        // Create a link element
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        
        // Create a filename
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `pre-orders-${date}.csv`);
        
        // Append to and click the link
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: 'Export successful!',
          description: 'Your CSV file has been downloaded.',
        });
        logAnalyticsEvent('export_csv_success');
      } else {
         throw new Error('No data available to export.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Export failed:', errorMessage);
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: errorMessage,
      });
      logAnalyticsEvent('export_csv_error', { error_message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="container mx-auto max-w-md text-center p-8">
        <div className="bg-secondary/20 border-2 border-border p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold font-headline text-white mb-2">Admin Panel</h1>
            <p className="text-white/80 mb-6">Export pre-order email list.</p>
            <Button
                onClick={handleExport}
                disabled={isLoading}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        <Download className="mr-2" />
                        Export Emails to CSV
                    </>
                )}
            </Button>
        </div>
      </div>
    </div>
  );
}
