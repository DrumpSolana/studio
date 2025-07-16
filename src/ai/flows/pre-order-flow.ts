'use server';
/**
 * @fileOverview A flow to handle pre-order email submissions.
 *
 * - preOrderSignUp - A function that handles the email submission process.
 * - PreOrderSignUpInput - The input type for the preOrderSignUp function.
 * - PreOrderSignUpOutput - The return type for the preOrderSignUp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PreOrderSignUpInputSchema = z.object({
  email: z.string().email().describe('The email address of the user signing up for pre-order notifications.'),
});
export type PreOrderSignUpInput = z.infer<typeof PreOrderSignUpInputSchema>;

const PreOrderSignUpOutputSchema = z.object({
  success: z.boolean().describe('Whether the signup was successful.'),
  message: z.string().describe('A message to return to the user.'),
});
export type PreOrderSignUpOutput = z.infer<typeof PreOrderSignUpOutputSchema>;


export async function preOrderSignUp(input: PreOrderSignUpInput): Promise<PreOrderSignUpOutput> {
  return preOrderSignUpFlow(input);
}

const preOrderSignUpFlow = ai.defineFlow(
  {
    name: 'preOrderSignUpFlow',
    inputSchema: PreOrderSignUpInputSchema,
    outputSchema: PreOrderSignUpOutputSchema,
  },
  async (input) => {
    console.log(`New pre-order signup: ${input.email}`);

    // In a real application, you would save the email to a database here.
    // For example, using Firestore:
    // await db.collection('pre-orders').add({ email: input.email, timestamp: new Date() });

    return {
      success: true,
      message: 'Thank you for signing up!',
    };
  }
);
