import FadeIn from '@/components/ui/FadeIn';

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero">
        <p className="page-hero__eyebrow">Legal</p>
        <h1 className="page-hero__title">プライバシーポリシー</h1>
        <p className="page-hero__desc">個人情報の取り扱いについて</p>
      </div>

      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <div className="prose-section" style={{ maxWidth: 740, margin: '0 auto' }}>
              <h2>個人情報の収集について</h2>
              <p>当サービスでは、お問い合わせフォームを通じてお名前・メールアドレス・ご相談内容等の個人情報をお預かりする場合があります。</p>

              <h2>利用目的</h2>
              <ul>
                <li>ご相談・お問い合わせへの対応</li>
                <li>サービスに関する情報のご提供</li>
                <li>セミナー・イベントのご案内（ご同意をいただいた場合）</li>
              </ul>

              <h2>第三者への提供</h2>
              <p>法令に基づく場合を除き、お客様の個人情報を第三者に提供することはありません。</p>

              <h2>個人情報の管理</h2>
              <p>お預かりした個人情報は適切に管理し、漏洩・不正アクセスの防止に努めます。</p>

              <h2>Cookieの使用について</h2>
              <p>当サイトでは、サービス改善のためCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることが可能です。</p>

              <h2>アクセス解析ツール</h2>
              <p>当サイトでは、Google Analyticsを使用してアクセス状況を分析する場合があります。このツールはCookieを使用してデータを収集しますが、個人を特定する情報は含みません。</p>

              <h2>個人情報の開示・訂正・削除</h2>
              <p>ご自身の個人情報について、開示・訂正・削除を希望される場合は、お問い合わせフォームよりご連絡ください。</p>

              <h2>プライバシーポリシーの変更</h2>
              <p>本ポリシーは、必要に応じて変更する場合があります。変更後のポリシーは本ページに掲載します。</p>

              <h2>お問い合わせ先</h2>
              <p>プライバシーポリシーに関するお問い合わせは、<a href="/contact" style={{ color: 'var(--col-gold)' }}>お問い合わせフォーム</a>よりご連絡ください。</p>

              <p style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.5 }}>制定日：2024年1月1日</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
