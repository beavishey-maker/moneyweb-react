'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const CONSULTATION_FLOW = [
  { title: 'フォームからお問い合わせ', desc: '相談内容・お悩みをざっくりで構いません。' },
  { title: 'プランナーからご連絡', desc: '2〜3営業日以内にメールでご連絡します。' },
  { title: '初回無料オンライン相談（60分）', desc: 'Zoomにて。現状ヒアリングとお悩み整理をします。' },
  { title: '今後の流れをご提案', desc: '継続は任意です。無理なおすすめは一切しません。' },
];

const COURSE_BENEFITS = [
  '「お金の道を整える」という考え方で、計算なしでも管理できるようになる',
  '家計管理のストレスがなくなり、お金に振り回されない生活ができる',
  '資格取得により、副業・起業・自信につながる',
];

const COURSE_FEATURES = [
  '📖 全テキスト・ワークブック付き',
  '💻 オンライン受講（全国対応）',
  '🕐 自分のペースで受講可能（アーカイブ視聴あり）',
  '✅ 検定試験対策もサポート',
];

const COURSE_TARGET = [
  '家計管理が続かない・苦手意識がある方',
  '副業・起業・転職でスキルを活かしたい方',
  '「整理整頓が得意」をキャリアにしたい方',
  '40代から新しいことを始めたい方',
];

const FAQ = [
  {
    q: 'オンラインでも相談できますか？',
    a: 'はい、Zoomを使ったオンライン相談に対応しています。全国どこからでも、自宅から気軽にご相談いただけます。',
  },
  {
    q: 'お金の知識がなくても大丈夫ですか？',
    a: 'まったく問題ありません。「わからないから相談する」のが当然です。専門用語を使わず、わかりやすくお伝えすることを大切にしています。',
  },
  {
    q: '無理な商品の勧誘はありませんか？',
    a: '一切ありません。私は特定の金融機関や保険会社とは提携しておらず、中立の立場でアドバイスしています。',
  },
  {
    q: '相談前に準備するものはありますか？',
    a: '直近1〜3ヶ月の収支がわかるものがあると話が進みやすいですが、なくても全く問題ありません。「何から手をつければいいかわからない」状態でお越しいただいて大丈夫です。',
  },
  {
    q: '男性でも相談できますか？',
    a: 'もちろんです。男女問わず歓迎しています。ご夫婦でのご相談も承っています。',
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Services</p>
        <h1 className="page-hero__title">サービス一覧</h1>
        <p className="page-hero__desc">あなたの状況に合ったサポートをお選びください。</p>
      </div>

      {/* サービスナビ */}
      <div style={{ background: 'var(--col-neutral)', padding: '2rem var(--container-pad)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="service-nav">
          <a href="#consultation" className="service-nav__btn">💬 個別相談</a>
          <a href="#course" className="service-nav__btn">📚 家計整理アドバイザー講座</a>
          <a href="#seminar" className="service-nav__btn">🌸 グループセミナー</a>
        </div>
      </div>

      <div className="container">
        {/* ── Service 01 個別相談 ── */}
        <div id="consultation" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">💬</span>
                <span className="service-detail__label">Service 01</span>
                <h2 className="service-detail__title">家計×キャリア<br />個別相談</h2>
                <p className="service-detail__desc">
                  お金と働き方を同時に整理する、完全オーダーメイドのセッションです。
                  「家計が苦しい」「仕事を変えたい」「老後が不安」——どんな悩みでも構いません。
                  あなたの言葉で話してください。一緒に整理します。
                </p>
                <div className="service-price-box">
                  <p><strong>料金：</strong>初回60分 無料</p>
                  <p>2回目以降：別途ご案内（無理な継続は一切ありません）</p>
                </div>
                <Link href="/contact" className="btn btn-primary">無料相談を予約する</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  相談の流れ
                </h3>
                <div className="service-flow">
                  {CONSULTATION_FLOW.map((step, i) => (
                    <div key={i} className="service-flow__item">
                      <div className="service-flow__step">{i + 1}</div>
                      <div className="service-flow__body">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Service 02 家計整理アドバイザー講座 ── */}
        <div id="course" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">📚</span>
                <span className="service-detail__label">Service 02</span>
                <h2 className="service-detail__title">家計整理アドバイザー<br />2級講座</h2>
                <p className="service-detail__desc">
                  計算が苦手でも大丈夫。「お金の道を整える」という、まったく新しいアプローチで家計管理を学ぶ講座です。
                  整理収納の考え方をお金に応用した、直感的でわかりやすいメソッドです。
                </p>
                <div className="service-price-box">
                  <p><strong>料金：</strong>別途ご案内</p>
                  <p>お気軽にお問い合わせください。</p>
                </div>
                <Link href="/contact" className="btn btn-primary">講座について問い合わせる</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', color: 'var(--col-body)' }}>
                  受講で得られること
                </h3>
                <ul className="service-feature-list">
                  {COURSE_BENEFITS.map((b, i) => (
                    <li key={i}><span style={{ color: 'var(--col-gold)' }}>✓</span>{b}</li>
                  ))}
                </ul>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', marginTop: '1.5rem', color: 'var(--col-body)' }}>
                  講座の特徴
                </h3>
                <ul className="service-feature-list">
                  {COURSE_FEATURES.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', marginTop: '1.5rem', color: 'var(--col-body)' }}>
                  こんな方におすすめ
                </h3>
                <ul className="service-feature-list">
                  {COURSE_TARGET.map((t, i) => (
                    <li key={i}><span style={{ color: 'var(--col-gold)' }}>◎</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Service 03 グループセミナー ── */}
        <div id="seminar" className="service-detail">
          <FadeIn>
            <span className="service-detail__emoji">🌸</span>
            <span className="service-detail__label">Service 03</span>
            <h2 className="service-detail__title">グループセミナー</h2>
            <div className="service-coming-soon">
              <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌸</p>
              <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.1rem', color: 'var(--col-body)', marginBottom: '0.75rem' }}>
                ただいま準備中です
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--col-body)', opacity: 0.65, marginBottom: '1.5rem', lineHeight: 1.8 }}>
                同じ悩みを持つ仲間と一緒に学ぶ、温かい少人数制のセミナーを準備しています。<br />
                開催情報はメールでお知らせします。
              </p>
              <Link href="/contact" className="btn btn-outline">開催通知を受け取る</Link>
            </div>
          </FadeIn>
        </div>

        {/* サービス比較表 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Compare" title="サービス比較" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ overflowX: 'auto' }}>
              <table className="service-compare-table">
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>個別相談</th>
                    <th>家計整理アドバイザー講座</th>
                    <th>グループセミナー</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>形式</td><td>マンツーマン</td><td>オンライン講座</td><td>少人数グループ</td></tr>
                  <tr><td>初回費用</td><td>無料（60分）</td><td>別途案内</td><td>準備中</td></tr>
                  <tr><td>対象</td><td>家計・キャリア全般</td><td>家計管理・資格取得</td><td>テーマ別</td></tr>
                  <tr><td>オーダーメイド度</td><td>◎ 完全個別対応</td><td>〇 自分のペース</td><td>△ テーマ固定</td></tr>
                  <tr><td>向いている方</td><td>個別に深く相談したい</td><td>スキルを身につけたい</td><td>仲間と学びたい</td></tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </section>

        {/* FAQ */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="FAQ" title="よくある質問" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="faq-list">
              {FAQ.map((item, i) => (
                <div key={i} className="faq-item">
                  <button
                    className="faq-item__question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>Q. {item.q}</span>
                    <span className={`faq-item__icon${openFaq === i ? ' open' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="faq-item__answer">
                      A. {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>

      {/* CTA */}
      <section className="section--dark">
        <div className="container">
          <div className="cta-section">
            <FadeIn>
              <span className="cta-section__eyebrow" style={{ color: 'var(--col-gold)' }}>Free Consultation</span>
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>まずは、無料で話しましょう。</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                どのサービスが合うかわからなくても大丈夫。<br />
                初回無料相談でヒアリングしてから、最適な方法をご提案します。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">無料相談を予約する</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
