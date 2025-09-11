
// This is a placeholder for the login page.
// We will implement this in a future step.
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card text-card-foreground border-2 border-border">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Log In</CardTitle>
          <CardDescription>
            This page is under construction. Please check back later.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/for-business">Go Back</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
