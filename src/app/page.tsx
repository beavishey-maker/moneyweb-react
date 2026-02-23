export default function HomePage() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #FDFAF5 0%, #F5EFE6 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 400,
          color: '#3D2B1F',
          lineHeight: 1.4,
          marginBottom: '1.5rem',
        }}
      >
        お金と向き合い、<br />
        <span style={{ color: '#C17B5C' }}>未来を描く</span>
      </h1>
      <p
        style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: '#3D2B1F',
          opacity: 0.7,
          maxWidth: '520px',
          lineHeight: 1.8,
          letterSpacing: '0.04em',
        }}
      >
        ファイナンシャルプランナー 渡辺加奈子が、
        お金とキャリアの両面からあなたの人生設計を伴走サポートします。
      </p>
    </section>
  );
}
