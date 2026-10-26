'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from '@/constants/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { contactSchema, type ContactInput } from '@/lib/validations/contact';

const baseFormClasses =
  'w-full min-h-11 rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50';

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactInput) {
    setServerError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data: { success?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ?? 'Something went wrong. Please try again.',
        );
      }

      reset();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Something went wrong.',
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      {/* Honeypot — bots fill it in, humans can't see it. */}
      <div className="hidden">
        <label htmlFor="website">
          Leave this empty{' '}
          <input id="website" {...register('website')} tabIndex={-1} />
        </label>
      </div>

      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={baseFormClasses}
          {...register('name')}
          required
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-destructive text-xs">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={baseFormClasses}
          {...register('email')}
          required
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-destructive text-xs">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          placeholder="How can I help you?"
          rows={5}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={baseFormClasses}
          {...register('message')}
          required
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="text-destructive text-xs"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-destructive text-sm">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-11 w-full gap-2"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
        {!isSubmitting && <Send className="size-4" aria-hidden="true" />}
      </Button>

      {isSubmitted && !isSubmitting && !serverError && (
        <p className="text-success text-sm">
          Your message was sent! I&apos;ll be in touch soon.
        </p>
      )}
    </form>
  );
}
