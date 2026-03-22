import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function esc(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label: string, value: string) {
  return `
    <tr>
      <th style="text-align:left;padding:10px 12px;background:#f5f5f3;border:1px solid #e0e0e0;width:30%;white-space:nowrap;">${esc(label)}</th>
      <td style="padding:10px 12px;border:1px solid #e0e0e0;white-space:pre-wrap;">${value}</td>
    </tr>`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'サーバー設定エラー' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const body = await req.json();
  const { name, furigana, email, phone } = body;

  let subjectLabel = 'お問い合わせ';
  let bodyRows = '';

  if (body.service && Array.isArray(body.fields)) {
    // サービス別申し込みフォーム
    subjectLabel = body.service;
    bodyRows += row('サービス', esc(body.service));
    for (const f of body.fields as { label: string; value: string }[]) {
      bodyRows += row(f.label, esc(f.value) || 'なし');
    }
  } else {
    // 汎用お問い合わせフォーム
    const topicList = Array.isArray(body.topic)
      ? body.topic.join('、')
      : body.topic || 'なし';
    bodyRows += row('お問い合わせ内容', esc(topicList));
    bodyRows += row('相談方法', esc(body.contactMethod) || 'なし');
    bodyRows += row('相談内容', esc(body.message) || 'なし');
    bodyRows += row('希望日程', esc(body.preferredDates) || 'なし');
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
      <h2 style="border-bottom:2px solid #B8975A;padding-bottom:8px;color:#B8975A;">
        💌 money web — ${esc(subjectLabel)}
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        ${row('お名前', `${esc(name)}（${esc(furigana)}）`)}
        ${row('メール', `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
        ${row('電話番号', esc(phone) || 'なし')}
        ${bodyRows}
      </table>
      <p style="margin-top:24px;font-size:12px;color:#999;">
        このメールは money web のフォームから自動送信されました。
      </p>
    </div>
  `;

  const { error: sendError } = await resend.emails.send({
    from: 'money web <onboarding@resend.dev>',
    to: 'beavis.hey@gmail.com',
    replyTo: email,
    subject: `【${subjectLabel}】${name} 様より`,
    html,
  });

  if (sendError) {
    console.error('Mail error:', sendError);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
