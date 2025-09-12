
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ApplicationSuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4 relative z-10">
            <Card className="w-full max-w-md bg-white border-black border-4 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-3xl font-headline text-black">Application Submitted!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="font-solway text-black/80">
                        Thank you for applying. We have received your application and it is now under review. You will receive an email confirmation once your account has been approved.
                    </CardDescription>
                    <Button asChild className="w-full bg-red-600 text-white font-bold border-2 border-black hover:bg-red-700 px-8 py-3 rounded-lg text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow">
                        <Link href="/for-business/login">Back to Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

    