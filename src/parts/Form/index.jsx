'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

/**
 * Form Component
 *
 * A reusable form component that handles form submissions with server actions.
 * Includes built-in loading states, error handling, and success messages.
 *
 * @example
 * // Basic usage
 * <Form />
 *
 * // Custom server action
 * async function handleSubmit(prevState, formData) {
 *   const name = formData.get('name');
 *   const email = formData.get('email');
 *
 *   // Validate
 *   if (!name || !email) {
 *     return { error: 'All fields required' };
 *   }
 *
 *   // Submit to API
 *   try {
 *     await submitToAPI({ name, email });
 *     return { success: true };
 *   } catch (err) {
 *     return { error: err.message };
 *   }
 * }
 *
 * // Use with custom fields
 * function ContactForm() {
 *   const [state, formAction] = useActionState(handleSubmit, {});
 *   const { pending } = useFormStatus();
 *
 *   return (
 *     <form action={formAction}>
 *       <input name="name" required />
 *       <input name="email" type="email" required />
 *       <button disabled={pending}>
 *         {pending ? 'Sending...' : 'Send'}
 *       </button>
 *     </form>
 *   );
 * }
 */

// Example server action (would normally be in a separate file)
async function submitForm(prevState, formData) {
    // prevState is provided by useActionState but not used in this example
    // It would be useful for maintaining form state between submissions
    // For example, to accumulate errors or preserve valid fields

    // Call Netlify function
    try {
        const response = await fetch('/.netlify/functions/submit-form', {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        await response.json();
    } catch (error) {
        return { error: 'Failed to submit form' };
    }

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return { error: 'All fields are required' };
    }

    return { success: true };
}

// Main Form component
export default function Form() {
    const [state, formAction] = useActionState(submitForm, {});
    const { pending } = useFormStatus();

    return (
        <form action={formAction}>
            {state.error && <div>{state.error}</div>}
            {state.success && <div>Form submitted successfully!</div>}

            <formfield>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
            </formfield>

            <formfield>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </formfield>

            <button type="submit" disabled={pending}>
                {pending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}
