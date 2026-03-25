/**
 * 3x3 Basketball Rules & Guide page — comprehensive beginner guide.
 * SEO target: "3x3 バスケ ルール", "3x3 バスケットボール 入門"
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  Users,
  Target,
  Zap,
  ArrowRight,
  Scale,
  MapPin,
  Award,
  CheckCircle2,
  Timer,
  ExternalLink,
} from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 86400; // 24 h (rarely changes)

export const metadata: Metadata = {
  title: '3x3バスケ完全入門ガイド｜ルール・見どころ・観戦方法',
  description:
    '3x3（スリー・エックス・スリー）バスケットボールのルール、コートサイズ、試合時間、得点方法を初心者向けにわかりやすく解説。5人制バスケとの違い、観戦の楽しみ方も紹介。',
  alternates: { canonical: '/guide' },
  openGraph: {
    title: '3x3バスケ完全入門ガイド',
    description:
      '3x3バスケットボールのルール・見どころ・観戦方法を初心者向けに完全解説。',
    type: 'article',
  },
};

function SectionCard({
  icon: Icon,
  title,
  children,
  id,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section id={id} className="card p-5 sm:p-6 space-y-4 scroll-mt-20" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="flex items-center gap-2 text-lg font-bold text-white">
        <Icon size={20} className="text-brand-accent" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function ComparisonRow({
  label,
  threeX3,
  fiveOnFive,
}: {
  label: string;
  threeX3: string;
  fiveOnFive: string;
}) {
  return (
    <tr className="border-b border-brand-muted/50">
      <td className="py-2.5 pr-3 text-sm font-medium text-gray-300 whitespace-nowrap">{label}</td>
      <td className="py-2.5 px-3 text-sm text-brand-accent font-semibold">{threeX3}</td>
      <td className="py-2.5 pl-3 text-sm text-gray-400">{fiveOnFive}</td>
    </tr>
  );
}

function RuleItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <CheckCircle2 size={16} className="text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="text-sm text-gray-300 leading-relaxed">{children}</span>
    </li>
  );
}

export default function GuidePage() {
  return (
    <div className="portal-container py-8 space-y-6">
      {/* FAQ structured data for rich snippets */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: '3x3バスケのルールは？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '3x3バスケットボールは、ハーフコートで3人対3人で行う競技です。試合時間は10分間（または先に21点取った方が勝ち）。アーク外からのシュートは2点、アーク内は1点。攻撃権は12秒で切り替わります。',
              },
            },
            {
              '@type': 'Question',
              name: '3x3バスケと5人制バスケの違いは？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '主な違いは、人数（3対3 vs 5対5）、コート（ハーフコート vs フルコート）、試合時間（10分 vs 4Q×10分）、得点（1点/2点 vs 2点/3点）、ショットクロック（12秒 vs 24秒）です。3x3はよりスピーディーで、個人技が重視されます。',
              },
            },
            {
              '@type': 'Question',
              name: '3x3バスケはオリンピック種目？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'はい。3x3バスケットボールは2020年東京オリンピックから正式種目に採用されました。2024年パリ大会でも実施され、2028年ロサンゼルス大会でも実施予定です。',
              },
            },
          ],
        }}
      />

      {/* Hero header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
          <BookOpen size={14} aria-hidden="true" />
          Beginner&apos;s Guide
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          3x3バスケ完全入門ガイド
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          3x3（スリー・エックス・スリー）バスケットボールは、ハーフコートで3人対3人で行うスピーディーな競技。
          2020年東京オリンピックから正式種目に採用され、世界中で急速に人気が拡大しています。
        </p>
      </div>

      {/* Table of contents */}
      <nav className="card p-4" aria-label="目次">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">目次</p>
        <ol className="grid gap-1.5 sm:grid-cols-2 text-sm">
          {[
            { id: 'rules', label: '基本ルール' },
            { id: 'scoring', label: '得点方法' },
            { id: 'comparison', label: '5人制との違い' },
            { id: 'court', label: 'コート・用具' },
            { id: 'competitions', label: '主要大会' },
            { id: 'watching', label: '観戦の楽しみ方' },
          ].map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-gray-300 hover:bg-brand-subtle hover:text-white transition-colors"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold">
                  {i + 1}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1. Basic Rules */}
      <SectionCard icon={Scale} title="基本ルール" id="rules">
        <ul className="space-y-3">
          <RuleItem>
            <strong className="text-white">3人 vs 3人</strong> — 各チーム3名がコートに立ち、交代要員は最大1名（計4名登録）
          </RuleItem>
          <RuleItem>
            <strong className="text-white">試合時間は10分間</strong> — 1ピリオドのみ。制限時間内に得点が多い方が勝利
          </RuleItem>
          <RuleItem>
            <strong className="text-white">先に21点で即勝利</strong> — 10分を待たず、先に21点に到達したチームが勝ち
          </RuleItem>
          <RuleItem>
            <strong className="text-white">ショットクロック12秒</strong> — 攻撃権を得てから12秒以内にシュート
          </RuleItem>
          <RuleItem>
            <strong className="text-white">攻守の切替</strong> — 得点後やリバウンド後、ボールをアーク（3ポイントライン）の外に出してから攻撃開始
          </RuleItem>
          <RuleItem>
            <strong className="text-white">延長戦</strong> — 同点の場合、先に2点取った方が勝ちのOT（延長戦）
          </RuleItem>
        </ul>
      </SectionCard>

      {/* 2. Scoring */}
      <SectionCard icon={Target} title="得点方法" id="scoring">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-brand-accent/10 border border-brand-accent/20 p-4 text-center">
            <p className="text-4xl font-extrabold text-brand-accent">1</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Point</p>
            <p className="text-sm text-gray-300 mt-2">
              アーク（3ポイントライン）の<strong className="text-white">内側</strong>からのシュート
            </p>
            <p className="text-xs text-gray-500 mt-1">5人制の2ポイントに相当</p>
          </div>
          <div className="rounded-xl bg-brand-accent/10 border border-brand-accent/20 p-4 text-center">
            <p className="text-4xl font-extrabold text-brand-accent">2</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Points</p>
            <p className="text-sm text-gray-300 mt-2">
              アークの<strong className="text-white">外側</strong>からのシュート
            </p>
            <p className="text-xs text-gray-500 mt-1">5人制の3ポイントに相当</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          フリースローは<strong className="text-gray-200">1点</strong>。
          チームファウル7回目以降、シュートファウル時に2本のフリースロー。
          10回目以降は2本のフリースロー＋ポゼッション。
        </p>
      </SectionCard>

      {/* 3. Comparison with 5-on-5 */}
      <SectionCard icon={Zap} title="5人制バスケとの違い" id="comparison">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-brand-muted text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="py-2 pr-3">項目</th>
                <th className="py-2 px-3 text-brand-accent">3x3</th>
                <th className="py-2 pl-3">5人制</th>
              </tr>
            </thead>
            <tbody>
              <ComparisonRow label="人数" threeX3="3 vs 3" fiveOnFive="5 vs 5" />
              <ComparisonRow label="コート" threeX3="ハーフコート" fiveOnFive="フルコート" />
              <ComparisonRow label="試合時間" threeX3="10分 or 21点先取" fiveOnFive="4Q × 10分" />
              <ComparisonRow label="得点" threeX3="1点 / 2点" fiveOnFive="2点 / 3点" />
              <ComparisonRow label="ショットクロック" threeX3="12秒" fiveOnFive="24秒" />
              <ComparisonRow label="フリースロー" threeX3="1本（通常）" fiveOnFive="2〜3本" />
              <ComparisonRow label="審判" threeX3="1〜2名" fiveOnFive="2〜3名" />
              <ComparisonRow label="1試合の時間" threeX3="約15分" fiveOnFive="約2時間" />
              <ComparisonRow label="ボール" threeX3="6号球サイズ / 7号球重量" fiveOnFive="7号球（男子）" />
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400">
          3x3は試合時間が短く、テンポが速いため<strong className="text-gray-200">個人技とフィジカル</strong>がより重要。
          1日に複数試合をこなすトーナメント形式が主流です。
        </p>
      </SectionCard>

      {/* 4. Court & Equipment */}
      <SectionCard icon={MapPin} title="コート・用具" id="court">
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-brand-subtle/50 p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase">コートサイズ</p>
              <p className="text-base font-bold text-white mt-1">15m × 11m</p>
              <p className="text-xs text-gray-400 mt-0.5">5人制コートの約半分</p>
            </div>
            <div className="rounded-lg bg-brand-subtle/50 p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase">ボール</p>
              <p className="text-base font-bold text-white mt-1">専用球</p>
              <p className="text-xs text-gray-400 mt-0.5">6号球サイズ / 7号球重量</p>
            </div>
            <div className="rounded-lg bg-brand-subtle/50 p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase">バスケット</p>
              <p className="text-base font-bold text-white mt-1">高さ 3.05m</p>
              <p className="text-xs text-gray-400 mt-0.5">5人制と同じ高さ</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            3x3専用のボールは、サイズは女子の6号球と同じですが重量は男子の7号球と同等。
            この独特のボールにより、ドリブルの感覚やシュートタッチが5人制と異なります。
          </p>
        </div>
      </SectionCard>

      {/* 5. Major Competitions */}
      <SectionCard icon={Award} title="主要大会" id="competitions">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: 'FIBA 3x3 World Tour',
                description: '世界最高峰のプロツアー。Masters（予選）→ Final（決勝）の構成。',
                tier: 'Tier 1',
              },
              {
                name: 'FIBA 3x3 World Cup',
                description: '国別対抗の世界選手権。2年に1度開催。',
                tier: 'Tier 1',
              },
              {
                name: 'オリンピック',
                description: '2020年東京大会から正式種目。最高の栄誉。',
                tier: 'Tier 1',
              },
              {
                name: '3x3.EXE PREMIER',
                description: '日本最大の3x3プロリーグ。全国各地で開催。',
                tier: '国内',
              },
            ].map((comp) => (
              <div key={comp.name} className="rounded-lg border border-brand-muted p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      comp.tier === 'Tier 1'
                        ? 'bg-brand-accent/20 text-brand-accent'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {comp.tier}
                  </span>
                  <p className="text-sm font-semibold text-white">{comp.name}</p>
                </div>
                <p className="text-xs text-gray-400">{comp.description}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            日本国内では<strong className="text-gray-200">3x3.EXE PREMIER</strong>が最大のプロリーグ。
            2026年シーズンはSUPER PREMIER（国際）とPREMIER JAPAN（国内）の2カテゴリで展開中。
          </p>
        </div>
      </SectionCard>

      {/* 6. How to Watch */}
      <SectionCard icon={Clock} title="観戦の楽しみ方" id="watching">
        <div className="space-y-4">
          <ul className="space-y-3">
            <RuleItem>
              <strong className="text-white">会場で体感</strong> — 3x3はストリートカルチャーと融合。
              DJの音楽が流れる中、観客席とコートの距離が近く、臨場感が段違い
            </RuleItem>
            <RuleItem>
              <strong className="text-white">注目ポイント: 個人技</strong> — 3人しかいないため、1対1の駆け引きが見どころ。
              クロスオーバー、ステップバック、パワードライブが頻発
            </RuleItem>
            <RuleItem>
              <strong className="text-white">残り時間の駆け引き</strong> — 12秒のショットクロック、10分の試合時間。
              終盤の時計管理が勝敗を分ける
            </RuleItem>
            <RuleItem>
              <strong className="text-white">ファウルゲーム</strong> — チームファウル7回で相手にフリースロー。
              ファウル管理が戦術の鍵
            </RuleItem>
          </ul>

          <div className="flex items-center gap-2 pt-2">
            <Timer size={14} className="text-brand-accent" aria-hidden="true" />
            <p className="text-sm text-gray-300">
              1試合約15分で決着がつくため、1日で多数の試合を観戦できるのも魅力です。
            </p>
          </div>
        </div>
      </SectionCard>

      {/* CTA section */}
      <div className="card p-6 text-center space-y-4">
        <h2 className="text-lg font-bold text-white">3x3の世界を体験しよう</h2>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          国内外の3x3大会スケジュール、チーム情報、最新ニュースをチェック。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold bg-brand-accent text-white hover:bg-brand-accent/80 transition-colors"
          >
            大会スケジュール
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold bg-brand-subtle text-gray-200 hover:bg-brand-muted transition-colors"
          >
            世界ランキング
          </Link>
        </div>
      </div>

      {/* Source */}
      <div className="text-center">
        <a
          href="https://fiba3x3.com/en/rules.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ExternalLink size={12} aria-hidden="true" />
          FIBA 3x3 公式ルール（英語）
        </a>
      </div>
    </div>
  );
}
