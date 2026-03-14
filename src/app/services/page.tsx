import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const SERVICES = [
  {
    num: '01',
    label: 'Course',
    title: '家計整理アドバイザー\n2級講座',
    desc: '計算が苦手でも大丈夫。「お金の道を整える」独自メソッドで家計を自分でコントロールできるようになります。資格取得を通じて、一生使えるスキルを身につけましょう。',
    price: '¥32,780（税込）',
    priceNote: 'テキスト・受験料込み',
    img: '/images/service-course.png',
    href: '/services/course',
    tags: ['マンツーマン指導', 'オンライン全国対応', '資格取得'],
  },
  {
    num: '02',
    label: 'Consultation',
    title: '家計×キャリア\n個別相談',
    desc: 'お金と働き方を同時に整理する、完全オーダーメイドのセッション。扶養の壁・老後資金・キャリアの方向性など、漠然としたモヤモヤを具体的な一歩に変えます。',
    price: '¥5,500〜（税込）',
    priceNote: '単発60分〜｜包括コースあり',
    img: '/images/service-consultation.png',
    href: '/services/consultation',
    tags: ['FP×キャリア', 'オンライン全国対応', 'ライフプラン'],
  },
  {
    num: '03',
    label: 'Seminar',
    title: '進学マネー\nセミナー',
    desc: '中学・高校・大学の教育費を「見える化」するグループセミナー。奨学金・教育ローンの賢い使い方から、老後資金と両立する貯蓄計画まで、具体的に学べます。',
    price: '近日公開予定',
    priceNote: '少人数制・約2時間',
    img: '/images/service-seminar.png',
    href: '/services/seminar',
    tags: ['少人数制', 'オンライン・対面', '教育費対策'],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Services</p>
        <h1 className="page-hero__title">サービス一覧</h1>
        <p className="page-hero__desc">あなたの状況とゴールに合ったサポートをお選びください。</p>
      </div>

      <div className="container">

        {/* サービス3枚カード */}
        <section className="section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {SERVICES.map((svc, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'center',
                }}>
                  {/* 画像 */}
                  <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/10' }}>
                    <Image
                      src={svc.img}
                      alt={svc.title.replace('\n', '')}
                      width={600}
                      height={375}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* テキスト */}
                  <div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--col-gold)', display: 'block', marginBottom: '0.4rem' }}>
                      {svc.label}
                    </span>
                    <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '300', lineHeight: '1.5', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                      {svc.title}
                    </h2>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', lineHeight: '2', color: 'var(--col-muted)', marginBottom: '1.25rem' }}>
                      {svc.desc}
                    </p>

                    {/* タグ */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {svc.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>

                    {/* 料金 */}
                    <div style={{
                      background: 'var(--col-neutral)',
                      border: '1px solid rgba(0,0,0,0.07)',
                      borderRadius: '12px',
                      padding: '1rem 1.25rem',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.75rem',
                    }}>
                      <span style={{ fontSize: '1.25rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: '400', color: 'var(--col-body)' }}>{svc.price}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--col-muted)', fontWeight: '300' }}>{svc.priceNote}</span>
                    </div>

                    <Link href={svc.href} className="btn btn-primary">詳しく見る</Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* どのサービスを選べばいいか */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Which Service?" title="どのサービスが合うか迷ったら" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                { text: '家計を根本から見直して、自分でも管理できるスキルを身につけたい', link: '/services/course', label: '→ 2級講座へ' },
                { text: 'FPに直接相談して、自分の状況に合ったアドバイスをもらいたい', link: '/services/consultation', label: '→ 個別相談へ' },
                { text: '子どもの進学費用が心配で、教育費の全体像を把握したい', link: '/services/seminar', label: '→ セミナーへ' },
                { text: 'どのサービスが合うか正直わからない', link: '/contact', label: '→ まず問い合わせる' },
              ].map((item, i) => (
                <Link key={i} href={item.link} style={{ textDecoration: 'none' }}>
                  <div className="which-service-card">
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', lineHeight: '1.8', color: 'var(--col-body)', marginBottom: '0.75rem' }}>
                      {item.text}
                    </p>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--col-gold)', fontWeight: '400' }}>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 安心ポイント */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Why money web" title="安心してご相談ください" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '🔒', title: '完全中立', desc: '特定の金融機関・保険会社とは一切関係なし。商品の販売・勧誘は行いません。' },
                { icon: '🤝', title: 'FP × キャリア', desc: 'FP2級と国家資格キャリアコンサルタントの両視点から、お金と働き方を一緒に整理。' },
                { icon: '📍', title: 'オンライン全国対応', desc: 'Zoom・Google Meetで全国どこからでも参加可能。対面は宮城県内にも対応。' },
                { icon: '💬', title: '知識ゼロでも歓迎', desc: '金融用語をわかりやすく説明。初めての方も、漠然とした不安からでも大歓迎。' },
              ].map((item, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                  background: 'var(--col-neutral)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '20px',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <h4 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'var(--text-base)', fontWeight: '400', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.8' }}>{item.desc}</p>
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
              <span className="cta-section__eyebrow" style={{ color: 'var(--col-gold)' }}>Contact</span>
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>どのサービスかわからなくても大丈夫。</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                まずはお問い合わせください。<br />
                ヒアリングしてから、最適な方法をご提案します。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">お問い合わせ</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
