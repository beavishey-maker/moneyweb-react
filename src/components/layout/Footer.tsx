import Link from 'next/link';
import { Coins } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#3D2B1F',
        color: '#FDFAF5',
        padding: '3rem 2rem 2rem',
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Coins style={{ width: '1.2rem', height: '1.2rem', color: '#C17B5C' }} />
          <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.1rem', fontWeight: 500 }}>
            money <span style={{ color: '#C17B5C' }}>web</span>
          </span>
        </div>
        <p style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '0.06em' }}>
          © 2024 money web / 渡辺加奈子 — お金とキャリアの伴走プランナー
        </p>
      </div>
    </footer>
  );
}
