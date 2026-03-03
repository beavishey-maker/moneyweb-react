import { NextRequest, NextResponse } from 'next/server';

// HTMLエスケープ（インジェクション対策）
function esc(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, furigana, email, phone, topic, contactMethod, message, preferredDates } = body;

  const topicList = Array.isArray(topic) ? topic.join('、') : (topic || 'なし');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="border-bottom: 2px solid #B8975A; padding-bottom: 8px; color: #B8975A;">
        💌 money web — お問い合わせが届きました
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <th style="text-align: left; padding: 10px 12px; background: #f5f5f3; border: 1px solid #e0e0e0; width: 30%; white-space: nowrap;">お名前</th>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0;">${esc(name)}（${esc(furigana)}）</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 10px 12px; background: #f5f5f3; border: 1px solid #e0e0e0;">メール</th>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0;"><a href="mailto:${esc(email)}">${esc(email)}</a></td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 10px 12px; background: #f5f5f3; border: 1px solid #e0e0e0;">電話番号</th>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0;">${esc(phone) || 'なし'}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 10px 12px; background: #f5f5f3; border: 1px solid #e0e0e0;">相談テーマ</th>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0;">${esc(topicList)}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 10px 12px; background: #f5f5f3; border: 1px solid #e0e0e0;">相談方法</th>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0;">${esc(contactMethod) || 'なし'}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 10px 12px; background: #f5f5f3; border: 1px solid #e0e0e0;">相談内容</th>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0; white-space: pre-wrap;">${esc(message) || 'なし'}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 10px 12px; background: #f5f5f3; border: 1px solid #e0e0e0;">希望日程</th>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0; white-space: pre-wrap;">${esc(preferredDates) || 'なし'}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #999;">
        このメールは money web のお問い合わせフォームから自動送信されました。
      </p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'サーバー設定エラー' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'money web <onboarding@resend.dev>',
        to: ['kurosukurosu01@gmail.com'],
        reply_to: email,
        subject: `【お問い合わせ】${name} 様より`,
        html,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Resend error status:', res.status);
      console.error('Resend error body:', JSON.stringify(error));
      return NextResponse.json({ error: '送信に失敗しました', detail: error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}
