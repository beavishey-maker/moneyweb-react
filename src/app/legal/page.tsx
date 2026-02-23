import FadeIn from '@/components/ui/FadeIn';

const LEGAL_ITEMS = [
  { label: '販売業者', value: '渡辺加奈子（money web）' },
  { label: '代表者', value: '渡辺 加奈子' },
  { label: '所在地', value: '（個別にお知らせします）' },
  { label: '電話番号', value: '（個別にお知らせします）' },
  { label: 'メールアドレス', value: 'info@kanako-moneyadvisor.com' },
  { label: 'ウェブサイトURL', value: '（当サイトURL）' },
  { label: '販売価格', value: '各サービスページまたはお問い合わせ時にご案内します。表示価格はすべて税込です。' },
  { label: '商品代金以外の必要料金', value: 'オンライン相談にはZoomのご利用環境が必要です（無料でご利用いただけます）。' },
  { label: '支払い方法', value: '銀行振込（詳細はお問い合わせ時にご案内します）' },
  { label: '支払い時期', value: 'サービス開始前にお支払いいただきます。' },
  { label: 'サービス提供時期', value: 'お申し込み後、日程調整の上でサービスを提供します。' },
  { label: '返品・キャンセルについて', value: 'サービス提供前であれば全額返金いたします。サービス提供開始後のキャンセルはご対応できません。初回無料相談のキャンセルは前日までにご連絡ください。' },
  { label: '動作環境（オンライン相談）', value: 'Zoomが利用できるPC・スマートフォン・タブレット。インターネット接続環境が必要です。' },
];

export default function LegalPage() {
  return (
    <>
      <div className="page-hero">
        <p className="page-hero__eyebrow">Legal</p>
        <h1 className="page-hero__title">特定商取引法に基づく表記</h1>
        <p className="page-hero__desc">money web サービスに関する法定表示事項</p>
      </div>

      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <div style={{ maxWidth: 800, margin: '0 auto', overflowX: 'auto' }}>
              <table className="legal-table">
                <tbody>
                  {LEGAL_ITEMS.map((item, i) => (
                    <tr key={i}>
                      <th>{item.label}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
