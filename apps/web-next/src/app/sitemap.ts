import type { MetadataRoute } from 'next';
import { listEvents } from '@/lib/repositories/event.repository';
import { listTeams } from '@/lib/repositories/team.repository';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://web-next-self-nine.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                  lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/events`,      lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/teams`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/news`,        lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/venues`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/terms`,       lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const [eventsResult, teamsResult] = await Promise.all([
    listEvents({ search: '', status: '', page: 1, pageSize: 200 }).catch(() => null),
    listTeams({ search: '', page: 1, pageSize: 200 }).catch(() => null),
  ]);

  const eventPages: MetadataRoute.Sitemap = (eventsResult?.items ?? []).map((event) => ({
    url: `${BASE_URL}/events/${event.id}`,
    lastModified: event.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const teamPages: MetadataRoute.Sitemap = (teamsResult?.items ?? []).map((team) => ({
    url: `${BASE_URL}/teams/${team.id}`,
    lastModified: team.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...eventPages, ...teamPages];
}
