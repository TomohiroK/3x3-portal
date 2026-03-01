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

export type EventStatus = '開催予定' | '開催中' | '終了' | '中止';

export interface PortalEvent {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  location: string;
  country: string; // 例: "日本" / "タイ" / "シンガポール"
  startDate: string; // ISO date string, e.g. "2025-06-01"
  endDate: string | null;
  status: EventStatus;
  imageUrl: string | null;
  websiteUrl: string | null;
  xAccount: string | null;
  instagramAccount: string | null;
  tiktokAccount: string | null;
  participantTeamIds: number[]; // 参加チームID一覧（空配列 = 未設定）
  updatedAt: string;
}

// ─────────────────────────────────────────
// Team
// ─────────────────────────────────────────

export type TeamCategory = 'EXE' | '代表' | 'U23' | '招待' | '一般クラブ';

export interface Team {
  id: number;
  slug: string;
  name: string;
  location: string;
  category: TeamCategory;
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
  websiteUrl: string | null; // 公式サイト URL
  updatedAt: string;
}

// ─────────────────────────────────────────
// News
// ─────────────────────────────────────────

export interface NewsRelatedTeam {
  id: number;
  name: string;
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  sourceUrl: string | null;
  imageUrl: string | null;
  publishedAt: string;
  updatedAt: string;
  relatedTeams: NewsRelatedTeam[]; // 複数チームタグ（空配列 = 関連なし）
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
  category: TeamCategory | '';
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
