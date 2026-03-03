'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const FAQ = [
  {
    q: '初回相談は本当に無料ですか？',
    a: 'はい、初回60分の相談は完全無料です。独立系FPとして特定の金融機関や保険会社とは提携していないため、商品の販売や勧誘は一切行っていません。',
  },
  {
    q: 'オンライン相談はどのように行いますか？',
    a: 'ZoomまたはGoogle Meetを使用します。パソコン・スマートフォン・タブレットからご参加いただけます。接続方法がわからない場合もサポートしますので、お気軽にどうぞ。',
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
    a: 'もちろんです。わかりやすい言葉でご説明しますので、金融が初めての方も安心してご相談ください。「難しくてわからない」という状態から一緒に整理していきます。',
  },
  {
    q: '相談できる時間帯を教えてください。',
    a: '平日10:00〜19:00、土曜10:00〜17:00です。夜間・日曜については個別にご相談ください。',
  },
  {
    q: '継続的なサポートは受けられますか？',
    a: 'はい、大きなライフイベント（転職・住宅購入・出産など）や定期的な見直しに対応した継続パッケージもご用意しています。',
  },
  {
    q: '金融商品の販売はしていますか？',
    a: '販売・仲介は一切行っていません。独立系FPとして、特定の商品に偏らない中立的なアドバイスのみを提供しています。',
  },
  {
    q: '連絡方法を教えてください。',
    a: 'お問い合わせフォームまたはメールにてご連絡ください。2営業日以内にご返信いたします。',
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
          <a href="#retirement" className="service-nav__btn">🏖️ 老後・年金相談</a>
          <a href="#housing" className="service-nav__btn">🏠 住宅ローン相談</a>
          <a href="#insurance" className="service-nav__btn">🛡️ 保険見直し相談</a>
          <a href="#education" className="service-nav__btn">🎓 教育費・子育て相談</a>
        </div>
      </div>

      <div className="container">

        {/* ── Service 01 老後・年金相談 ── */}
        <div id="retirement" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">🏖️</span>
                <span className="service-detail__label">Service 01</span>
                <h2 className="service-detail__title">老後・年金<br />相談</h2>
                <p className="service-detail__desc">
                  「年金だけでは足りないかも」という不安を、具体的な数字で解消します。
                  老後資金の試算から退職後の資産活用まで、安心した老後を一緒に設計しましょう。
                </p>
                <div className="service-price-box">
                  <p><strong>初回相談：</strong>60分・完全無料</p>
                  <p>2回目以降：5,500円／時間（税込）</p>
                </div>
                <Link href="/contact" className="btn btn-primary">無料相談を申し込む</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  対応する相談内容
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>年金受給額のシミュレーション</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>老後の生活費・必要資金の試算</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>退職後の資産活用・取り崩し計画</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>iDeCo・NISAを活用した老後準備</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>ライフプラン全体のキャッシュフロー作成</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Service 02 住宅ローン相談 ── */}
        <div id="housing" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">🏠</span>
                <span className="service-detail__label">Service 02</span>
                <h2 className="service-detail__title">住宅ローン<br />相談</h2>
                <p className="service-detail__desc">
                  借入可能額の分析から最適なローン選択まで、無理のない返済計画をご提案します。
                  人生最大の買い物を、確かなデータで後押しします。
                </p>
                <div className="service-price-box">
                  <p><strong>初回相談：</strong>60分・完全無料</p>
                  <p>住宅ローン専門パッケージ：16,500円（税込）</p>
                </div>
                <Link href="/contact" className="btn btn-primary">無料相談を申し込む</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  対応する相談内容
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>借入可能額・返済額のシミュレーション</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>固定・変動金利の比較と選び方</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>繰り上げ返済の効果測定</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>住宅購入後の家計バランス確認</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>団体信用生命保険の選択アドバイス</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Service 03 保険見直し相談 ── */}
        <div id="insurance" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">🛡️</span>
                <span className="service-detail__label">Service 03</span>
                <h2 className="service-detail__title">保険見直し<br />相談</h2>
                <p className="service-detail__desc">
                  現在加入中の保険を中立的な視点で分析します。
                  本当に必要な保障を確保しながら、無駄なコストを削減する最適なプランをご提案します。
                </p>
                <div className="service-price-box">
                  <p><strong>初回相談：</strong>60分・完全無料</p>
                  <p>保険診断レポート（提案書付き）：11,000円（税込）</p>
                </div>
                <Link href="/contact" className="btn btn-primary">無料相談を申し込む</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  対応する相談内容
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>現在の保険の必要性・過不足の確認</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>生命保険・医療保険・火災保険の見直し</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>公的保険（健康保険・年金）との重複確認</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>保障額・保険料のバランス最適化</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>中立的な立場からの商品比較レポート</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Service 04 教育費・子育て相談 ── */}
        <div id="education" className="service-detail">
          <FadeIn>
            <div className="service-detail__inner">
              <div>
                <span className="service-detail__emoji">🎓</span>
                <span className="service-detail__label">Service 04</span>
                <h2 className="service-detail__title">教育費・子育て<br />相談</h2>
                <p className="service-detail__desc">
                  幼稚園から大学までの教育費を試算し、無理のない貯蓄プランをご提案します。
                  学資保険・ジュニアNISAなど、教育資金に合った方法も一緒に考えます。
                </p>
                <div className="service-price-box">
                  <p><strong>初回相談：</strong>60分・完全無料</p>
                  <p>2回目以降：5,500円／時間（税込）</p>
                </div>
                <Link href="/contact" className="btn btn-primary">無料相談を申し込む</Link>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--col-body)' }}>
                  対応する相談内容
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>幼稚園〜大学までの教育費総額シミュレーション</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>無理のない教育費の貯め方・準備方法</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>学資保険・ジュニアNISAの比較検討</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>教育費と老後資金の両立プラン</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>奨学金制度の活用方法</li>
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
                  <tr><td>初回相談（60分）</td><td><strong>無料</strong></td></tr>
                  <tr><td>2回目以降の相談（1時間あたり）</td><td>5,500円（税込）</td></tr>
                  <tr><td>ライフプラン総合診断（キャッシュフロー分析付き）</td><td>33,000円（税込）</td></tr>
                  <tr><td>住宅ローン専門パッケージ</td><td>16,500円（税込）</td></tr>
                  <tr><td>保険診断レポート（提案書付き）</td><td>11,000円（税込）</td></tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--col-muted)' }}>
              ※ 料金はすべて税込表示です。パッケージ内容については、お問い合わせ時にご案内いたします。
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
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>平日10:00〜19:00 / 土曜10:00〜17:00</li>
                </ul>
              </div>
              <div>
                <span className="service-detail__emoji">🤝</span>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--col-body)' }}>
                  対面相談（東京・神奈川・埼玉）
                </h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>東京・神奈川・埼玉エリアで対応</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>場所はご相談時にご案内します</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>ご希望の場合はお問い合わせ時にお知らせください</li>
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
                初回60分の無料相談でヒアリングしてから、最適な方法をご提案します。
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
