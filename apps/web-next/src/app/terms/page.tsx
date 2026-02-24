/**
 * Terms of Use page.
 * Reference URLs are managed in REFERENCE_URLS below.
 */
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: '利用規約',
  description: '3x3 Observer\'s Hub の利用規約・免責事項・著作権に関する説明と、掲載情報の参照ページ一覧。',
};

/** 最終更新日 — 規約を改定した際はここを更新してください */
const LAST_UPDATED = '2026-02-24';

/** 参照ページURL一覧 — URLを追加・編集する場合はここを更新してください */
const REFERENCE_URLS: { label: string; url: string }[] = [
  // イベント・スケジュール
  { label: '3x3.EXE PREMIER – Super Premier スケジュール', url: 'https://3x3exe.com/superpremier/schedules/' },
  { label: 'FIBA 3x3 Asia Cup 2026（The Kallang）', url: 'https://www.thekallang.com.sg/events/fiba-3x3-asia-cup-26' },
  { label: 'FIBA 3x3 World Tour 2026 開催都市発表', url: 'https://about.fiba.basketball/en/news/fiba-3x3-world-tour-reveals-global-line-up-of-host-cities-for-upcoming' },
  { label: '3x3 Japan Championships 2026 公式', url: 'https://3x3japanchampionships2026.japanbasketball.jp/news/145/' },
  // ニュース
  { label: 'Basketball King – 記事（2026/02/23）①', url: 'https://basketballking.jp/news/japan/20260223/597597.html' },
  { label: 'Basketball King – 記事（2026/02/23）②', url: 'https://basketballking.jp/news/japan/20260223/597627.html' },
  { label: 'Basket Count – 記事', url: 'https://basket-count.com/article/detail/253060' },
  // チーム
  { label: '品川シティバスケットボールクラブ – 3x3', url: 'https://www.shinagawa-city.com/3x3basketball/' },
  { label: '@scbc_3x3（X）', url: 'https://x.com/scbc_3x3' },
  { label: 'shinagawacity3x3basketball（Instagram）', url: 'https://www.instagram.com/shinagawacity3x3basketball/' },
  { label: 'Flowlish Gunma 公式サイト', url: 'https://flowlish-gunma.com/' },
  { label: '@flowlish3x3（X）', url: 'https://x.com/flowlish3x3' },
  { label: 'flowlish3x3（Instagram）', url: 'https://www.instagram.com/flowlish3x3/' },
  // 会場
  { label: 'Xebia Arena', url: 'https://www.xebioarena.com/' },
  { label: 'Mega Bangna（タイ）', url: 'https://www.mega-bangna.com/' },
  { label: 'Sengkang Grand Mall（シンガポール）', url: 'https://www.sengkanggrandmall.com.sg/en.html' },
  { label: 'The Kallang（シンガポール）', url: 'https://www.thekallang.com.sg/' },
];

export default function TermsPage() {
  return (
    <div className="portal-container py-8 max-w-2xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">利用規約</h1>
        <p className="text-xs text-gray-500">最終更新日: {LAST_UPDATED}</p>
      </div>

      <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-white">1. サイトについて</h2>
          <p>
            本サイト「3x3 Observer&apos;s Hub」は、3x3バスケットボールに関する情報を提供することを目的とした非公式ポータルサイトです。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-white">2. 情報の正確性</h2>
          <p>
            掲載情報は可能な限り正確を期していますが、内容の完全性・最新性を保証するものではありません。
            公式情報は各イベント・団体の公式サイトをご確認ください。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-white">3. 外部リンク</h2>
          <p>
            本サイトには外部サイトへのリンクが含まれます。リンク先のコンテンツや運営については関知しておらず、一切の責任を負いません。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-white">4. 著作権</h2>
          <p>
            本サイト上のコンテンツの著作権は運営者に帰属します。無断転載・複製はお断りします。
            各チーム・イベントのロゴ・画像等の権利は各権利者に帰属します。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-white">5. 免責事項</h2>
          <p>
            本サイトの利用により生じたいかなる損害についても、運営者は責任を負いかねます。
          </p>
        </section>
      </div>

      {/* 参照URL一覧 */}
      {REFERENCE_URLS.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">参照ページ</h2>
          <ul className="space-y-2">
            {REFERENCE_URLS.map(({ label, url }) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-accent hover:underline"
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
