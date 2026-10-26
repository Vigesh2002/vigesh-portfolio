declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    RESEND_API_KEY: string;
    RESEND_FROM?: string;
    CONTACT_TO_EMAIL: string;
  }
}
