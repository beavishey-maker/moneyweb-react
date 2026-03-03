'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const FAQ = [
  {
    q: '初回相談は本当に無料ですか？',
    a: 'はい、初回30分の相談は完全無料です。商品の販売や勧誘は一切行っていません。',
  },
  {
    q: 'オンライン相談はどのように行いますか？',
    a: 'ZoomまたはGoogle Meetを使用します。パソコン・スマートフォン・タブレットからご参加いただけます。接続方法がわからない場合もサポートしますので、お気軽にどうぞ。',
  },
  {
    q: '対面相談は対応していますか？',
    a: 'はい、宮城県内であればお客様のご指定の場所に伺います。ご希望の場所・日時をお問い合わせ時にお知らせください。',
  },
  {
    q: '相談できる時間帯を教えてください。',
    a: '応相談です。ご希望の日時をお気軽にお問い合わせください。',
  },
  {
    q: '相談前に準備するものはありますか？',
    a: '初回は特に準備不要です。2回目以降は、保険証券・年金定期便・家計の収支メモなどをご用意いただくと話が進みやすくなります。',
  },
  {
    q: '個人情報の取り扱いは安全ですか？',
    a: 'FPとしての倫理規定に基づき、お客様の情報は厳重に管理しています。ご相談内容を外部に開示することは一切ありません。',
  },
  {
    q: '夫婦・家族で参加できますか？',
    a: 'はい、ご夫婦・ご家族でのご参加も歓迎しています。追加料金はかかりません。',
  },
  {
    q: 'アドバイスに従わなければいけませんか？',
    a: 'いいえ、実行するかどうかはご自身のご判断に完全に委ねています。相談後に何かを強制されることは一切ありません。',
  },
  {
    q: '金融の知識がなくても大丈夫ですか？',
    a: 'もちろんです。わかりやすい言葉でご説明しますので、金融が初めての方も安心してご相談ください。',
  },
  {
    q: '金融商品の販売はしていますか？',
    a: '販売・仲介は一切行っていません。特定の商品に偏らない中立的なアドバイスのみを提供しています。',
  },
  {
    q: '連絡方法を教えてください。',
    a: 'お問い合わせフォームにてご連絡ください。2営業日以内にご返信いたします。',
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Services &amp; Pricing</p>
        <h1 className="page-hero__title">サービス・料金</h1>
        <p className="page-hero__desc">あなたの状況に合ったサポートをお選びください。</p>
      </div>

      {/* サービスナビ */}
      <div style={{ background: 'var(--col-neutral)', padding: '2rem var(--container-pad)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="service-nav">
          <a href="#course" className="service-nav__btn">📚 家計整理アドバイザー2級講座</a>
          <a href="#consultation" className="service-nav__btn">🌿 家計×キャリア個別相談</a>
          <a href="#seminar" className="service-nav__btn">🎓 進学マネーセミナー</a>
        </div>
      </div>

      <div className="container">

        {/* ── Service 01 家計整理アドバイザー2級講座 ── */}
        <div id="course" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">📚</span>
                <span className="service-detail__label">Service 01</span>
                <h2 className="service-detail__title">家計整理アドバイザー<br />2級講座</h2>
                <p className="service-detail__desc">
                  計算が苦手でも大丈夫。「お金の道を整える」というまったく新しいアプローチで、家計を自分でコントロールできるようになります。資格取得を通じて、一生使えるスキルを身につけましょう。
                </p>
                <div className="service-price-box">
                  <p><strong>受講料：</strong>44,000円（税込）</p>
                  <p>テキスト・資格受験料込み</p>
                </div>
                <Link href="/contact" className="btn btn-primary">講座について問い合わせる</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  講座で学べること
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>家計の「見える化」と整理の基本</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>お金の流れをブロック図で把握する独自メソッド</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>固定費・変動費の最適化</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>貯蓄・保険・投資の優先順位の付け方</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>資格試験対策（家計整理アドバイザー2級）</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Service 02 家計×キャリア個別相談 ── */}
        <div id="consultation" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">🌿</span>
                <span className="service-detail__label">Service 02</span>
                <h2 className="service-detail__title">家計×キャリア<br />個別相談</h2>
                <p className="service-detail__desc">
                  お金と働き方を同時に整理する、完全オーダーメイドのセッション。扶養の壁・老後資金・キャリアの方向性など、漠然としたモヤモヤを具体的な一歩に変えます。
                </p>
                <div className="service-price-box">
                  <p><strong>初回相談：</strong>30分・完全無料</p>
                  <p>2回目以降：5,500円／時間（税込）</p>
                  <p style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                    💻 <strong>オンライン：</strong>全国対応<br />
                    🤝 <strong>対面：</strong>宮城県内・お客様ご指定の場所<br />
                    🕐 <strong>対応時間：</strong>応相談
                  </p>
                </div>
                <Link href="/contact" className="btn btn-primary">無料相談を申し込む</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  対応する相談内容
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>家計の現状分析と課題の整理</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>扶養内・外どちらが得か試算</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>老後・教育費のキャッシュフロー作成</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>キャリアの棚卸しと働き方の選択肢整理</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>ライフプラン全体の方向性アドバイス</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Service 03 進学マネーセミナー ── */}
        <div id="seminar" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">🎓</span>
                <span className="service-detail__label">Service 03</span>
                <h2 className="service-detail__title">進学マネー<br />セミナー</h2>
                <p className="service-detail__desc">
                  中学・高校・大学の進学費用を「見える化」するグループセミナー。奨学金・教育ローンの賢い使い方から、老後資金と両立する貯蓄計画まで、具体的に学べます。
                </p>
                <div className="service-price-box">
                  <p><strong>参加費：</strong>近日公開予定</p>
                </div>
                <Link href="/contact" className="btn btn-primary">開催通知を受け取る</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  セミナーで学べること
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>中学〜大学までの教育費総額シミュレーション</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>国公立・私立・理系・文系別の費用比較</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>奨学金の種類と返済シミュレーション</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>教育ローンの活用と注意点</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>教育費と老後資金を両立する貯蓄プラン</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 料金一覧 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Pricing" title="料金一覧" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ overflowX: 'auto' }}>
              <table className="service-compare-table">
                <thead>
                  <tr>
                    <th>サービス内容</th>
                    <th>料金</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>初回相談（30分）</strong>
                      <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--col-muted)', marginTop: '0.2rem' }}>おすすめ・お悩みのヒアリングと方向性のご提案</span>
                    </td>
                    <td><strong style={{ fontSize: '1.1rem' }}>無料</strong></td>
                  </tr>
                  <tr>
                    <td>
                      <strong>2回目以降の相談（60分）</strong>
                      <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--col-muted)', marginTop: '0.2rem' }}>具体的なプランの作成・提案</span>
                    </td>
                    <td><strong style={{ fontSize: '1.1rem' }}>5,500 円</strong><span style={{ fontSize: '0.8rem', color: 'var(--col-muted)' }}>（税込）</span></td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ライフプラン作成（包括プラン）</strong>
                      <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--col-muted)', marginTop: '0.2rem' }}>キャッシュフロー表作成・包括的なアドバイス</span>
                    </td>
                    <td><strong style={{ fontSize: '1.1rem' }}>33,000 円</strong><span style={{ fontSize: '0.8rem', color: 'var(--col-muted)' }}>（税込）</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--col-muted)' }}>
              ※ 料金はすべて税込表示です。
            </p>
          </FadeIn>
        </section>

        {/* 相談方法 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="How to consult" title="相談方法" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">💻</span>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--col-body)' }}>
                  オンライン相談（全国対応）
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>ZoomまたはGoogle Meetを使用</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>全国どこからでもご参加いただけます</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>対応時間：応相談</li>
                </ul>
              </div>
              <div>
                <span className="service-detail__emoji">🤝</span>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--col-body)' }}>
                  対面相談（宮城県内）
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>宮城県内・お客様ご指定の場所に伺います</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>対応時間：応相談</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>ご希望の場所・日時はお問い合わせ時にご連絡ください</li>
                </ul>
              </div>
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
                初回30分の無料相談でヒアリングしてから、最適な方法をご提案します。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">無料相談を申し込む</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
