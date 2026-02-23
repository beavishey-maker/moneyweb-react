'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

const QUESTIONS = [
  {
    q: '月末に通帳を見たとき、正直どう感じますか？',
    options: [
      { text: '思ったより減っていて、ため息が出る', score: 'A' },
      { text: '毎月ほぼ同じ残高で、まあこんなもの', score: 'B' },
      { text: '目標額に少し届かなくて悔しい', score: 'C' },
      { text: '投資の評価額と合わせて確認する', score: 'D' },
    ],
  },
  {
    q: '「老後2000万円問題」のニュースを見たとき、最初に思ったことは？',
    options: [
      { text: 'やっぱり…と不安が確信に変わった', score: 'A' },
      { text: 'そのうち何とかなるかな、と先延ばしにした', score: 'B' },
      { text: '今の貯蓄ペースで足りるか計算した', score: 'C' },
      { text: '投資でカバーできるな、と前向きに考えた', score: 'D' },
    ],
  },
  {
    q: '「家計簿」と聞いて、一番近いのは？',
    options: [
      { text: '始めても3日で挫折してしまう', score: 'B' },
      { text: '細かく付けているが、改善につながっていない', score: 'A' },
      { text: 'アプリで自動連携して管理している', score: 'C' },
      { text: '家計簿より資産全体を把握している', score: 'D' },
    ],
  },
  {
    q: '今の働き方について、率直に言うと？',
    options: [
      { text: '扶養内か外れるか、ずっと迷っている', score: 'A' },
      { text: '特に深く考えていない。今のままでいいかな', score: 'B' },
      { text: '収入を増やしたいが、どうすればいいか考え中', score: 'C' },
      { text: 'スキルアップや副業で収入を伸ばしたい', score: 'D' },
    ],
  },
  {
    q: 'ポイ活や節約情報に対して、正直なところは？',
    options: [
      { text: 'やりすぎて疲れてしまっている', score: 'A' },
      { text: '気になるけど、なかなか行動できない', score: 'B' },
      { text: '効果的なものを選んで取り入れている', score: 'C' },
      { text: 'それより収入を上げる方が効率的と思う', score: 'D' },
    ],
  },
  {
    q: '家族との食事・旅行などお金を使うとき、感じることは？',
    options: [
      { text: '楽しいけど、後で罪悪感を感じてしまう', score: 'A' },
      { text: 'あまり深く考えずに使ってしまう', score: 'B' },
      { text: '予算を決めて、その範囲で楽しむようにしている', score: 'C' },
      { text: '体験に投資することは大切だと考えている', score: 'D' },
    ],
  },
  {
    q: '「教育費」について、どう向き合っていますか？',
    options: [
      { text: '老後資金との両立が不安でしょうがない', score: 'A' },
      { text: 'まだ先のことで、あまり考えられていない', score: 'B' },
      { text: 'いつ・いくら必要か、だいたい把握している', score: 'C' },
      { text: 'NISAやJr.NISAで着々と準備している', score: 'D' },
    ],
  },
  {
    q: '自分の「強み」や「得意なこと」について、どう思う？',
    options: [
      { text: '「私なんて特別な強みがない」と感じている', score: 'A' },
      { text: 'よくわからない。あまり考えたことがない', score: 'B' },
      { text: 'なんとなくはあるが、言語化できていない', score: 'C' },
      { text: 'はっきり自覚していて、活かし方も考えている', score: 'D' },
    ],
  },
  {
    q: '5年後の自分について、イメージしてみると？',
    options: [
      { text: '漠然とした不安があり、あまり考えたくない', score: 'A' },
      { text: 'あまりイメージできない。なんとなく今の続きかな', score: 'B' },
      { text: 'こうなりたいというビジョンはある', score: 'C' },
      { text: 'キャリアと資産の具体的な目標がある', score: 'D' },
    ],
  },
  {
    q: 'FPやキャリアコンサルタントへの相談について、正直なところは？',
    options: [
      { text: '怒られそうで怖い。恥ずかしい気もする', score: 'A' },
      { text: '興味はあるけど、一歩が踏み出せない', score: 'B' },
      { text: '費用対効果があれば積極的に利用したい', score: 'C' },
      { text: '既に活用したことがある、または積極的に考えている', score: 'D' },
    ],
  },
];

const RESULTS: Record<string, { type: string; emoji: string; color: string; desc: string; advice: string; cta: string }> = {
  A: {
    type: '心配性な管理タイプ',
    emoji: '🌙',
    color: '#B8975A',
    desc: '老後不安が強く、節約情報に疲れているタイプです。あなたの不安は真剣にお金と向き合っている証拠。ただ、「正しい仕組み」を知らないまま頑張り続けているのかもしれません。',
    advice: 'まず「自分の家計の現状」を数字で見える化することから始めましょう。漠然とした不安は、具体的な数字にすることで必ず小さくなります。FPへの相談が、最大の近道かもしれません。',
    cta: '無料相談で現状を整理する',
  },
  B: {
    type: '直感的おおらかタイプ',
    emoji: '🌸',
    color: '#9D7E46',
    desc: 'お金のことが後回しになりがちなタイプです。「なんとかなる」と思えるおおらかさは長所ですが、気づいたときには取り返しがつかない…ということにならないよう、少しずつ整えていきましょう。',
    advice: '完璧な家計管理より、「まず1つだけ」始めることが大切。口座の自動振替設定や、固定費の見直しから小さく始めてみましょう。一緒に整理すれば、きっと続けられます。',
    cta: '一緒に小さな一歩を踏み出す',
  },
  C: {
    type: 'バランス重視の安定タイプ',
    emoji: '⚖️',
    color: '#B8975A',
    desc: '安定志向で、しっかり考えているタイプです。現状把握はできているものの、「次の一手」に迷っているのかもしれません。あとは「仕組み化」できれば、さらに安心できます。',
    advice: '今の管理を「自動化・仕組み化」することで、考える負担をなくしましょう。NISAやiDeCoの活用、保険の見直しなど、次のステップへ進む準備が整っています。',
    cta: '次のステップを一緒に考える',
  },
  D: {
    type: '成長志向チャレンジタイプ',
    emoji: '🚀',
    color: '#111111',
    desc: 'キャリアアップとお金を連動させたい、前向きなタイプです。行動力があり、目標も明確。あとは「戦略的な設計」ができれば、理想の未来が加速します。',
    advice: 'キャリアと資産形成を同時に最適化する戦略を立てましょう。副業・転職・投資の組み合わせ方、税金・社会保険の知識なども活用すると、さらに加速できます。',
    cta: '戦略的な設計を一緒に考える',
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
