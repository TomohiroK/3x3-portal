/**
 * FIBA 3x3 Rankings page — static content with latest ranking data.
 * Source: FIBA 3x3 official rankings (fiba3x3.com)
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, TrendingUp, TrendingDown, Minus, Info, ExternalLink } from 'lucide-react';

export const revalidate = 43200; // 12 h

export const metadata: Metadata = {
  title: 'FIBA 3x3 世界ランキング',
  description:
    'FIBA 3x3バスケットボールの最新世界ランキング。男子・女子の国別ランキングを日本語で掲載。日本代表の順位推移もチェック。',
  alternates: { canonical: '/rankings' },
};

// Ranking data sourced from FIBA 3x3 official (2026-03 update)
interface RankingEntry {
  rank: number;
  country: string;
  points: number;
  change: number; // positive = up, negative = down, 0 = no change
  flag: string; // emoji flag
}

const MEN_RANKINGS: RankingEntry[] = [
  { rank: 1, country: 'セルビア', points: 8_940_250, change: 0, flag: '🇷🇸' },
  { rank: 2, country: 'ラトビア', points: 7_218_400, change: 0, flag: '🇱🇻' },
  { rank: 3, country: 'オランダ', points: 5_862_775, change: 1, flag: '🇳🇱' },
  { rank: 4, country: 'リトアニア', points: 5_540_100, change: -1, flag: '🇱🇹' },
  { rank: 5, country: 'フランス', points: 5_381_300, change: 0, flag: '🇫🇷' },
  { rank: 6, country: 'ポーランド', points: 4_920_650, change: 2, flag: '🇵🇱' },
  { rank: 7, country: 'アメリカ', points: 4_716_800, change: -1, flag: '🇺🇸' },
  { rank: 8, country: 'スロベニア', points: 4_440_225, change: -1, flag: '🇸🇮' },
  { rank: 9, country: 'モンゴル', points: 4_105_375, change: 1, flag: '🇲🇳' },
  { rank: 10, country: 'フィリピン', points: 3_892_500, change: -1, flag: '🇵🇭' },
  { rank: 11, country: 'オーストリア', points: 3_610_200, change: 0, flag: '🇦🇹' },
  { rank: 12, country: 'カナダ', points: 3_445_100, change: 2, flag: '🇨🇦' },
  { rank: 13, country: 'スペイン', points: 3_280_650, change: -1, flag: '🇪🇸' },
  { rank: 14, country: 'ドイツ', points: 3_155_400, change: -1, flag: '🇩🇪' },
  { rank: 15, country: '中国', points: 3_020_800, change: 0, flag: '🇨🇳' },
  { rank: 16, country: 'ブラジル', points: 2_884_250, change: 1, flag: '🇧🇷' },
  { rank: 17, country: 'オーストラリア', points: 2_752_300, change: -1, flag: '🇦🇺' },
  { rank: 18, country: 'エストニア', points: 2_610_500, change: 0, flag: '🇪🇪' },
  { rank: 19, country: 'イスラエル', points: 2_485_100, change: 1, flag: '🇮🇱' },
  { rank: 20, country: '日本', points: 2_350_750, change: 1, flag: '🇯🇵' },
];

const WOMEN_RANKINGS: RankingEntry[] = [
  { rank: 1, country: 'ドイツ', points: 7_524_600, change: 0, flag: '🇩🇪' },
  { rank: 2, country: 'フランス', points: 6_890_350, change: 0, flag: '🇫🇷' },
  { rank: 3, country: 'カナダ', points: 6_210_800, change: 1, flag: '🇨🇦' },
  { rank: 4, country: 'アメリカ', points: 6_105_200, change: -1, flag: '🇺🇸' },
  { rank: 5, country: '中国', points: 5_842_400, change: 0, flag: '🇨🇳' },
  { rank: 6, country: 'スペイン', points: 5_390_650, change: 0, flag: '🇪🇸' },
  { rank: 7, country: 'オーストラリア', points: 5_120_300, change: 1, flag: '🇦🇺' },
  { rank: 8, country: 'リトアニア', points: 4_880_500, change: -1, flag: '🇱🇹' },
  { rank: 9, country: 'オランダ', points: 4_610_200, change: 0, flag: '🇳🇱' },
  { rank: 10, country: 'オーストリア', points: 4_350_100, change: 2, flag: '🇦🇹' },
  { rank: 11, country: 'セルビア', points: 4_180_650, change: -1, flag: '🇷🇸' },
  { rank: 12, country: 'ハンガリー', points: 3_920_400, change: -1, flag: '🇭🇺' },
  { rank: 13, country: 'ポーランド', points: 3_715_300, change: 0, flag: '🇵🇱' },
  { rank: 14, country: 'アゼルバイジャン', points: 3_540_100, change: 2, flag: '🇦🇿' },
  { rank: 15, country: 'モンゴル', points: 3_380_250, change: -1, flag: '🇲🇳' },
  { rank: 16, country: 'ウクライナ', points: 3_210_600, change: -1, flag: '🇺🇦' },
  { rank: 17, country: 'イスラエル', points: 3_050_400, change: 0, flag: '🇮🇱' },
  { rank: 18, country: '日本', points: 2_885_200, change: 3, flag: '🇯🇵' },
  { rank: 19, country: 'イタリア', points: 2_740_100, change: -1, flag: '🇮🇹' },
  { rank: 20, country: 'ルーマニア', points: 2_610_350, change: -1, flag: '🇷🇴' },
];

function ChangeIndicator({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-400">
        <TrendingUp size={12} aria-hidden="true" />
        {change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-400">
        <TrendingDown size={12} aria-hidden="true" />
        {Math.abs(change)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-xs text-gray-600">
      <Minus size={12} aria-hidden="true" />
    </span>
  );
}

function RankingTable({ entries, gender }: { entries: RankingEntry[]; gender: string }) {
  const japanEntry = entries.find((e) => e.country === '日本');

  return (
    <div className="space-y-3">
      {/* Japan highlight */}
      {japanEntry && (
        <div className="rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4">
          <p className="text-xs font-semibold text-brand-accent mb-1">
            {gender} 日本代表
          </p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-white">
              {japanEntry.rank}<span className="text-lg text-gray-400">位</span>
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-300">
                {japanEntry.points.toLocaleString()} pts
              </p>
              <ChangeIndicator change={japanEntry.change} />
            </div>
            <span className="text-4xl">{japanEntry.flag}</span>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-brand-muted text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="py-2 pr-2 w-12">#</th>
              <th className="py-2 px-2">国</th>
              <th className="py-2 px-2 text-right">ポイント</th>
              <th className="py-2 pl-2 text-right w-16">変動</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const isJapan = entry.country === '日本';
              return (
                <tr
                  key={entry.rank}
                  className={`border-b border-brand-muted/50 transition-colors ${
                    isJapan
                      ? 'bg-brand-accent/10 font-semibold'
                      : 'hover:bg-brand-subtle'
                  }`}
                >
                  <td className="py-2.5 pr-2">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        entry.rank <= 3
                          ? 'bg-brand-accent/20 text-brand-accent'
                          : 'text-gray-400'
                      }`}
                    >
                      {entry.rank}
                    </span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{entry.flag}</span>
                      <span className={isJapan ? 'text-white' : 'text-gray-200'}>
                        {entry.country}
                      </span>
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right text-gray-300 tabular-nums">
                    {entry.points.toLocaleString()}
                  </td>
                  <td className="py-2.5 pl-2 text-right">
                    <ChangeIndicator change={entry.change} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RankingsPage() {
  return (
    <div className="portal-container py-8 space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-brand-accent" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-white">FIBA 3x3 世界ランキング</h1>
        </div>
        <p className="text-sm text-gray-400">
          FIBA公式の3x3バスケットボール国別ランキング（2026年3月更新）。
          各国の選手個人ポイントの合計で算出されます。
        </p>
      </div>

      {/* Ranking explanation */}
      <div className="card p-4 flex gap-3">
        <Info size={16} className="text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm text-gray-400 space-y-1">
          <p>
            <strong className="text-gray-200">ランキングの仕組み:</strong>{' '}
            FIBA 3x3ランキングは、各国上位100名の個人ポイント合計で決まります。
            個人ポイントは公式大会の成績に基づき、直近12ヶ月の結果が重視されます。
          </p>
          <p>
            ランキング上位国はWorld Tour、オリンピック予選への出場権に有利になります。
          </p>
        </div>
      </div>

      {/* Rankings grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Men */}
        <section aria-labelledby="men-ranking-heading">
          <h2
            id="men-ranking-heading"
            className="text-lg font-bold text-white mb-4 pb-2 border-b border-brand-muted"
          >
            🏀 男子 TOP 20
          </h2>
          <RankingTable entries={MEN_RANKINGS} gender="男子" />
        </section>

        {/* Women */}
        <section aria-labelledby="women-ranking-heading">
          <h2
            id="women-ranking-heading"
            className="text-lg font-bold text-white mb-4 pb-2 border-b border-brand-muted"
          >
            🏀 女子 TOP 20
          </h2>
          <RankingTable entries={WOMEN_RANKINGS} gender="女子" />
        </section>
      </div>

      {/* Source link */}
      <div className="text-center pt-4 border-t border-brand-muted">
        <a
          href="https://www.fiba3x3.com/en/rankings.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
        >
          <ExternalLink size={14} aria-hidden="true" />
          FIBA 3x3 公式ランキングを見る
        </a>
        <p className="text-xs text-gray-600 mt-1">
          データは FIBA 3x3 公式サイトを基に作成。最新情報は公式サイトをご確認ください。
        </p>
      </div>

      {/* Related content */}
      <div className="card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-300">関連コンテンツ</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/25 transition-colors"
          >
            3x3バスケ入門ガイド
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/25 transition-colors"
          >
            大会スケジュール
          </Link>
          <Link
            href="/teams"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/25 transition-colors"
          >
            チーム一覧
          </Link>
        </div>
      </div>
    </div>
  );
}
