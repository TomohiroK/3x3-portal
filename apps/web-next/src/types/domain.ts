/**
 * Core domain types for the 3x3 Basketball Portal.
 *
 * Rules:
 * - All entities have: id, slug, updatedAt
 * - Nullable fields use `| null` (never `undefined` in DB-backed data)
 * - Raw DB rows are never passed to UI directly; mappers transform them
 */

// ─────────────────────────────────────────
// Event (Tournament)
// ─────────────────────────────────────────

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface PortalEvent {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  location: string;
  startDate: string; // ISO date string, e.g. "2025-06-01"
  endDate: string | null;
  status: EventStatus;
  imageUrl: string | null;
  websiteUrl: string | null;
  xAccount: string | null;
  instagramAccount: string | null;
  tiktokAccount: string | null;
  updatedAt: string;
}

// ─────────────────────────────────────────
// Team
// ─────────────────────────────────────────

export interface Team {
  id: number;
  slug: string;
  name: string;
  location: string;
  imageUrl: string | null;
  websiteUrl: string | null;
  xAccount: string | null;
  instagramAccount: string | null;
  tiktokAccount: string | null;
  updatedAt: string;
}

// ─────────────────────────────────────────
// Player
// ─────────────────────────────────────────

export interface Player {
  id: number;
  slug: string;
  name: string;
  teamId: number | null;
  teamName: string | null;
  position: string | null;
  jerseyNumber: number | null;
  imageUrl: string | null;
  bio: string | null;
  updatedAt: string;
}

// ─────────────────────────────────────────
// Venue
// ─────────────────────────────────────────

export interface Venue {
  id: number;
  slug: string;
  name: string;
  region: string; // 都道府県 or 国名（海外の場合）
  mapUrl: string | null; // Google Maps URL
  updatedAt: string;
}

// ─────────────────────────────────────────
// News
// ─────────────────────────────────────────

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  sourceUrl: string | null;
  imageUrl: string | null;
  publishedAt: string;
  updatedAt: string;
  relatedTeamId: number | null;
  relatedTeamName: string | null;
}

// ─────────────────────────────────────────
// Match / Result
// ─────────────────────────────────────────

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'cancelled';

export interface Match {
  id: number;
  eventId: number;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  homeScore: number | null;
  awayScore: number | null;
  scheduledAt: string; // ISO datetime
  status: MatchStatus;
  updatedAt: string;
}

// ─────────────────────────────────────────
// Pagination helpers
// ─────────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ─────────────────────────────────────────
// Filter / Query params (validated at boundary)
// ─────────────────────────────────────────

export interface EventFilters {
  search: string;
  status: EventStatus | '';
  page: number;
  pageSize: number;
}

export interface TeamFilters {
  search: string;
  page: number;
  pageSize: number;
}

export interface PlayerFilters {
  search: string;
  teamId: number | null;
  page: number;
  pageSize: number;
}

export interface NewsFilters {
  search: string;
  teamId: number | null;
  page: number;
  pageSize: number;
}

export interface VenueFilters {
  search: string;
  page: number;
  pageSize: number;
}
