'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import { TERMS, GOJUON, GOJUON_MAP, CATS } from '@/data/glossary';

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
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <SectionHeading label="Dictionary" title="FP・家計管理用語集" desc={`全${TERMS.length}語収録`} />
              <Link href="/glossary/quiz" className="btn btn--primary btn--sm" style={{ flexShrink: 0 }}>
                🎯 用語クイズに挑戦
              </Link>
            </div>
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
