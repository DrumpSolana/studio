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
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


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
    try {
      // Save the email to Firestore.
      await addDoc(collection(db, 'pre-orders'), {
        email: input.email,
        timestamp: serverTimestamp(),
      });
      console.log(`New pre-order signup saved to Firestore: ${input.email}`);
      return {
        success: true,
        message: 'Thank you for signing up!',
      };
    } catch (error) {
      console.error("Error writing document to Firestore: ", error);
      return {
        success: false,
        message: 'There was an error saving your email. Please try again.',
      };
    }
  }
);
