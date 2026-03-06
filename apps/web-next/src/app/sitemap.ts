import type { MetadataRoute } from 'next';
import { listEvents } from '@/lib/repositories/event.repository';
import { listTeams } from '@/lib/repositories/team.repository';
import { listNews } from '@/lib/repositories/news.repository';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://web-next-self-nine.vercel.app';

/** updatedAt の最新値を返す。データがなければ fallback を返す */
function latestUpdatedAt(dates: (string | undefined)[], fallback: string): string {
  const valid = dates.filter((d): d is string => !!d);
  return valid.length > 0 ? valid.sort().at(-1)! : fallback;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const TERMS_UPDATED = '2026-01-01T00:00:00Z'; // 利用規約は手動更新時に変更

  const [eventsResult, teamsResult, newsResult] = await Promise.all([
    listEvents({ search: '', status: '', page: 1, pageSize: 200 }).catch(() => null),
    listTeams({ search: '', category: '', page: 1, pageSize: 200 }).catch(() => null),
    listNews({ search: '', teamId: null, page: 1, pageSize: 200 }).catch(() => null),
  ]);

  const eventItems  = eventsResult?.items ?? [];
  const teamItems   = teamsResult?.items  ?? [];
  const newsItems   = newsResult?.items   ?? [];

  const latestEventAt = latestUpdatedAt(eventItems.map((e) => e.updatedAt), TERMS_UPDATED);
  const latestNewsAt  = latestUpdatedAt(newsItems.map((n) => n.updatedAt),  TERMS_UPDATED);
  const latestTeamAt  = latestUpdatedAt(teamItems.map((t) => t.updatedAt),  TERMS_UPDATED);
  const latestHomeAt  = latestUpdatedAt([latestEventAt, latestNewsAt],       TERMS_UPDATED);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,             lastModified: latestHomeAt,  changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/events`, lastModified: latestEventAt, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/news`,   lastModified: latestNewsAt,  changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/teams`,  lastModified: latestTeamAt,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/venues`, lastModified: latestTeamAt,  changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/terms`,  lastModified: TERMS_UPDATED, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const eventPages: MetadataRoute.Sitemap = eventItems.map((event) => ({
    url: `${BASE_URL}/events/${event.id}`,
    lastModified: event.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const teamPages: MetadataRoute.Sitemap = teamItems.map((team) => ({
    url: `${BASE_URL}/teams/${team.id}`,
    lastModified: team.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...eventPages, ...teamPages];
}
