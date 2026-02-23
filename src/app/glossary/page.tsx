'use client';
import { useState, useMemo } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const TERMS = [
  { term: 'iDeCo（イデコ）', kana: 'い', cat: '投資', desc: '個人型確定拠出年金。毎月の掛け金が全額所得控除になり、節税しながら老後資産を積み立てられる制度。専業主婦でも加入できる（掛け金上限は月2.3万円）。' },
  { term: 'インフレ', kana: 'い', cat: '老後・年金', desc: '物価が上がり、同じお金で買えるものが少なくなる現象。老後資金をただ貯金しているだけでは、インフレで実質的な価値が減ることに注意が必要。' },
  { term: '扶養（ふよう）', kana: 'ふ', cat: '家計管理', desc: '配偶者や家族の収入によって、税金・社会保険の優遇を受けられる制度。年収103万円・106万円・130万円などの「壁」が有名で、超えると手取りが減ることがある。' },
  { term: '家計整理', kana: 'か', cat: '家計管理', desc: '収入・支出・資産・負債を整理し、お金の流れを把握すること。節約ではなく「お金の道を整える」という考え方で、自然とお金が貯まる仕組みをつくる。' },
  { term: '確定拠出年金', kana: 'か', cat: '老後・年金', desc: 'iDeCo（個人型）と企業型の2種類がある。自分で運用先を選び、60歳以降に受け取る年金制度。運用益が非課税になるメリットがある。' },
  { term: 'キャッシュフロー', kana: 'き', cat: '家計管理', desc: 'お金の流れのこと。収入から支出を引いた残り（フリーキャッシュフロー）がプラスになるよう管理することが家計改善の基本。' },
  { term: '教育資金', kana: 'き', cat: '家計管理', desc: '子どもの教育にかかる費用の総称。幼稚園〜大学までを公立・私立で試算すると、私立文系の場合で約2,200万円ともいわれる。40代からの準備が重要。' },
  { term: '繰り上げ返済', kana: 'く', cat: '家計管理', desc: '住宅ローンの残高を予定より早く返済すること。利息を減らせるが、手元の流動資金が減るデメリットも。老後資金とのバランスを考えることが大切。' },
  { term: '社会保険料', kana: 'し', cat: '家計管理', desc: '健康保険・厚生年金・雇用保険などの総称。収入が増えると天引き額も増えるため、扶養の壁を超えるときの計算に必ず含める必要がある。' },
  { term: '資産形成', kana: 'し', cat: '投資', desc: '将来のために資産を積み上げていくこと。預金・NISA・iDeCo・保険などを組み合わせて、老後や子どもの教育に備えるライフプランの核心。' },
  { term: 'セカンドキャリア', kana: 'せ', cat: 'キャリア', desc: '40代以降の第2の職業・働き方。主婦から資格取得・副業・起業など、これまでの経験を活かした新たなキャリアを指す。' },
  { term: '積立NISA', kana: 'つ', cat: '投資', desc: '2024年1月から新NISAに統合されたが、積立投資枠として継続。年間120万円まで積立投資でき、運用益が非課税。長期・積立・分散投資が基本。' },
  { term: '年金定期便', kana: 'ね', cat: '老後・年金', desc: 'ねんきんネットやハガキで毎年届く、自分の年金見込み額の通知。50歳以上は「60歳まで加入した場合の見込み額」が確認できる。老後資金計画の基礎になる。' },
  { term: 'NISA（ニーサ）', kana: 'に', cat: '投資', desc: '少額投資非課税制度。2024年から新NISAとして大幅拡充。つみたて投資枠（年120万円）と成長投資枠（年240万円）を合わせて年360万円まで非課税で投資できる。' },
  { term: 'ライフプラン', kana: 'ら', cat: '家計管理', desc: '人生の設計図。結婚・出産・教育・老後などのライフイベントと、それに伴うお金の計画を合わせて考えるもの。FPに相談する際の基本情報になる。' },
  { term: 'ライフプラン表', kana: 'ら', cat: '家計管理', desc: '家族の年齢・収入・支出・貯蓄残高などを年ごとに表にしたもの。「老後資金がいくら必要か」「教育費のピークはいつか」を視覚的に把握できる。' },
  { term: 'マクロ経済スライド', kana: 'ま', cat: '老後・年金', desc: '現役世代の人口減少・賃金変動に合わせて、年金支給額を自動的に調整する仕組み。将来的に年金は現在より少なくなる可能性が高い。' },
  { term: 'ミッドライフ・クライシス', kana: 'み', cat: 'キャリア', desc: '40代前後に多くの人が経験する、人生の意味や方向性への迷いや虚無感。キャリアの転換点でもあり、FP・キャリア相談が有効なことが多い。' },
  { term: '老後資金', kana: 'ろ', cat: '老後・年金', desc: '老後の生活費として必要なお金。総務省の調査では老後の生活費は月約26万円が目安とされる。年金収入との差額を自分で準備する必要があり、早めの対策が重要。' },
  { term: '固定費', kana: 'こ', cat: '家計管理', desc: '毎月必ず発生する費用（家賃・保険料・通信費など）。一度見直すと効果が継続するため、家計改善の最優先項目。' },
  { term: '変動費', kana: 'へ', cat: '家計管理', desc: '月によって金額が変わる費用（食費・光熱費・医療費など）。固定費より節約の効果は小さいが、行動の変化が直接反映される。' },
  { term: '保険の見直し', kana: 'ほ', cat: '保険', desc: '加入している保険が現在の生活スタイルに合っているか確認すること。ライフステージに合わせた見直しが重要。' },
  { term: 'つみたて投資', kana: 'つ', cat: '投資', desc: '毎月一定金額を投資する方法。ドルコスト平均法により価格変動リスクを分散できる。長期間続けることで複利効果も期待できる。' },
  { term: '家計の見える化', kana: 'か', cat: '家計管理', desc: '収入・支出・資産の現状を数字で把握すること。漠然とした不安の多くは、数字が見えていないことが原因。' },
  { term: '扶養の壁', kana: 'ふ', cat: 'キャリア', desc: '税金・社会保険の扶養控除が外れる年収ラインの俗称。103万円・106万円・130万円・150万円などのラインがある。' },
];

const GOJUON = ['すべて', 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'];
const GOJUON_MAP: Record<string, string[]> = {
  'あ': ['あ','い','う','え','お'],
  'か': ['か','き','く','け','こ'],
  'さ': ['さ','し','す','せ','そ'],
  'た': ['た','ち','つ','て','と'],
  'な': ['な','に','ぬ','ね','の'],
  'は': ['は','ひ','ふ','へ','ほ'],
  'ま': ['ま','み','む','め','も'],
  'や': ['や','ゆ','よ'],
  'ら': ['ら','り','る','れ','ろ'],
  'わ': ['わ','を','ん'],
};

const CATS = ['すべて', '家計管理', '老後・年金', '投資', '保険', 'キャリア'];

export default function GlossaryPage() {
  const [activeRow, setActiveRow] = useState('すべて');
  const [activeCat, setActiveCat] = useState('すべて');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return TERMS.filter(t => {
      const rowMatch = activeRow === 'すべて' || (GOJUON_MAP[activeRow] || []).includes(t.kana);
      const catMatch = activeCat === 'すべて' || t.cat === activeCat;
      const searchMatch = search === '' || t.term.includes(search) || t.desc.includes(search);
      return rowMatch && catMatch && searchMatch;
    });
  }, [activeRow, activeCat, search]);

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Glossary</p>
        <h1 className="page-hero__title">FP用語集</h1>
        <p className="page-hero__desc">難しいお金の言葉を、わかりやすく解説します</p>
      </div>

      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Dictionary" title="FP・家計管理用語集" desc={`全${TERMS.length}語収録`} />
          </FadeIn>

          <FadeIn delay={100}>
            <div className="glossary-controls">
              {/* 検索 */}
              <input
                type="text"
                className="glossary-search"
                placeholder="用語・説明文を検索..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              {/* 50音インデックス */}
              <div className="glossary-index">
                {GOJUON.map(row => (
                  <button
                    key={row}
                    className={`glossary-index__btn${activeRow === row ? ' active' : ''}`}
                    onClick={() => setActiveRow(row)}
                  >
                    {row}行
                  </button>
                ))}
              </div>

              {/* カテゴリフィルター */}
              <div className="glossary-cats">
                {CATS.map(cat => (
                  <button
                    key={cat}
                    className={`glossary-cat__btn${activeCat === cat ? ' active' : ''}`}
                    onClick={() => setActiveCat(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            {filtered.length > 0 ? (
              <div className="glossary-list">
                {filtered.map((item, i) => (
                  <div key={i} className="glossary-item">
                    <div className="glossary-item__header">
                      <span className="glossary-item__term">{item.term}</span>
                      <span className={`tag${item.cat === 'キャリア' ? ' tag--green' : item.cat === '投資' || item.cat === '老後・年金' ? ' tag--neutral' : ''}`}>
                        {item.cat}
                      </span>
                    </div>
                    <p className="glossary-item__desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="glossary-empty">該当する用語が見つかりませんでした。</p>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
