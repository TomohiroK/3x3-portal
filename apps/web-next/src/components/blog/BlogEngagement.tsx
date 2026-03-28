'use client';

import { useEffect, useRef, useState } from 'react';

interface BlogEngagementProps {
  slug: string;
  category: string;
  title: string;
}

/**
 * Client component for blog engagement tracking (GA4) and interaction UI.
 * Tracks: page view, scroll depth (25/50/75/100%), time on page, reactions, shares.
 */
export function BlogEngagement({ slug, category, title }: BlogEngagementProps) {
  const [reacted, setReacted] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Restore persisted reactions
    const stored = localStorage.getItem(`3x3-reactions-${slug}`);
    if (stored) {
      try {
        setReacted(JSON.parse(stored));
      } catch {
        localStorage.removeItem(`3x3-reactions-${slug}`);
      }
    }

    // Track page view
    window.gtag?.('event', 'blog_view', {
      article_slug: slug,
      article_category: category,
      article_title: title,
    });

    // Track scroll depth
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();

    function onScroll() {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.round((window.scrollY / scrollable) * 100);
      if (pct > maxScroll) maxScroll = pct;
      for (const m of milestones) {
        if (maxScroll >= m && !fired.has(m)) {
          fired.add(m);
          window.gtag?.('event', 'blog_scroll', { article_slug: slug, scroll_depth: m });
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Track time on page
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        window.gtag?.('event', 'blog_time', { article_slug: slug, time_seconds: seconds });
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [slug, category, title]);

  function handleReaction(type: string) {
    if (reacted[type]) return;
    const next = { ...reacted, [type]: true };
    setReacted(next);
    localStorage.setItem(`3x3-reactions-${slug}`, JSON.stringify(next));
    window.gtag?.('event', 'blog_reaction', { article_slug: slug, reaction_type: type });
  }

  function handleShareX() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${title} — 3x3 Observer's Hub`);
    window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=550,height=420');
    window.gtag?.('event', 'blog_share', { article_slug: slug, share_method: 'x' });
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(false);
    });
    window.gtag?.('event', 'blog_share', { article_slug: slug, share_method: 'copy_link' });
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-brand-muted pt-6 mt-8">
      {/* Reactions */}
      <div className="flex gap-3">
        <button
          onClick={() => handleReaction('helpful')}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
            reacted['helpful']
              ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
              : 'border-brand-muted text-gray-400 hover:border-brand-orange/40 hover:text-brand-orange'
          }`}
          aria-label="参考になった"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
          </svg>
          参考になった
        </button>
        <button
          onClick={() => handleReaction('insightful')}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
            reacted['insightful']
              ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
              : 'border-brand-muted text-gray-400 hover:border-brand-orange/40 hover:text-brand-orange'
          }`}
          aria-label="勉強になった"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          勉強になった
        </button>
      </div>

      {/* Share */}
      <div className="flex gap-3">
        <button
          onClick={handleShareX}
          className="flex items-center gap-1.5 rounded-lg border border-brand-muted px-3 py-1.5 text-sm text-gray-400 hover:border-brand-orange/40 hover:text-white transition-colors"
          aria-label="Xでシェア"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          シェア
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 rounded-lg border border-brand-muted px-3 py-1.5 text-sm text-gray-400 hover:border-brand-orange/40 hover:text-white transition-colors"
          aria-label="リンクをコピー"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71z"/>
          </svg>
          {copied ? 'コピー済み!' : 'リンクをコピー'}
        </button>
      </div>
    </div>
  );
}
