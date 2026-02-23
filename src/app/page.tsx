'use client';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

// ─── データ ─────────────────────────────────────────────────────
const WORRIES = [
  '子育てが落ち着いたのに、なぜか心が満たされない',
  '老後のお金が不安で、夜も眠れないことがある',
  '扶養内のままでいいか、働き方を変えるか迷っている',
  '教育費と老後資金、両方を準備できるか心配',
  '「私なんて特別なスキルがない」と感じている',
  '節約情報を調べすぎて、逆に疲れてしまっている',
];

const WHY_CARDS = [
  { icon: '💰', title: 'お金の不安が、行動のブレーキになる', desc: '将来のお金が見えると、新しい一歩が踏み出せます。まず「見える化」から始めましょう。' },
  { icon: '🌿', title: '働き方が変わると、家計も変わる', desc: 'キャリアとお金は、車の両輪。片方だけでは動けません。両方を一緒に設計します。' },
  { icon: '🤝', title: 'あなたの「やりたい」が、最優先', desc: '数字の最適化より、あなたの価値観に合った道を。一緒に探しましょう。' },
];

const SERVICES = [
  { emoji: '💬', title: '家計×キャリア 個別相談', desc: 'お金と働き方を同時に整理する、完全オーダーメイドのセッション。漠然としたモヤモヤが、具体的な一歩に変わります。', href: '/services#consultation', comingSoon: false },
  { emoji: '📚', title: '家計整理アドバイザー\n2級講座', desc: '計算が苦手でも大丈夫。「お金の道を整える」というまったく新しいアプローチで、一生使えるスキルを身につけます。', href: '/services#course', comingSoon: false },
  { emoji: '🌸', title: 'グループセミナー', desc: '同じ悩みを持つ仲間と一緒に学ぶ、温かい少人数制のセミナー。「私だけじゃなかった」という安心感が、あなたの背中を押します。', href: '/services#seminar', comingSoon: true },
];

const TESTIMONIALS = [
  { initial: 'A', text: '子育てが落ち着いてからの空白感が、ずっとモヤモヤしていました。お金のことだけでなく、これからの働き方まで一緒に考えてもらえて、霧が晴れたようにスッキリしました。', name: 'Aさん', meta: '42歳・パート主婦' },
  { initial: 'B', text: '老後の不安で夜も眠れない時期がありました。数字で現状を見える化してもらったら、「あれ、思ったより大丈夫かも」と肩の荷が下りた感覚でした。', name: 'Bさん', meta: '47歳・フルタイム会社員' },
  { initial: 'C', text: '計算は苦手なのに受講して、本当に良かったです。家計のストレスがなくなっただけでなく、副業まで始められました！', name: 'Cさん', meta: '44歳・パート主婦' },
];

const BLOG_POSTS = [
  { emoji: '💰', cat: '家計管理', catColor: '', title: 'ふるさと納税、今年こそ使いこなす！仕組みをわかりやすく解説', date: '2026年2月15日' },
  { emoji: '🌿', cat: 'キャリア', catColor: 'green', title: '40代で「やりたいこと」がわからなくなったとき、まず試してほしい3つのこと', date: '2026年2月3日' },
  { emoji: '🌸', cat: '暮らし', catColor: 'neutral', title: '女子会はいつも「お金と健康」の話になる——40代あるある日記', date: '2026年1月22日' },
];

// ─── コンポーネント ───────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="hero">
        <div className="hero__inner container">
          <div className="hero__content">
            <span className="hero__eyebrow">FP &amp; 国家資格キャリアコンサルタント</span>
            <h1 className="hero__title">
              「このままでいいのかな…」<br />
              そう感じている<span className="hero__accent">あなたへ</span>。
            </h1>
            <p className="hero__subtitle">
              お金とキャリア、ふたつの不安を<br />
              一緒に整理しませんか。
            </p>
            <div className="hero__cta">
              <Link href="/contact" className="btn btn-primary btn--lg">無料相談を予約する</Link>
              <Link href="/about" className="btn btn-outline btn--lg">私のことを知る →</Link>
            </div>
          </div>
          <div className="hero__photo-wrap">
            <Image
              src="/images/DSC3587-1024x683.jpg"
              alt="渡辺かなこ"
              width={240}
              height={240}
              className="hero__photo"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== 2. EMPATHY ===== */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Empathy" title="こんなお悩み、ありませんか？" desc="「なんとなく不安」——そのモヤモヤ、一人で抱えていませんか？" />
          </FadeIn>
          <FadeIn delay={100}>
            <ul className="checklist">
              {WORRIES.map((w, i) => (
                <li key={i} className="checklist__item">
                  <span className="checklist__icon">✓</span>
                  <p>{w}</p>
                </li>
              ))}
            </ul>
            <p className="empathy__closing">そのモヤモヤ、一人で抱えていませんか？</p>
          </FadeIn>
        </div>
      </section>

      {/* ===== 3. WHY ===== */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Why Us" title={'なぜ"お金"と"キャリア"を<br>一緒に見ることが必要なのか'} />
          </FadeIn>
          <div className="why-grid">
            {WHY_CARDS.map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <article className="why-card">
                  <span className="why-card__icon">{card.icon}</span>
                  <h3 className="why-card__title">{card.title}</h3>
                  <p className="why-card__desc">{card.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div className="why-emphasis">
              <p>&ldquo;残高&rdquo;だけでなく、&ldquo;人生の道&rdquo;を<br />一緒に整えましょう。</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== 4. PROFILE ===== */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="About" title="プロフィール" />
          </FadeIn>
          <div className="profile-strip">
            <FadeIn className="profile-strip__photo-wrap">
              <Image
                src="/images/DSC3587-1024x683.jpg"
                alt="渡辺かなこ"
                width={180}
                height={180}
                className="profile-strip__photo"
              />
              <div className="profile-strip__quals">
                <span className="tag">FP</span>
                <span className="tag tag--green">キャリコン</span>
                <span className="tag">家計整理アドバイザー</span>
              </div>
            </FadeIn>
            <FadeIn delay={150} className="profile-strip__body">
              <h3>改めまして、こんにちは。<br />お金とキャリアの伴走プランナー、<br />渡辺　加奈子です。</h3>
              <p>私自身、40代・子育て中の働く母の一人です。長年、医療事務として働きながら、FPとして多くの方の家計と向き合ってきました。</p>
              <p>お金の悩みの根底には、必ず「生き方」や「働きがい」が関わっていると感じ、国家資格キャリアコンサルタントとしても活動しています。</p>
              <p>私が提供するのは、一方的なアドバイスではありません。まず、あなたの「言葉にならない想い」をじっくり聴かせてください。</p>
              <Link href="/about" className="profile-strip__link">もっと詳しく知る →</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== 5. SERVICES ===== */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Services" title='あなたの"次の一歩"を支えるサービス' />
          </FadeIn>
          <div className="service-grid">
            {SERVICES.map((svc, i) => (
              <FadeIn key={i} delay={i * 100}>
                <article className="service-card">
                  <div className="service-card__top">
                    <span className="service-card__emoji">{svc.emoji}</span>
                    <h3 className="service-card__title">{svc.title}</h3>
                    <p className="service-card__desc">{svc.desc}</p>
                  </div>
                  <div className="service-card__footer">
                    <Link href={svc.href} className={svc.comingSoon ? 'btn btn-outline btn--sm' : 'btn btn-primary btn--sm'}>
                      {svc.comingSoon ? '準備中' : '詳しく見る'}
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TESTIMONIALS ===== */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Voices" title="ご相談者さまの声" />
          </FadeIn>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 100}>
                <article className="testimonial-card">
                  <span className="testimonial-card__quote">&ldquo;</span>
                  <p className="testimonial-card__text">{t.text}</p>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">{t.initial}</div>
                    <div>
                      <p className="testimonial-card__name">{t.name}</p>
                      <p className="testimonial-card__meta">{t.meta}</p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/results" className="btn btn-outline">お客様の声をもっと見る</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== 7. QUIZ BANNER ===== */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <div className="quiz-banner">
              <span className="quiz-banner__emoji">📝</span>
              <h2 className="quiz-banner__title">あなたのお金タイプは？</h2>
              <p className="quiz-banner__sub">60秒でわかる！FPクイズで自分の家計パターンを診断</p>
              <Link href="/quiz" className="btn btn-green btn--lg">診断してみる</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== 8. BLOG ===== */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Blog" title="お役立ちコンテンツ" desc="お金・キャリア・暮らしについて、等身大で綴っています" />
          </FadeIn>
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <FadeIn key={i} delay={i * 100}>
                <article className="blog-card">
                  <div className="blog-card__thumb">{post.emoji}</div>
                  <div className="blog-card__body">
                    <p className="blog-card__cat">
                      <span className={`tag${post.catColor === 'green' ? ' tag--green' : post.catColor === 'neutral' ? ' tag--neutral' : ''}`}>
                        {post.cat}
                      </span>
                    </p>
                    <h3 className="blog-card__title"><Link href="/blog">{post.title}</Link></h3>
                    <p className="blog-card__date">{post.date}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/blog" className="btn btn-outline">記事をすべて見る</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== 9. FINAL CTA ===== */}
      <section className="cta-section">
        <FadeIn>
          <span className="cta-section__eyebrow">Free Consultation</span>
          <h2 className="cta-section__title">まずは、あなたの話を<br />少しだけ聴かせてください。</h2>
          <p className="cta-section__body">
            お金の知識がなくても、大丈夫です。<br />
            どんなに小さなモヤモヤでも、構いません。<br />
            怒ったり、責めたりするようなことは、一切ありません。<br /><br />
            あなたが安心してお話できる場所を<br />ご用意してお待ちしています。
          </p>
          <div className="cta-section__btns">
            <Link href="/contact" className="btn btn-primary btn--lg">無料相談を予約する</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
