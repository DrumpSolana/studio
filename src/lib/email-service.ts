'use server';

/**
 * MOCK Email Service
 * In a real application, this would use a service like SendGrid, Resend, or Nodemailer
 * to send an actual email. For this prototype, we'll just log to the console.
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<{ success: boolean; error?: string }> {
  console.log('--- SIMULATING EMAIL SEND ---');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('Body:');
  console.log(html);
  console.log('-----------------------------');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real scenario, you would handle potential errors from the email provider
  const isSuccess = true; 

  if (isSuccess) {
    return { success: true };
  } else {
    return { success: false, error: 'Failed to send email.' };
  }
}
