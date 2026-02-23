import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const TIMELINE = [
  {
    phase: 'Phase 1',
    title: '日常と葛藤',
    text: '医療事務として働きながら子育てをする毎日。家計簿は3日で挫折。仕事では行き詰まりを感じ、「このままでいいのかな」という焦りが積もっていきました。「私なんて」という言葉が、いつしか口癖になっていました。',
  },
  {
    phase: 'Phase 2',
    title: '転機と気づき',
    text: 'FPの知識と「家計整理アドバイザー」の考え方に出会い、衝撃を受けました。「計算が苦手」でも「意志が弱い」わけでもない。ただ、正しい仕組みを知らなかっただけだった。その気づきが、すべての始まりでした。',
  },
  {
    phase: 'Phase 3',
    title: '現在の使命',
    text: '同じように悩む女性たちを、お金とキャリアの両面から支えたい——その想いで、国家資格キャリアコンサルタントも取得。「伴走プランナー」として、あなたの隣を歩いていきたいと思っています。',
  },
];

const CREDENTIALS = [
  { name: 'ファイナンシャルプランナー（FP）', desc: '家計・貯蓄・投資・老後・保険・税金など総合的なライフプランニング全般のアドバイスが可能。' },
  { name: '国家資格キャリアコンサルタント', desc: '転職・復職・副業・定年後など、働き方の選択肢を整理し、あなたの強みと希望から最適な道を一緒に考えます。' },
  { name: '家計整理アドバイザー', desc: '固定費・変動費の仕分けから始める、「計算しない」家計管理。自然とお金が貯まる仕組みをつくります。' },
];

const FIT_YES = [
  '計算が苦手なのになぜか貯金が増えない',
  'お金とキャリアの両方に不安がある',
  '子育て後・転機のタイミングにいる',
  '一緒に考えてくれる人を求めている',
  '対等に話せる関係を望んでいる',
  'オンラインで相談したい（全国OK）',
];

const FIT_NO = [
  '即座に大きな資産運用成果を求める方',
  '特定の金融商品への投資先紹介のみを求める方',
  '即答・断定的な答えだけを求める方',
  '一度の相談で全問題を解決したい方',
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">About Me</p>
        <h1 className="page-hero__title">伴走プランナー、渡辺加奈子について</h1>
        <p className="page-hero__desc">あなたのことを、一番近くで支えたい。</p>
      </div>

      {/* プロフィール基本情報 */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <div className="profile-strip">
              <div className="profile-strip__photo-wrap">
                <Image
                  src="/images/DSC3587-1024x683.jpg"
                  alt="渡辺かなこ"
                  width={200}
                  height={200}
                  className="profile-strip__photo"
                />
                <div className="profile-strip__quals">
                  <span className="tag">FP</span>
                  <span className="tag tag--green">キャリコン</span>
                  <span className="tag">家計整理アドバイザー</span>
                </div>
              </div>
              <div className="profile-strip__body">
                <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.6rem', fontWeight: 400, color: 'var(--col-body)', marginBottom: '0.3rem' }}>
                  渡辺 加奈子
                </h2>
                <p style={{ color: 'var(--col-gold)', fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
                  FP &amp; 国家資格キャリアコンサルタント / 伴走プランナー
                </p>
                <p>40代・子育て中の働く母として、医療事務のキャリアを持ちながら、FP・キャリアコンサルタントとして活動しています。</p>
                <p>「正しい仕組みを知らないだけで、あなたは何も悪くない」——この言葉を胸に、一人ひとりに寄り添った伴走サポートを提供しています。</p>
                <p>得意なことは、難しいお金の話をわかりやすく、かつ温かく伝えること。あなたの「なんとなく不安」を、一緒に言葉にしていきましょう。</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ストーリータイムライン */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="My Story" title="私がここにいる理由" desc="順風満帆に見えて、実は葛藤と失敗の連続でした。" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="timeline">
              {TIMELINE.map((item, i) => (
                <div key={i} className="timeline__item">
                  <div className="timeline__phase">{item.phase}</div>
                  <div>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 保有資格 */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Credentials" title="保有資格・専門領域" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ overflowX: 'auto' }}>
              <table className="cred-table">
                <tbody>
                  {CREDENTIALS.map((c, i) => (
                    <tr key={i}>
                      <th>{c.name}</th>
                      <td>{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 向いている方・向いていない方 */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="For You" title="こんな方に向いています" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="fit-grid">
              <div className="fit-card fit-card--yes">
                <h3 className="fit-card__title">✅ こんな方におすすめです</h3>
                <ul className="fit-card__list">
                  {FIT_YES.map((item, i) => (
                    <li key={i} className="fit-card__item">
                      <span style={{ color: 'var(--col-gold)', flexShrink: 0 }}>◎</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fit-card fit-card--no">
                <h3 className="fit-card__title">❌ 向いていない方</h3>
                <ul className="fit-card__list">
                  {FIT_NO.map((item, i) => (
                    <li key={i} className="fit-card__item">
                      <span style={{ color: 'var(--col-muted)', flexShrink: 0 }}>×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>まずは、話してみませんか？</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                どんな小さなモヤモヤでも、構いません。<br />
                「相談するほどじゃない」なんてことは、ありません。<br />
                あなたのペースで、お話しください。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">無料相談を予約する</Link>
                <Link href="/services" className="btn btn--outline btn--lg" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>サービス一覧を見る</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
