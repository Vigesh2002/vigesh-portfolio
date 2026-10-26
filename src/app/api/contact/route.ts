import { NextResponse } from 'next/server';
import { resend } from '@/lib/email';
import { contactSchema, type ContactInput } from '@/lib/validations/contact';

interface Attempt {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;

/** In-memory store keyed by IP. Replace with Redis for multi-instance deploys. */
const rateLimitStore = new Map<string, Attempt>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now > current.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_ATTEMPTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip')?.trim() ?? '';
}

export async function POST(request: Request) {
  if (!resend) {
    console.error('RESEND_API_KEY is not set in the environment.');
    return NextResponse.json(
      { success: false, message: 'Server configuration error.' },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    console.error('CONTACT_TO_EMAIL is not set in the environment.');
    return NextResponse.json(
      { success: false, message: 'Server configuration error.' },
      { status: 500 },
    );
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let payload: ContactInput;

  try {
    payload = (await request.json()) as ContactInput;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed.',
        errors: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact Form <${process.env.RESEND_FROM ?? 'onboarding@resend.dev'}>`,
      to: [to],
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send email. Please try again later.',
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Email dispatch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send email. Please try again later.',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true, message: 'Message sent successfully.' },
    { status: 200 },
  );
}
