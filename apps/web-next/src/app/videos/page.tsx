/**
 * Videos page — curated 3x3 basketball YouTube videos.
 * All videos are embedded via YouTube's privacy-enhanced mode (youtube-nocookie.com).
 * Videos are sourced from official channels (FIBA 3x3, Olympics, 3x3.EXE).
 */
import type { Metadata } from 'next';
import { Play, Trophy, Flame, Sparkles, MapPin } from 'lucide-react';
import { VideoFilters } from '@/components/ui/VideoFilters';

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

const VIDEOS: Video[] = [
  // --- World Cup ---
  {
    id: 'wc-1',
    youtubeId: '9FCwp5iAVO8',
    title: 'Serbia vs USA | Men Final | FIBA 3x3 World Cup 2023',
    channel: 'FIBA 3x3',
    category: 'world-cup',
    description: '2023年ワールドカップ男子決勝。セルビア対アメリカの頂上決戦。',
  },
  {
    id: 'wc-2',
    youtubeId: 'V7bngsaptLE',
    title: 'USA vs France | Women Final | FIBA 3x3 World Cup 2023',
    channel: 'FIBA 3x3',
    category: 'world-cup',
    description: '2023年ワールドカップ女子決勝。アメリカ対フランス。',
  },
  {
    id: 'wc-3',
    youtubeId: 'RD9M4XiaqLM',
    title: 'Serbia vs USA | Final | FIBA 3x3 World Championships 2016',
    channel: 'FIBA 3x3',
    category: 'world-cup',
    description: '2016年世界選手権決勝。3x3の歴史に残る名勝負。',
  },
  {
    id: 'wc-4',
    youtubeId: 'YDBNT5xdTgk',
    title: 'USA vs Australia | Men | FIBA 3x3 World Cup 2023',
    channel: 'FIBA 3x3',
    category: 'world-cup',
    description: '2023年ワールドカップ男子。アメリカ対オーストラリアのフルゲーム。',
  },
  // --- Olympics ---
  {
    id: 'oly-1',
    youtubeId: '9bd-De6lJHY',
    title: "Men's 3x3 Basketball Final | Tokyo Replays",
    channel: 'Olympics',
    category: 'olympics',
    description: '東京2020 男子3x3決勝。ラトビアが歴史的な初代金メダルを獲得。',
  },
  {
    id: 'oly-2',
    youtubeId: 'K9iBHgzXpgY',
    title: "Women's 3x3 Basketball Final | Tokyo Replays",
    channel: 'Olympics',
    category: 'olympics',
    description: '東京2020 女子3x3決勝。アメリカが金メダルを獲得。',
  },
  {
    id: 'oly-3',
    youtubeId: 'JFCaJThazCs',
    title: 'USA v Netherlands | FIBA 3x3 Olympic Qualifier',
    channel: 'FIBA 3x3',
    category: 'olympics',
    description: 'パリ2024に向けたオリンピック予選。アメリカ対オランダ。',
  },
  // --- Highlights / Mixtapes ---
  {
    id: 'hl-1',
    youtubeId: 'Sv8Vd6LjTds',
    title: 'Mamiko Tanaka is a BALLER | FIBA 3x3 Mixtape',
    channel: 'FIBA 3x3',
    category: 'highlights',
    description: '田中真美子選手のFIBA 3x3ミックステープ。日本を代表する3x3プレーヤー。',
  },
  {
    id: 'hl-2',
    youtubeId: 'CLbx7fzGP-0',
    title: 'Top 10 Crossovers 2015 | FIBA 3x3',
    channel: 'FIBA 3x3',
    category: 'highlights',
    description: 'FIBA 3x3のクロスオーバーTOP10。華麗なハンドリングの応酬。',
  },
  {
    id: 'hl-3',
    youtubeId: 'hmRXG1AwpmI',
    title: 'Ricci Rivero - Philippines Mixtape | FIBA 3x3 U23 World Cup 2018',
    channel: 'FIBA 3x3',
    category: 'highlights',
    description: 'フィリピンのリッチ・リベロ選手のU23ワールドカップミックステープ。',
  },
  {
    id: 'hl-4',
    youtubeId: 'fIuAwtJuEmA',
    title: "Soraya Mohamed 'The Queen of Egypt' | FIBA 3x3 Highlight Reel",
    channel: 'FIBA',
    category: 'highlights',
    description: 'エジプトの女王ソラヤ・モハメドのハイライトリール。',
  },
  // --- Dunk Contest ---
  {
    id: 'dk-1',
    youtubeId: '7fGTgzlseCA',
    title: 'Kilganon Dunk Contest | Utsunomiya | 2016 FIBA 3x3 World Tour',
    channel: 'FIBA 3x3',
    category: 'dunk',
    description: 'ジョーダン・キルガノンが宇都宮で魅せたダンクコンテスト。FIBA 3x3チャンネル歴代最多再生。',
  },
  {
    id: 'dk-2',
    youtubeId: '5cwNN7BKYuQ',
    title: 'FIBA 3x3 World Cup Dunk Contest Qualifier',
    channel: 'FIBA 3x3',
    category: 'dunk',
    description: 'ワールドカップのダンクコンテスト予選。世界最高のダンカーが集結。',
  },
  {
    id: 'dk-3',
    youtubeId: 'EYxwTcdA4YA',
    title: 'Kobe Paras vs 5 Pro Dunkers | FIBA 3x3 World Cup',
    channel: 'FIBA 3x3',
    category: 'dunk',
    description: 'コービー・パラスがプロダンカー5人に挑む。圧巻のダンクバトル。',
  },
  {
    id: 'dk-4',
    youtubeId: 'JVSF_0JBUIo',
    title: 'HONDA DUNK CONTEST w/ Kobe Paras | 2013 FIBA 3x3 U18 Jakarta',
    channel: 'FIBA 3x3',
    category: 'dunk',
    description: '2013年ジャカルタU18のダンクコンテスト。若きコービー・パラスの活躍。',
  },
  // --- Japan / Domestic ---
  {
    id: 'jp-1',
    youtubeId: '4ieyDoeWtUs',
    title: 'TOP 10 PLAYS | 3x3.EXE PREMIER 2023 Round.1',
    channel: '3x3.EXE',
    category: 'japan',
    description: '3x3.EXE PREMIER 2023 第1ラウンドのトップ10プレー。',
  },
  {
    id: 'jp-2',
    youtubeId: '3CmG_PHR_AI',
    title: 'Japan v India | Men FINAL | FIBA 3x3 U17 Asia Cup 2022',
    channel: 'FIBA 3x3',
    category: 'japan',
    description: '日本対インドのU17アジアカップ2022男子決勝。',
  },
  {
    id: 'jp-3',
    youtubeId: '6jaL1rSMIYw',
    title: 'Ryuto Yasuoka Highlight | 3x3.EXE PREMIER 2023 Round.1',
    channel: '3x3.EXE',
    category: 'japan',
    description: '安岡竜斗選手の3x3.EXE PREMIER 2023ハイライト。',
  },
  {
    id: 'jp-4',
    youtubeId: 'Sfs-8GyPePM',
    title: '湊谷 安玲久司朱 21pts Highlights | 3x3.EXE PREMIER JAPAN 2020 CUP',
    channel: '3x3.EXE',
    category: 'japan',
    description: '湊谷安玲久司朱選手の21得点ハイライト。圧巻のスコアリング。',
  },
];

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
