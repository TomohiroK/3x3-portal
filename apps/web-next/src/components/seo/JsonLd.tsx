/**
 * JSON-LD structured data component for SEO.
 * Renders a <script type="application/ld+json"> tag with the given data.
 */

import type { PortalEvent, Team } from '@/types/domain';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://3x3.tmkproduct.com';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Website schema for the home page */
export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: "3x3 Observer's Hub",
        url: BASE_URL,
        description: '国内・海外の3x3バスケットボール大会・イベント・ニュースを日本語で発信。',
        inLanguage: 'ja',
      }}
    />
  );
}

/** SportsEvent schema for event detail pages */
export function EventJsonLd({ event }: { event: PortalEvent }) {
  const STATUS_MAP: Record<string, string> = {
    '開催予定': 'https://schema.org/EventScheduled',
    '開催中': 'https://schema.org/EventScheduled',
    '終了': 'https://schema.org/EventScheduled',
    '中止': 'https://schema.org/EventCancelled',
  };

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: event.name,
        description: event.description ?? `${event.name} - 3x3バスケットボールイベント`,
        startDate: event.startDate,
        endDate: event.endDate ?? event.startDate,
        eventStatus: STATUS_MAP[event.status] ?? 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressCountry: event.country,
          },
        },
        sport: '3x3 Basketball',
        url: `${BASE_URL}/events/${event.id}`,
        ...(event.websiteUrl && {
          sameAs: event.websiteUrl,
        }),
      }}
    />
  );
}

/** SportsOrganization schema for team detail pages */
export function TeamJsonLd({ team }: { team: Team }) {
  const sameAs: string[] = [];
  if (team.websiteUrl) sameAs.push(team.websiteUrl);
  if (team.xAccount) sameAs.push(`https://x.com/${team.xAccount}`);
  if (team.instagramAccount) sameAs.push(`https://instagram.com/${team.instagramAccount}`);

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SportsTeam',
        name: team.name,
        sport: '3x3 Basketball',
        location: {
          '@type': 'Place',
          name: team.location,
        },
        url: `${BASE_URL}/teams/${team.id}`,
        ...(sameAs.length > 0 && { sameAs }),
      }}
    />
  );
}
