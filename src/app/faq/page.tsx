'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

const FAQ_ITEMS = [
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
    a: 'はい、宮城県内であればお客様のご指定の場所に伺います。ご希望の場所・日時はお問い合わせ時にお知らせください。',
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

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">FAQ</p>
        <h1 className="page-hero__title">よくある質問</h1>
        <p className="page-hero__desc">ご相談前に気になることがあれば、こちらをご確認ください。</p>
      </div>

      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="FAQ" title="お客様からよくいただくご質問" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="faq-item">
                  <button
                    className="faq-item__question"
                    onClick={() => setOpenItem(openItem === i ? null : i)}
                    aria-expanded={openItem === i}
                  >
                    <span>Q. {item.q}</span>
                    <span className={`faq-item__icon${openItem === i ? ' open' : ''}`}>+</span>
                  </button>
                  {openItem === i && (
                    <div className="faq-item__answer">
                      A. {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section--dark">
        <div className="container">
          <div className="cta-section">
            <FadeIn>
              <span className="cta-section__eyebrow" style={{ color: 'var(--col-gold)' }}>Free Consultation</span>
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>
                まずは、気軽に話してみませんか？
              </h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                疑問や不安はそのまま持ち込んでください。<br />
                初回30分・完全無料でお話をお聞きします。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">
                  無料相談を申し込む
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
