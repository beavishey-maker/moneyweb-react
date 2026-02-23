'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

/* ── データ ─────────────────────────────────────── */
const WORRIES = [
  '子育てが落ち着いたのに、なぜか心が満たされない',
  '老後のお金が不安で、夜も眠れないことがある',
  '扶養内のままでいいか、働き方を変えるか迷っている',
  '教育費と老後資金、両方を準備できるか心配',
  '「私なんて特別なスキルがない」と感じている',
  '節約情報を調べすぎて、逆に疲れてしまっている',
];

const WHY_CARDS = [
  { num: '01', title: 'お金の不安が\n行動のブレーキになる', desc: '将来のお金が見えると、新しい一歩が踏み出せます。まず「見える化」から始めましょう。' },
  { num: '02', title: '働き方が変わると\n家計も変わる', desc: 'キャリアとお金は、車の両輪。片方だけでは動けません。両方を一緒に設計します。' },
  { num: '03', title: 'あなたの「やりたい」が\n最優先', desc: '数字の最適化より、あなたの価値観に合った道を。一緒に探しましょう。' },
];

const SERVICES = [
  {
    num: '01',
    title: '家計×キャリア\n個別相談',
    desc: 'お金と働き方を同時に整理する、完全オーダーメイドのセッション。漠然としたモヤモヤが、具体的な一歩に変わります。',
    href: '/services#consultation',
    badge: '初回60分・無料',
    comingSoon: false,
  },
  {
    num: '02',
    title: '家計整理アドバイザー\n2級講座',
    desc: '計算が苦手でも大丈夫。「お金の道を整える」というまったく新しいアプローチで、一生使えるスキルを身につけます。',
    href: '/services#course',
    badge: '資格取得',
    comingSoon: false,
  },
  {
    num: '03',
    title: 'グループセミナー',
    desc: '同じ悩みを持つ仲間と一緒に学ぶ、温かい少人数制のセミナー。「私だけじゃなかった」という安心感が、あなたの背中を押します。',
    href: '/services#seminar',
    badge: '準備中',
    comingSoon: true,
  },
];

const TESTIMONIALS = [
  {
    initial: 'A',
    text: '子育てが落ち着いてからの空白感が、ずっとモヤモヤしていました。お金のことだけでなく、これからの働き方まで一緒に考えてもらえて、霧が晴れたようにスッキリしました。',
    name: 'Aさん',
    meta: '42歳・パート主婦',
  },
  {
    initial: 'B',
    text: '「老後2000万円問題」がずっと怖くて。でもライフプランを作ってもらったら、「思ったより大丈夫」とわかって、夜もぐっすり眠れるようになりました。',
    name: 'Bさん',
    meta: '47歳・フルタイム会社員',
  },
  {
    initial: 'C',
    text: '計算が大の苦手で、ずっと「私には無理」と思っていました。でも「お金の道を整える」という考え方を知ってから、家計管理がストレスじゃなくなって、副業まで始めました！',
    name: 'Cさん',
    meta: '44歳・パート主婦',
  },
];

const STATS = [
  { num: '150', unit: '件+', label: '累計相談数' },
  { num: '98',  unit: '%',   label: '満足度' },
  { num: '3',   unit: '資格', label: '保有資格' },
  { num: '5',   unit: '年+',  label: '活動実績' },
];

const BLOG_POSTS = [
  {
    cat: '家計管理', catColor: '#B8975A',
    title: '40代女性の貯蓄割合はどれくらい？今すぐできる見直し3ステップ', date: '2025.12.15',
    thumbGrad: 'linear-gradient(135deg, #F7EDD8 0%, #EDD9A8 50%, #E2C882 100%)',
    thumbIcon: '💰',
  },
  {
    cat: 'キャリア', catColor: '#1A1A1A',
    title: '扶養内パートと扶養外、どちらが得？年収別シミュレーション', date: '2025.12.08',
    thumbGrad: 'linear-gradient(135deg, #E6EDE4 0%, #C5D9BB 50%, #A8C49A 100%)',
    thumbIcon: '🌿',
  },
  {
    cat: '老後・年金', catColor: '#B8975A',
    title: '40代専業主婦でもiDeCoは始めるべき？メリットと注意点', date: '2025.11.28',
    thumbGrad: 'linear-gradient(135deg, #E4EBF2 0%, #BBC9DA 50%, #96AFCA 100%)',
    thumbIcon: '🏡',
  },
];

/* ── Testimonialカード（スクロールパララックス） ── */
function TestimonialCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y0 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -20]);
  const yValues = [y0, y1, y2];

  const directions = [
    { initial: { x: -60, opacity: 0 }, whileInView: { x: 0, opacity: 1 } },
    { initial: { y:  60, opacity: 0 }, whileInView: { y: 0, opacity: 1 } },
    { initial: { x:  60, opacity: 0 }, whileInView: { x: 0, opacity: 1 } },
  ];

  return (
    <div ref={ref} className="testimonial-grid" style={{ position: 'relative' }}>
      {TESTIMONIALS.map((t, i) => (
        <motion.div
          key={t.name}
          className="testimonial-card"
          style={{ y: yValues[i] }}
          initial={directions[i].initial}
          whileInView={directions[i].whileInView}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <span className="testimonial-card__quote-mark">&ldquo;</span>
          <p className="testimonial-card__text">{t.text}</p>
          <div className="testimonial-card__author">
            <div className="testimonial-card__avatar">{t.initial}</div>
            <div>
              <p className="testimonial-card__name">{t.name}</p>
              <p className="testimonial-card__meta">{t.meta}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── ページ ───────────────────────────────────── */
export default function HomePage() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────── */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="label-en">Money & Career Planner</span>
          </div>
          <h1 className="hero__title">
            このままで<br />
            <em>いいのかな</em>…<br />
            その問いに、<br />
            向き合う場所。
          </h1>
          <p className="hero__sub">
            お金の不安もキャリアの迷いも、<br />
            一人で抱えなくていい。<br />
            あなたの「次の一歩」を、一緒に見つけましょう。
          </p>
          <div className="hero__actions">
            <Link href="/contact" className="btn btn--primary btn--lg">
              無料相談を予約する
              <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn btn--outline btn--lg">
              プランナーについて
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
              src="/images/DSC3587-1024x683.jpg"
              alt="渡辺加奈子"
              fill
              style={{ objectFit: 'cover', objectPosition: '75% center' }}
              priority
            />
          </div>
          <div className="hero__image-overlay" />
        </div>
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <div className="stats-section">
        <FadeIn>
          <div className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stats-item">
                <div className="stats-item__num">
                  {s.num}<span>{s.unit}</span>
                </div>
                <div className="stats-item__label">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── Empathy ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            <div>
              <FadeIn>
                <SectionHeading
                  en="Does this resonate?"
                  jp={"こんなお悩み、\nありませんか？"}
                />
              </FadeIn>
              <FadeIn delay={100}>
                <ul className="empathy-list">
                  {WORRIES.map((w, i) => (
                    <li key={i} className="empathy-item">
                      <span className="empathy-item__check" aria-hidden="true" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn delay={200}>
              <div style={{
                background: 'var(--col-neutral)',
                border: '1px solid rgba(184,151,90,0.15)',
                borderRadius: '20px',
                padding: 'clamp(1.75rem, 4vw, 3rem)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}>
                <p style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: 300,
                  lineHeight: 2,
                  letterSpacing: '0.04em',
                }}>
                  それは、あなたが怠けているからでも、<br />
                  能力が足りないからでもありません。<br />
                  <br />
                  ただ、<strong style={{ fontWeight: 400, color: 'var(--col-gold)' }}>「仕組み」を知らないだけ</strong>。<br />
                  一緒に整理すれば、必ず道は見えてきます。
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Why ───────────────────────────────── */}
      <section className="section section--warm">
        <div className="container">
          <FadeIn>
            <SectionHeading
              en="Why it matters"
              jp="お金とキャリアを\n一緒に考える理由"
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

      {/* ── Profile ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <SectionHeading en="About the planner" jp="プランナー紹介" />
          </FadeIn>
          <div className="profile-section">
            <FadeIn delay={100}>
              <div className="profile-img-wrap">
                <div className="profile-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative' }}>
                  <Image
                    src="/images/DSC3587-1024x683.jpg"
                    alt="渡辺加奈子"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span className="profile-img-badge">FP×キャリア</span>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div>
                <p className="profile-content__name">渡辺 加奈子</p>
                <p className="profile-content__name-en">Kanako Watanabe</p>
                <div className="profile-content__tags">
                  <span className="tag tag--accent">FP2級</span>
                  <span className="tag tag--accent">キャリアコンサルタント</span>
                  <span className="tag tag--accent">家計整理アドバイザー1級</span>
                </div>
                <p className="profile-content__text">
                  自身も「家計が苦手」「働き方に迷う」40代の一人でした。<br />
                  FPとキャリアの知識に出会い、それは才能や気合いの問題ではなく、
                  「仕組みを知らなかっただけ」だと気づきました。<br />
                  <br />
                  同じように悩む女性に、「わかった！」という瞬間を届けたい。<br />
                  その想いで、伴走プランナーとして活動しています。
                </p>
                <Link href="/about" className="btn btn--ghost">
                  もっと詳しく読む
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────── */}
      <section className="section section--warm">
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

      {/* ── Testimonials ──────────────────────── */}
      <section className="section section--warm" id="testimonials-section">
        <div className="container">
          <FadeIn>
            <SectionHeading en="Customer Voices" jp="お客様の声" center />
          </FadeIn>
          <TestimonialCards />
          <FadeIn delay={300}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/results" className="btn btn--outline">
                もっと見る → お客様の声一覧
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quiz Banner ───────────────────────── */}
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className="quiz-banner">
              <div>
                <p className="label-en" style={{ marginBottom: '0.75rem' }}>Diagnosis</p>
                <h2 className="quiz-banner__title">
                  あなたの「お金タイプ」を<br />
                  診断してみませんか？
                </h2>
                <p className="quiz-banner__desc">
                  10問の質問に答えるだけ。自分の傾向とぴったりのアドバイスがわかります。
                </p>
              </div>
              <div>
                <Link href="/quiz" className="btn btn--primary btn--lg">
                  診断スタート
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Blog ──────────────────────────────── */}
      <section className="section section--warm">
        <div className="container">
          <FadeIn>
            <SectionHeading en="Blog" jp="最新の記事" />
          </FadeIn>
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <FadeIn key={post.title} delay={i * 100}>
                <article className="blog-card">
                  <div className="blog-card__thumb" style={{ background: post.thumbGrad }}>
                    <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}>{post.thumbIcon}</span>
                  </div>
                  <div className="blog-card__body">
                    <span
                      className="blog-card__cat"
                      style={{ background: post.catColor + '18', color: post.catColor }}
                    >
                      {post.cat}
                    </span>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <time className="blog-card__date">{post.date}</time>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/blog" className="btn btn--outline">
                記事をもっと見る
              </Link>
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
                Zoom対応なので、全国どこからでもOK。<br />
                保険商品の勧誘は一切ありません。
              </p>
              <Link href="/contact" className="btn btn--primary btn--lg">
                無料相談を予約する
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
