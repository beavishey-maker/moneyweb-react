'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const CATEGORIES = ['すべて', '家計管理', 'キャリア・働き方', '老後・年金', '相談事例', '資格・講座'];

const BLOG_POSTS = [
  { id: 1,  cat: '家計管理',      emoji: '💰', title: '40代女性の貯蓄割合は？平均値の罠と「我が家」の適正額を知る方法',                         date: '2026-02-20' },
  { id: 2,  cat: '家計管理',      emoji: '💰', title: '固定費の見直しは40代から！痛みを伴わない家計改善のロードマップ',                           date: '2026-02-10' },
  { id: 3,  cat: '家計管理',      emoji: '💰', title: 'ズボラな40代でも続く！「お金の道を整える」新しい家計管理法',                               date: '2026-01-28' },
  { id: 4,  cat: '家計管理',      emoji: '💰', title: '教育費のピークはいつ？40代から備える大学費用のリアルな乗り越え方',                         date: '2026-01-15' },
  { id: 5,  cat: 'キャリア・働き方', emoji: '🌿', title: '扶養内パートと扶養外、40代女性はどっちが得？損益分岐点を徹底解説',                   date: '2026-02-03' },
  { id: 6,  cat: 'キャリア・働き方', emoji: '🌿', title: '40代で転職を迷う女性へ。不安を自信に変える「キャリアの棚卸し」実践法',               date: '2026-01-20' },
  { id: 7,  cat: 'キャリア・働き方', emoji: '🌿', title: '仕事を辞めたい40代女性が陥る「ミッドライフ・クライシス」の乗り越え方',               date: '2026-01-10' },
  { id: 8,  cat: 'キャリア・働き方', emoji: '🌿', title: '50代からのセカンドキャリア準備。やりがいと収入を両立させる働き方のヒント',           date: '2025-12-20' },
  { id: 9,  cat: '老後・年金',     emoji: '🏡', title: '50代からでも遅くない！初心者のための新NISA活用「負けない」ガイド',                     date: '2025-12-05' },
  { id: 10, cat: '老後・年金',     emoji: '🏡', title: '40代専業主婦でもiDeCoはやるべき？隠れたメリットと注意点',                               date: '2025-11-25' },
  { id: 11, cat: '老後・年金',     emoji: '🏡', title: '女性の老後破産を防ぐ！40代から始める「おひとりさま」を見据えた準備',                   date: '2025-11-10' },
  { id: 12, cat: '家計管理',      emoji: '💰', title: '住宅ローンの繰り上げ返済、50代のベストなタイミングは？',                                 date: '2025-11-10' },
  { id: 13, cat: '相談事例',      emoji: '💬', title: '「お金の不安で眠れない」40代女性が安心を取り戻すまでの軌跡',                             date: '2025-10-28' },
  { id: 14, cat: '相談事例',      emoji: '💬', title: 'なぜ主婦の悩みには「家計」と「キャリア」のセット相談が不可欠なのか',                     date: '2025-10-15' },
  { id: 15, cat: '相談事例',      emoji: '💬', title: '「私なんて…」が口癖だった40代が、FP相談を機に副業を始めるまで',                         date: '2025-10-01' },
  { id: 16, cat: '相談事例',      emoji: '💬', title: 'FPに怒られそうで怖い？「伴走型」相談が選ばれる3つの理由',                               date: '2025-09-20' },
  { id: 17, cat: '資格・講座',     emoji: '📚', title: '家計整理アドバイザー2級講座とは？メリットと受講生のリアルな声',                         date: '2025-09-10' },
  { id: 18, cat: '資格・講座',     emoji: '📚', title: '整理収納が得意な40代女性へ。家計整理アドバイザー資格で強みをキャリアに',               date: '2025-08-25' },
  { id: 19, cat: '資格・講座',     emoji: '📚', title: '40代からの資格取得。家計整理アドバイザーが副業・起業の第一歩におすすめ',               date: '2025-08-10' },
  { id: 20, cat: '家計管理',      emoji: '💰', title: '情報過多で疲れた40代へ。「適正量」を知って脳疲労をなくすシンプルな家計管理',           date: '2025-09-01' },
];

const CAT_COLOR: Record<string, string> = {
  '家計管理': '',
  'キャリア・働き方': ' tag--green',
  '老後・年金': ' tag--neutral',
  '相談事例': '',
  '資格・講座': ' tag--green',
};

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('すべて');

  const filtered = activeCat === 'すべて'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.cat === activeCat);

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Blog</p>
        <h1 className="page-hero__title">ブログ</h1>
        <p className="page-hero__desc">お金・キャリア・暮らしについて、等身大で綴っています</p>
      </div>

      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Contents" title="お役立ちコンテンツ" />
          </FadeIn>

          {/* カテゴリフィルター */}
          <FadeIn delay={100}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`glossary-cat__btn${activeCat === cat ? ' active' : ''}`}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 1.1rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* 記事グリッド */}
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <FadeIn key={post.id} delay={(i % 3) * 80}>
                <article className="blog-card">
                  <div className="blog-card__thumb">{post.emoji}</div>
                  <div className="blog-card__body">
                    <p className="blog-card__cat">
                      <span className={`tag${CAT_COLOR[post.cat] || ''}`}>{post.cat}</span>
                    </p>
                    <h3 className="blog-card__title">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="blog-card__date">
                      {new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
              該当する記事が見つかりませんでした。
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <FadeIn>
          <span className="cta-section__eyebrow">Free Consultation</span>
          <h2 className="cta-section__title">記事を読んで、気になったことがあれば</h2>
          <p className="cta-section__body">
            「これって私のこと？」と思ったら、ぜひ相談してください。<br />
            初回60分は無料です。
          </p>
          <div className="cta-section__btns">
            <Link href="/contact" className="btn btn-primary btn--lg">無料相談を予約する</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
