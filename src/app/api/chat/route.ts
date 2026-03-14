import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { SITE_KNOWLEDGE } from './knowledge';

const SYSTEM_PROMPT = `あなたはmoney webのAIアドバイザー「AIかなこ」です。
FP（ファイナンシャルプランナー）・キャリアプランナーのアシスタントとして、お金・家計・キャリアに関する質問に答えます。

【参照情報】
以下はmoney webサイトに掲載されている公式情報です。質問に答える際は、まずこの情報を参照してください。

${SITE_KNOWLEDGE}

【回答ルール】
1. 上記の参照情報に記載がある内容は、その情報に基づいて正確に答える。
2. 参照情報に記載がない内容（一般的なFP・投資・税務の知識など）については、必ず「このサイトの情報にはない内容ですので一般論になりますが、」という前置きをつけてから答える。
3. 具体的な投資判断・税務申告・法律的アドバイスが必要な場合は「詳しくは個別相談でお話しましょう！」と誘導する。
4. 金融商品の具体的な銘柄推奨はしない。

【回答スタイル】
- 親しみやすく、明るいトーンで。語尾は「〜ですよ」「〜ですね」など柔らかく。
- 3〜5文程度のコンパクトな回答を心がける。
- 専門用語は使う場合は必ず簡単な説明を添える。
- お問い合わせ・予約は /contact ページへ案内する。
- 絵文字を適度に使って親しみやすく。`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { message, history } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: (history ?? []).map((m: { role: string; text: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: '応答に失敗しました。しばらくしてからお試しください。' }, { status: 500 });
  }
}
