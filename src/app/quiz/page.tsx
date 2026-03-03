'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

const QUESTIONS = [
  {
    q: '月末に通帳を見たとき、正直どう感じますか？',
    options: [
      { text: '思ったより減っていて、ため息が出る',           score: 'A' }, // A:3
      { text: '毎月ほぼ同じ残高で、まあこんなもの',           score: 'B' }, // B:3
      { text: '目標額に少し届かなくて悔しい',                 score: 'C' }, // C:3
      { text: '投資の評価額と合わせて確認する習慣がある',     score: 'D' }, // D:4
    ],
  },
  {
    q: '「老後2000万円問題」のニュースを見たとき、最初に思ったことは？',
    options: [
      { text: '絶対無理…と暗い気持ちになった',               score: 'A' }, // A:4
      { text: 'なんとかなるでしょ、と思った',                 score: 'B' }, // B:4
      { text: '自分はどうなんだろうと計算してみた',           score: 'C' }, // C:3
      { text: 'NISAやiDeCoで対策しようと思った',             score: 'D' }, // D:4
    ],
  },
  {
    q: '「家計簿」と聞いて、一番近いのは？',
    options: [
      { text: '始めても三日坊主で終わる…',                   score: 'B' }, // B:3
      { text: 'つけているけど、残高が合わない',               score: 'A' }, // A:3
      { text: 'アプリで自動化して、毎月チェック',             score: 'C' }, // C:4
      { text: '収支より「投資配分」の管理が気になる',         score: 'D' }, // D:4
    ],
  },
  {
    q: '今の働き方について、率直に言うと？',
    options: [
      { text: '扶養内で続けるか迷っているが、一歩が踏み出せない', score: 'A' }, // A:3
      { text: 'まあ今の状況に満足している',                   score: 'B' }, // B:4
      { text: 'もう少し収入を増やす方法を模索中',             score: 'C' }, // C:3=D:3 → C優先
      { text: '副業や転職を本格的に検討している',             score: 'D' }, // D:4
    ],
  },
  {
    q: 'ポイ活や節約情報に対して、正直なところは？',
    options: [
      { text: 'やらなきゃと思いつつ、情報が多すぎて疲れた',   score: 'A' }, // A:3
      { text: '面倒くさいのでほとんどやっていない',           score: 'B' }, // B:4
      { text: 'やるべきことを絞って、仕組み化している',       score: 'C' }, // C:4
      { text: 'そういう小さな節約より、収入アップに集中したい', score: 'D' }, // D:4
    ],
  },
  {
    q: '家族や友人との食事・旅行に対して感じることは？',
    options: [
      { text: '楽しいけど、使いすぎたかなと罪悪感がある',     score: 'A' }, // A:4
      { text: '特にお金のことは考えずに楽しむ',               score: 'B' }, // B:4
      { text: '予算を決めて、その範囲で思いきり楽しむ',       score: 'C' }, // C:4
      { text: '自己投資（スキルアップ等）にもお金を使いたい', score: 'D' }, // D:4
    ],
  },
  {
    q: '「教育費」についてどう向き合っていますか？',
    options: [
      { text: '大学費用を考えると、夜も眠れないほど不安',             score: 'A' }, // A:4
      { text: '何とかなると思っているが、具体的には考えていない',     score: 'B' }, // B:4
      { text: '学費の見積もりを出して、貯蓄計画を立てている',         score: 'C' }, // C:4
      { text: '奨学金や教育ローンも含めて柔軟に考えている',           score: 'D' }, // D:4
    ],
  },
  {
    q: '自分の「強み」や「得意なこと」についてどう思う？',
    options: [
      { text: '「私には特別なスキルがない」とよく思う',               score: 'A' }, // A:3
      { text: '深く考えたことがない',                                 score: 'B' }, // B:4
      { text: '今の仕事経験を棚卸しして、強みを整理したい',           score: 'C' }, // C:3=D:3 → C優先
      { text: '自分の強みを活かした副業や転職を考えている',           score: 'D' }, // D:4
    ],
  },
  {
    q: '5年後の自分について、イメージしてみると？',
    options: [
      { text: '考えると不安になるので、あまり考えたくない',           score: 'A' }, // A:4
      { text: '今と変わらないといいな、と思う',                       score: 'B' }, // B:4
      { text: '家計を整えて、もう少し余裕のある生活をしたい',         score: 'C' }, // C:4
      { text: '新しいキャリアに挑戦して、やりがいを持って働きたい',   score: 'D' }, // D:4
    ],
  },
  {
    q: 'FPやキャリアコンサルタントへの相談について、正直なところは？',
    options: [
      { text: '怒られそうで怖い / 恥ずかしい気がする',               score: 'A' }, // A:3
      { text: '商品を売りつけられそうで警戒している',                 score: 'B' }, // B:3
      { text: '一度、専門家に客観的に見てもらいたいと思っている',     score: 'C' }, // C:4
      { text: '相談して、具体的なアクションプランを作りたい',         score: 'D' }, // D:4
    ],
  },
];

const RESULTS: Record<string, { type: string; emoji: string; color: string; headline: string; desc: string; advice: string; cta: string }> = {
  A: {
    type: '心配性な管理タイプ',
    emoji: '🌙',
    color: '#7A9E7E',
    headline: '将来への不安が強く、でも動き方がわからないあなたへ',
    desc: '老後資金や教育費への不安が常に頭のどこかにある、真剣に家族のことを考えている方です。お金を使うことへの罪悪感を感じることもあるかもしれません。まずは「見えない不安」を数字で可視化することが、大きな安心への第一歩になります。',
    advice: 'まず現状の家計を「見える化」するところから始めましょう。不安の正体がはっきりすると、思ったよりずっと気持ちが楽になります。',
    cta: '現状を一緒に整理しませんか？',
  },
  B: {
    type: '直感的おおらかタイプ',
    emoji: '☀️',
    color: '#C17B5C',
    headline: 'なんとかなると思いながらも、ふと気になることがあるあなたへ',
    desc: '日々の生活を楽しむことが上手で、細かいことに振り回されない大らかさを持っています。ただ、具体的な老後資金の計算や家計の仕組みを一度もきちんと考えたことがないかもしれません。「なんとかなる」を「大丈夫の根拠がある」に変える機会かもしれません。',
    advice: '一度だけ、ライフプランのシミュレーションをしてみませんか？根拠のある安心感は、これからの人生をもっと楽しくしてくれます。',
    cta: 'ライフプランを一緒に描いてみませんか？',
  },
  C: {
    type: 'バランス重視の安定タイプ',
    emoji: '🌿',
    color: '#7A9E7E',
    headline: '安定を大切にしながら、次のステップを探しているあなたへ',
    desc: '家計管理の意識が高く、バランス良く物事を進めようとする安定感のある方です。仕組みを作ることが得意で、少しずつ着実に進んでいます。今後は「効率をさらに上げる方法」や「これまでの経験を活かした次のステップ」を考える段階かもしれません。',
    advice: '家計の仕組みをさらに洗練させ、将来のキャリアとお金を統合的に考えることで、もう一段階上の安心感が手に入ります。',
    cta: '次のステージへ、一緒に進みましょう',
  },
  D: {
    type: '成長志向チャレンジタイプ',
    emoji: '🚀',
    color: '#C17B5C',
    headline: 'キャリアとお金を連動させて、新しいステージに進みたいあなたへ',
    desc: '現状に満足せず、常に成長を求める行動力のある方です。副業・転職・起業など、新しいキャリアへの挑戦も視野に入っているかもしれません。エネルギーと意欲はある。あとは「お金の安全網」を確認しながら、最短ルートで動くためのプランが必要な段階です。',
    advice: '行動力は最大の武器。あとは「リスクを取りすぎないための家計設計」と「キャリアの方向性の明確化」を組み合わせれば、もっと速く、安全に前に進めます。',
    cta: '一緒にアクションプランを作りませんか？',
  },
};

function calcResult(answers: string[]): string {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [resultKey, setResultKey] = useState('');
  const [animating, setAnimating] = useState(false);

  // URL パラメータで直接結果表示
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const r = params.get('result');
    if (r && RESULTS[r]) {
      setResultKey(r);
      setDone(true);
    }
  }, []);

  const handleSelect = (score: string) => {
    if (animating) return;
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (current + 1 >= QUESTIONS.length) {
      const key = calcResult(newAnswers);
      setResultKey(key);
      setDone(true);
      // URLを更新
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `?result=${key}`);
      }
    } else {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => c + 1);
        setAnimating(false);
      }, 200);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setAnswers([]);
    setDone(false);
    setResultKey('');
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const progress = done ? 100 : (current / QUESTIONS.length) * 100;
  const result = RESULTS[resultKey];

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Money Type Quiz</p>
        <h1 className="page-hero__title">あなたのお金タイプ診断</h1>
        <p className="page-hero__desc">10問に答えるだけ。あなたの家計パターンがわかります。</p>
      </div>

      <div className="quiz-wrapper">
        {/* プログレスバー */}
        <div className="quiz-progress">
          <div className="quiz-progress__bar-bg">
            <div className="quiz-progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="quiz-progress__text">
            {done ? '診断完了！' : `${current + 1} / ${QUESTIONS.length} 問`}
          </p>
        </div>

        {!done ? (
          /* 問題カード */
          <FadeIn key={current}>
            <div className="quiz-question-card" style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.2s' }}>
              <p className="quiz-question__num">Question {current + 1}</p>
              <p className="quiz-question__text">{QUESTIONS[current].q}</p>
              <div className="quiz-options">
                {QUESTIONS[current].options.map((opt, i) => (
                  <button
                    key={i}
                    className="quiz-option"
                    onClick={() => handleSelect(opt.score)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        ) : result ? (
          /* 結果カード */
          <FadeIn>
            <div className="quiz-result">
              <span className="quiz-result__emoji">{result.emoji}</span>
              <p className="quiz-result__label">あなたのタイプ</p>
              <h2 className="quiz-result__type" style={{ color: result.color }}>
                {result.type}
              </h2>
              <p className="quiz-result__headline">{result.headline}</p>
              <p className="quiz-result__desc">{result.desc}</p>
              <div className="quiz-result__advice-box">
                <p><strong>アドバイス：</strong>{result.advice}</p>
              </div>
              <div className="quiz-result__actions">
                <Link href="/contact" className="btn btn-primary btn--lg">
                  {result.cta}
                </Link>
                <Link href="/services" className="btn btn-outline">
                  サービス一覧を見る
                </Link>
                <button className="quiz-retry-btn" onClick={handleRetry}>
                  もう一度診断する
                </button>
              </div>
            </div>
          </FadeIn>
        ) : null}
      </div>
    </>
  );
}
