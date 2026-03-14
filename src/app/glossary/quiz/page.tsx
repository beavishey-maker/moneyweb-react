'use client';
import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { TERMS } from '@/data/glossary';

const TOTAL = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Question {
  term: string;
  correctDesc: string;
  choices: string[]; // 4 desc choices
  correctIndex: number;
}

function buildQuestions(): Question[] {
  const picked = shuffle(TERMS).slice(0, TOTAL);
  return picked.map(t => {
    // 同カテゴリを優先して不正解選択肢を作る（紛らわしくする）
    const sameCat = shuffle(TERMS.filter(x => x.term !== t.term && x.cat === t.cat));
    const diffCat = shuffle(TERMS.filter(x => x.term !== t.term && x.cat !== t.cat));
    const wrongPool = [...sameCat, ...diffCat];
    const wrong = wrongPool.slice(0, 3).map(x => x.desc);
    const all = shuffle([t.desc, ...wrong]);
    return {
      term: t.term,
      correctDesc: t.desc,
      choices: all,
      correctIndex: all.indexOf(t.desc),
    };
  });
}

type Phase = 'start' | 'playing' | 'result';

export default function GlossaryQuizPage() {
  const [phase, setPhase] = useState<Phase>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const score = useMemo(() => answers.filter(Boolean).length, [answers]);

  const start = useCallback(() => {
    setQuestions(buildQuestions());
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowAnswer(false);
    setPhase('playing');
  }, []);

  const choose = useCallback((idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    const correct = idx === questions[current].correctIndex;
    setAnswers(prev => [...prev, correct]);
  }, [showAnswer, questions, current]);

  const next = useCallback(() => {
    if (current + 1 >= TOTAL) {
      setPhase('result');
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  }, [current]);

  const q = phase === 'playing' ? questions[current] : null;
  const progress = phase === 'playing' ? ((current) / TOTAL) * 100 : 0;

  /* ── START ── */
  if (phase === 'start') return (
    <>
      <div className="page-hero">
        <p className="page-hero__eyebrow">Quiz</p>
        <h1 className="page-hero__title">FP用語クイズ</h1>
        <p className="page-hero__desc">お金の用語、どれだけ知ってる？10問チャレンジ！</p>
      </div>
      <section className="section section--white">
        <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div className="quiz-start-card">
            <p className="quiz-start-card__icon">🎯</p>
            <h2 className="quiz-start-card__title">ルール</h2>
            <ul className="quiz-start-card__list">
              <li>全87語からランダムに10問出題されます</li>
              <li>用語名を見て、正しい説明を4択から選んでください</li>
              <li>合格ライン：7問以上正解！</li>
            </ul>
            <button className="btn btn--primary btn--lg" style={{ marginTop: '2rem' }} onClick={start}>
              スタート！
            </button>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/glossary" style={{ fontSize: '0.875rem', color: 'var(--col-muted)' }}>
                ← 用語集に戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  /* ── RESULT ── */
  if (phase === 'result') {
    const pct = Math.round((score / TOTAL) * 100);
    const msg =
      score >= 9 ? '完璧です！FP知識マスター🏆' :
      score >= 7 ? '合格！しっかり理解できています✨' :
      score >= 5 ? 'もう少し！用語集で復習してみましょう📖' :
      '用語集を読んで再チャレンジ！💪';
    return (
      <>
        <div className="page-hero">
          <p className="page-hero__eyebrow">Quiz Result</p>
          <h1 className="page-hero__title">結果発表</h1>
        </div>
        <section className="section section--white">
          <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
            <div className="quiz-result-card">
              <p className="quiz-result-card__score">{score}<span>/{TOTAL}</span></p>
              <p className="quiz-result-card__pct">{pct}%</p>
              <p className="quiz-result-card__msg">{msg}</p>
              <div className="quiz-result-card__btns">
                <button className="btn btn--primary btn--lg" onClick={start}>もう一度挑戦</button>
                <Link href="/glossary" className="btn btn--outline btn--lg">用語集で復習</Link>
              </div>
            </div>

            {/* 回答振り返り */}
            <div className="quiz-review">
              <h3 className="quiz-review__title">振り返り</h3>
              {questions.map((q, i) => (
                <div key={i} className={`quiz-review__item quiz-review__item--${answers[i] ? 'correct' : 'wrong'}`}>
                  <div className="quiz-review__header">
                    <span className="quiz-review__badge">{answers[i] ? '○' : '✕'}</span>
                    <span className="quiz-review__term">Q{i + 1}. {q.term}</span>
                  </div>
                  <p className="quiz-review__desc">{q.correctDesc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ── PLAYING ── */
  return (
    <>
      <div className="page-hero">
        <p className="page-hero__eyebrow">Quiz {current + 1}/{TOTAL}</p>
        <h1 className="page-hero__title">FP用語クイズ</h1>
      </div>
      <section className="section section--white">
        <div className="container" style={{ maxWidth: 640 }}>

          {/* Progress bar */}
          <div className="quiz-progress-bar">
            <div className="quiz-progress-bar__fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="quiz-card">
            <p className="quiz-card__label">この用語の説明はどれ？</p>
            <h2 className="quiz-card__term">{q!.term}</h2>

            <div className="quiz-choices">
              {q!.choices.map((choice, i) => {
                let state = '';
                if (showAnswer) {
                  if (i === q!.correctIndex) state = ' correct';
                  else if (i === selected) state = ' wrong';
                }
                return (
                  <button
                    key={i}
                    className={`quiz-choice${state}`}
                    onClick={() => choose(i)}
                    disabled={showAnswer}
                  >
                    <span className="quiz-choice__label">{['A', 'B', 'C', 'D'][i]}</span>
                    <span className="quiz-choice__text">{choice}</span>
                  </button>
                );
              })}
            </div>

            {showAnswer && (
              <div className="quiz-feedback">
                <p className={`quiz-feedback__result quiz-feedback__result--${selected === q!.correctIndex ? 'correct' : 'wrong'}`}>
                  {selected === q!.correctIndex ? '正解！🎉' : '不正解💦'}
                </p>
                <button className="btn btn--primary" onClick={next} style={{ marginTop: '1rem' }}>
                  {current + 1 >= TOTAL ? '結果を見る' : '次の問題へ →'}
                </button>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/glossary" style={{ fontSize: '0.875rem', color: 'var(--col-muted)' }}>
              ← 用語集に戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
