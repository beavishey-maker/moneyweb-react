'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

/* ── データ ─────────────────────────────────────── */
const WHY_CARDS = [
  { num: '01', title: '初回60分\n完全無料', desc: '初回のご相談は60分・完全無料です。まずは気軽にお話しください。相談するかどうかのご判断は相談後で構いません。' },
  { num: '02', title: 'オンライン・\n対面どちらも対応', desc: 'ビデオ通話で全国どこからでも相談可能。東京・神奈川・埼玉エリアでは対面でのご相談にも対応しています。' },
  { num: '03', title: '中立的な\nアドバイス', desc: '特定の金融商品の販売は一切しません。あなたの利益を最優先した、公正で中立なアドバイスを提供します。' },
];

const SERVICES = [
  {
    num: '01',
    title: '老後・年金\n相談',
    desc: '老後資金の試算から退職後の資産活用まで、安心した老後を設計します。',
    href: '/services#retirement',
    badge: '老後設計',
    comingSoon: false,
  },
  {
    num: '02',
    title: '住宅ローン\n相談',
    desc: '無理のない返済計画と最適なローン選びで、理想のマイホームを実現します。',
    href: '/services#housing',
    badge: '住宅購入',
    comingSoon: false,
  },
  {
    num: '03',
    title: '保険見直し\n相談',
    desc: '現在加入中の保険を分析し、本当に必要な保障を最適なコストで確保します。',
    href: '/services#insurance',
    badge: '保険診断',
    comingSoon: false,
  },
  {
    num: '04',
    title: '教育費・子育て\n相談',
    desc: '幼稚園から大学までの教育費を試算し、無理のない貯蓄プランをご提案します。',
    href: '/services#education',
    badge: '教育資金',
    comingSoon: false,
  },
];

/* ── ページ ───────────────────────────────────── */
export default function HomePage() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────── */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="label-en">Financial Planner</span>
          </div>
          <h1 className="hero__title">
            あなたの未来に、<br />
            <em>寄り添う</em><br />
            お金のパートナー
          </h1>
          <p className="hero__sub">
            大切な家族の未来のために、今できることを。<br />
            あなたらしい未来を、一緒に描きましょう。
          </p>
          <div className="hero__actions">
            <Link href="/contact" className="btn btn--primary btn--lg">
              無料相談を申し込む
              <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn btn--outline btn--lg">
              サービスを見る
            </Link>
          </div>
          <div className="hero__scroll">
            <div className="hero__scroll-line" />
            <span className="hero__scroll-text">SCROLL</span>
          </div>
        </div>

        <div className="hero__image-side">
          <div className="hero__image-placeholder">
            <Image
              src="/images/hero.webp"
              alt="渡辺加奈子"
              fill
              style={{ objectFit: 'cover', objectPosition: '75% center' }}
              priority
            />
          </div>
          <div className="hero__image-overlay" />
        </div>
      </section>

      {/* ── Why (選ばれる3つの理由) ────────────── */}
      <section className="section section--warm">
        <div className="container">
          <FadeIn>
            <SectionHeading
              en="Why choose us"
              jp="選ばれる3つの理由"
              center
            />
          </FadeIn>
          <div className="why-grid">
            {WHY_CARDS.map((c, i) => (
              <FadeIn key={c.num} delay={i * 100}>
                <div className="why-card">
                  <div className="why-card__num">{c.num}</div>
                  <h3 className="why-card__title" style={{ whiteSpace: 'pre-line' }}>{c.title}</h3>
                  <p className="why-card__desc">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <SectionHeading en="Services" jp="サービス一覧" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-list">
              {SERVICES.map((s) => (
                <div key={s.num} className={`service-item${s.comingSoon ? ' coming-soon-overlay' : ''}`}>
                  <div className="service-item__body">
                    <span className="service-item__num">{s.num}</span>
                    <div>
                      <h3 className="service-item__title" style={{ whiteSpace: 'pre-line' }}>{s.title}</h3>
                      <p className="service-item__desc">{s.desc}</p>
                    </div>
                  </div>
                  <div className="service-item__action">
                    {s.comingSoon ? (
                      <span className="service-item__badge">準備中</span>
                    ) : (
                      <Link href={s.href} className="btn btn--ghost">
                        詳細を見る
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────── */}
      <section className="section--dark">
        <div className="container">
          <div className="cta-section">
            <FadeIn>
              <p className="label-en" style={{ color: 'var(--col-gold)', marginBottom: '1.5rem' }}>Free Consultation</p>
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>
                まずは、話してみませんか。
              </h2>
              <p className="cta-section__sub" style={{ color: 'rgba(255,255,255,0.5)' }}>
                初回60分は無料です。<br />
                オンライン対応なので、全国どこからでもOK。<br />
                金融商品の勧誘は一切ありません。
              </p>
              <Link href="/contact" className="btn btn--primary btn--lg">
                無料相談を申し込む
                <ArrowRight size={16} />
              </Link>
              <p className="cta-section__note" style={{ color: 'rgba(255,255,255,0.3)' }}>
                ※ 予約後のキャンセルも無料・ペナルティなし
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

    </main>
  );
}
