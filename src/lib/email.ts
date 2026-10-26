import { Resend } from 'resend';

/**
 * Shared Resend client. Instantiated only when the key is present so importing
 * this module never throws at module load (e.g. `next build` without env vars).
 * Route handlers must check `resend` before sending.
 */
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!resend) {
  console.warn(
    'RESEND_API_KEY is not set; contact form will be non-functional.',
  );
}

export { resend };
