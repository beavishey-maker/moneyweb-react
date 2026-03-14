'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowRight, Instagram } from 'lucide-react';
import InstagramFeed from '@/components/InstagramFeed';

/* ── データ ─────────────────────────────────────── */
const WHY_CARDS = [
  { num: '01', title: '初回30分\n完全無料', desc: '初回のご相談は30分・完全無料です。まずは気軽にお話しください。相談するかどうかのご判断は相談後で構いません。' },
  { num: '02', title: 'オンライン・\n対面どちらも対応', desc: 'オンライン（全国対応）と対面（宮城県内・お客様ご指定の場所）どちらにも対応しています。' },
  { num: '03', title: '中立的な\nアドバイス', desc: '特定の金融商品の販売は一切しません。あなたの利益を最優先した、公正で中立なアドバイスを提供します。' },
];

const SERVICES = [
  {
    num: '01',
    title: '家計整理アドバイザー\n2級講座',
    desc: '計算が苦手でも大丈夫。「お金の道を整える」というまったく新しいアプローチで、一生使えるスキルを身につけます。',
    href: '/services#course',
    badge: '資格取得',
    comingSoon: false,
  },
  {
    num: '02',
    title: '家計×キャリア\n個別相談',
    desc: 'お金と働き方を同時に整理する、完全オーダーメイドのセッション。漠然としたモヤモヤが、具体的な一歩に変わります。',
    href: '/services#consultation',
    badge: '初回30分・無料',
    comingSoon: false,
  },
  {
    num: '03',
    title: '進学マネー\nセミナー',
    desc: '中学・高校・大学の進学費用を「見える化」。奨学金・教育ローンの賢い使い方まで、具体的な資金計画を一緒に作ります。',
    href: '/services',
    badge: 'グループ受講',
    comingSoon: true,
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
            お金の<br />
            パートナー
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

      {/* ── Quiz Banner ────────────────────── */}
      <section className="section section--warm">
        <div className="container">
          <FadeIn>
            <div className="quiz-banner">
              <div>
                <span className="quiz-banner__emoji">🔍</span>
                <h2 className="quiz-banner__title">あなたのお金タイプ、知っていますか？</h2>
                <p className="quiz-banner__desc">10問に答えるだけで、あなたの家計パターンと、今すべきことがわかります。</p>
              </div>
              <Link href="/quiz" className="btn btn--primary btn--lg">
                無料で診断する
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Glossary Teaser ───────────────────── */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading en="FP Glossary" jp="FP用語集" center />
            <p style={{ textAlign: 'center', color: 'var(--col-muted)', marginBottom: '2.5rem' }}>
              知っておきたいお金の言葉を、わかりやすく解説しています。
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="glossary-teaser-grid">
              {[
                { term: '複利', read: 'ふくり', desc: '利息が利息を生む仕組み。長期運用で資産を大きく育てる「お金の雪だるま」効果。' },
                { term: 'iDeCo', read: 'イデコ', desc: '個人型確定拠出年金。掛金全額が所得控除になり、節税しながら老後資金を積み立てられる。' },
                { term: 'NISA', read: 'ニーサ', desc: '少額投資非課税制度。運用益や配当が非課税になる国の優遇制度。2024年から新NISAに。' },
                { term: 'ライフプラン', read: 'らいふぷらん', desc: '人生の大きなイベント（結婚・出産・住宅・老後）とお金の流れを時系列で可視化する設計図。' },
                { term: 'キャッシュフロー表', read: 'きゃっしゅふろーひょう', desc: '年ごとの収入・支出・貯蓄残高を一覧化した家計の未来予測表。FP相談の基本ツール。' },
                { term: 'ふるさと納税', read: 'ふるさとのうぜい', desc: '自治体に寄付することで税金の控除を受けつつ返礼品をもらえる制度。実質2,000円で活用可。' },
              ].map(({ term, read, desc }) => (
                <div key={term} className="glossary-teaser-card">
                  <p className="glossary-teaser-card__read">{read}</p>
                  <h3 className="glossary-teaser-card__term">{term}</h3>
                  <p className="glossary-teaser-card__desc">{desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
              <Link href="/glossary" className="btn btn--primary btn--lg">
                用語集をすべて見る（87語）
                <ArrowRight size={16} />
              </Link>
              <Link href="/glossary/quiz" className="btn btn--outline btn--lg">
                🎯 用語クイズに挑戦
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Instagram ─────────────────────────── */}
      <section className="section section--warm">
        <div className="container">
          <FadeIn>
            <SectionHeading en="Instagram" jp="インスタグラム" center />
            <p className="instagram-section__handle">
              <a
                href="https://www.instagram.com/rinn_happy_life/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={15} style={{ verticalAlign: 'middle', marginRight: '0.3em' }} />
                @rinn_happy_life
              </a>
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <InstagramFeed />
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
                初回30分は完全無料です。<br />
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
