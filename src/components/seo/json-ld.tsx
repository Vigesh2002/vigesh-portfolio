import { profile } from '@/data/profile';

/**
 * Next.js JSON-LD component. Renders structured data for the page owner as a
 * `Person` schema so search engines understand who this site belongs to.
 */
export function JsonLdPerson() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: 'https://vigeshd.dev',
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
      `mailto:${profile.email}`,
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Apprikart Digital Solutions Pvt. Ltd',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}
