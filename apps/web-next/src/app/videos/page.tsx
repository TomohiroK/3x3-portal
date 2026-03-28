/**
 * Videos page — curated 3x3 basketball YouTube videos.
 * All videos are embedded via YouTube's privacy-enhanced mode (youtube-nocookie.com).
 * Videos are sourced from official channels (FIBA 3x3, Olympics, 3x3.EXE).
 */
import type { Metadata } from 'next';
import { Play, Trophy, Flame, Sparkles, MapPin } from 'lucide-react';
import { VideoFilters } from '@/components/ui/VideoFilters';
import videosData from '@/data/videos/videos.json';

export const revalidate = 86400; // 24 h

export const metadata: Metadata = {
  title: '3x3バスケ 注目の動画',
  description:
    '3x3バスケットボールの人気動画を厳選。FIBA World Cup決勝、オリンピック、ダンクコンテスト、国内リーグのハイライトをまとめてチェック。',
  alternates: { canonical: '/videos' },
  openGraph: {
    title: '3x3バスケ 注目の動画',
    description:
      '3x3バスケットボールの人気動画を厳選。World Cup決勝、オリンピック、ダンクコンテストなど。',
    type: 'website',
  },
};

// ---------- Data ----------

type VideoCategory = 'world-cup' | 'olympics' | 'highlights' | 'dunk' | 'japan';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  category: VideoCategory;
  description: string;
}

const CATEGORIES: { value: VideoCategory | 'all'; label: string; icon: typeof Trophy }[] = [
  { value: 'all', label: 'すべて', icon: Play },
  { value: 'world-cup', label: 'World Cup', icon: Trophy },
  { value: 'olympics', label: 'オリンピック', icon: Flame },
  { value: 'highlights', label: 'ハイライト', icon: Sparkles },
  { value: 'dunk', label: 'ダンク', icon: Sparkles },
  { value: 'japan', label: '国内', icon: MapPin },
];

const VIDEOS: Video[] = videosData as Video[];

// ---------- Components ----------

function YouTubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  const cat = CATEGORIES.find((c) => c.value === video.category);
  return (
    <article className="card overflow-hidden">
      <YouTubeEmbed youtubeId={video.youtubeId} title={video.title} />
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          {cat && cat.value !== 'all' && (
            <span className="badge-orange text-[10px]">{cat.label}</span>
          )}
          <span className="text-[10px] text-gray-500">{video.channel}</span>
        </div>
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2">{video.description}</p>
      </div>
    </article>
  );
}

// ---------- Page ----------

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function VideosPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const categoryParam = typeof sp.category === 'string' ? sp.category : 'all';
  const validCategory = CATEGORIES.some((c) => c.value === categoryParam) ? categoryParam : 'all';

  const filtered =
    validCategory === 'all'
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === validCategory);

  return (
    <div className="portal-container py-8 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
          <Play size={14} aria-hidden="true" />
          Videos
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          注目の動画
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          FIBA 3x3、オリンピック、3x3.EXE PREMIERなど、3x3バスケットボールの人気動画を厳選。
          試合のフルゲームからダンクコンテストまで、3x3の魅力を動画でチェック。
        </p>
      </div>

      {/* Category filter */}
      <VideoFilters
        categories={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
        currentCategory={validCategory}
      />

      {/* Video grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">この分類の動画はまだありません。</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="border-t border-brand-muted pt-6 space-y-2">
        <p className="text-xs text-gray-500">
          動画はYouTubeの公式埋め込み機能を使用して表示しています。
          各動画の著作権は、それぞれの動画制作者・チャンネル運営者に帰属します。
        </p>
        <p className="text-xs text-gray-500">
          動画ソース：
          <a href="https://www.youtube.com/@FIBA3x3" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline ml-1">FIBA 3x3</a>
          <span className="mx-1">·</span>
          <a href="https://www.youtube.com/@Olympics" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Olympics</a>
          <span className="mx-1">·</span>
          <a href="https://www.youtube.com/@3x3league" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">3x3.EXE</a>
        </p>
      </div>
    </div>
  );
}
