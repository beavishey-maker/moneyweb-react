import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const VOICES = [
  {
    initial: 'A',
    name: 'Aさん',
    meta: '42歳・パート主婦',
    title: '「霧が晴れたようにスッキリした」',
    quote: '子育てが落ち着いてからの空白感が、ずっとモヤモヤしていました。お金のことだけでなく、これからの働き方まで一緒に考えてもらえて、本当に助かりました。',
    before: ['子育て後の空白感が消えない', '将来の方向性がわからない', 'キャリアに自信が持てない'],
    after: ['これからの働き方が見えてきた', '自分に合う仕事のヒントが見つかった', '相談して本当によかった'],
  },
  {
    initial: 'B',
    name: 'Bさん',
    meta: '47歳・フルタイム会社員',
    title: '「肩の荷が下りた感覚でした」',
    quote: '老後の不安で夜も眠れない時期がありました。数字で現状を見える化してもらったら、「あれ、思ったより大丈夫かも」と安心できました。',
    before: ['老後破産が怖くて眠れない', '毎月いくら貯めればいいかわからない', '漠然とした不安が続いていた'],
    after: ['ライフプランが明確になった', '「思ったより大丈夫」と実感できた', '家計管理がシンプルになった'],
  },
  {
    initial: 'C',
    name: 'Cさん',
    meta: '44歳・パート主婦',
    title: '「副業まで始められました！」',
    quote: '計算は苦手なのに受講して、本当に良かったです。家計のストレスがなくなっただけでなく、副業まで始められました！',
    before: ['計算が苦手で家計整理に自信なし', '「私なんて…」が口癖だった', '何から始めていいかわからない'],
    after: ['「お金の道を整える」考え方で管理がシンプルに', '副業をスタートできた', '生き生きと活動中'],
  },
  {
    initial: 'D',
    name: 'Dさん',
    meta: '45歳・専業主婦',
    title: '「最適な選択ができました」',
    quote: '扶養内か外れるか、何年も迷い続けていました。数字で比較して整理してもらったおかげで、自分の状況に合った答えが出せました。夫とも共有できました。',
    before: ['扶養内か外れるか何年も迷っていた', '損得の計算方法がわからない', '夫と話し合えていなかった'],
    after: ['自分の状況に合わせた数字で比較できた', '納得のいく選択ができた', '夫婦で同じ方向を向けた'],
  },
  {
    initial: 'E',
    name: 'Eさん',
    meta: '49歳・パート主婦',
    title: '「NISAをスタートできました」',
    quote: 'NISAって何？という状態から、自分に合った積立額が決まって、小さく始められました。ずっと怖かったのが嘘みたいです。',
    before: ['NISAの意味・始め方がわからなかった', '老後資金がゼロで不安だった', '怖くて始められなかった'],
    after: ['自分に合った積立額が決まった', '小さくNISAをスタートできた', '老後への不安が和らいだ'],
  },
  {
    initial: 'F',
    name: 'Fさん',
    meta: '43歳・会社員',
    title: '「転職へ前向きに動き出せた」',
    quote: '今の会社でいいのかずっと迷っていました。キャリアの棚卸しをして強みが言語化できたことで、転職への一歩を踏み出す勇気が生まれました。',
    before: ['今の会社でいいのか迷い続けていた', '自分の強みがわからなかった', '行動できずにいた'],
    after: ['キャリアの棚卸しができた', '強みが言語化できた', '転職へ前向きに動き出せた'],
  },
];

const BA_BEFORE = [
  '毎月赤字寸前で自転車操業',
  '老後破産が怖くて眠れない日がある',
  '扶養の壁で何年も同じ悩みを抱えている',
  '「私なんて特別なスキルがない」と自信がない',
  '節約情報を調べすぎて脳が疲弊している',
];

const BA_AFTER = [
  'ライフプランが見えて、未来への不安が和らいだ',
  '「使っていいお金の基準」が明確になった',
  '客観的な数字で最適な働き方を選べた',
  '新しい一歩を踏み出す勇気が生まれた',
  '自分らしいキャリアの道筋が見えてきた',
];

export default function ResultsPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Customer Voices</p>
        <h1 className="page-hero__title">お客様の声</h1>
        <p className="page-hero__desc">ご相談者さまの「変化」を、ご本人の言葉で。</p>
      </div>

      {/* 声グリッド */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Voices" title="ご相談者さまの声" desc="すべて実際のご相談者さまより許可を得て掲載しています。" />
          </FadeIn>
          <div className="voice-grid">
            {VOICES.map((v, i) => (
              <FadeIn key={i} delay={(i % 2) * 100}>
                <article className="voice-card">
                  <h3 className="voice-card__title">{v.title}</h3>
                  <p className="voice-card__quote">&ldquo;{v.quote}&rdquo;</p>
                  <div className="voice-card__ba">
                    <div className="voice-card__before">
                      <p className="voice-card__ba-label">Before</p>
                      <ul>
                        {v.before.map((b, j) => <li key={j}>・{b}</li>)}
                      </ul>
                    </div>
                    <div className="voice-card__after">
                      <p className="voice-card__ba-label">After</p>
                      <ul>
                        {v.after.map((a, j) => <li key={j}>✓ {a}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="voice-card__author">
                    <div className="testimonial-card__avatar">{v.initial}</div>
                    <div>
                      <p className="testimonial-card__name">{v.name}</p>
                      <p className="testimonial-card__meta">{v.meta}</p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After まとめ */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Before / After" title="みなさんに共通した変化" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="ba-summary">
              <div className="ba-summary__col ba-summary__col--before">
                <p className="ba-summary__label">Before — ご相談前</p>
                <ul className="ba-summary__list">
                  {BA_BEFORE.map((item, i) => (
                    <li key={i}>🔴 {item}</li>
                  ))}
                </ul>
              </div>
              <div className="ba-summary__col ba-summary__col--after">
                <p className="ba-summary__label">After — ご相談後</p>
                <ul className="ba-summary__list">
                  {BA_AFTER.map((item, i) => (
                    <li key={i}>🟢 {item}</li>
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
              <span className="cta-section__eyebrow" style={{ color: 'var(--col-gold)' }}>Your Turn</span>
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>次は、あなたの番です。</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                同じように悩んでいた方々が、一歩を踏み出しました。<br />
                あなたの「変化」も、必ず起こせます。
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
