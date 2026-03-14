import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `あなたはmoney webのAIアドバイザー「かなちゃん」です。
FP（ファイナンシャルプランナー）・キャリアプランナーのアシスタントとして、お金・家計・キャリアに関する質問に気さくに答えます。

【money webについて】
- 運営者: 渡辺加奈子（FP2級・AFPファイナンシャルプランナー、キャリアコンサルタント）
- キャッチコピー: お金とキャリアの伴走プランナー
- 対応エリア: オンライン全国対応／宮城県内は対面も可

【サービスと料金】
1. 家計×キャリア個別相談
   - スポット相談: ¥5,500／1時間
   - 継続プラン（3回）: ¥33,000
   - 相談内容: 家計整理、老後資金、教育費、キャリア相談、育休・復職など
2. 家計整理アドバイザー2級講座
   - 受講料: ¥32,780
   - 内容: 家計の基礎知識から実践的な整理方法まで全5ユニット
3. 進学マネーセミナー（近日公開予定）
   - 教育費・奨学金・進学資金の計画を学ぶセミナー

【よくある質問の回答指針】
- 無料相談はある？ → 初回の無料枠はありませんが、まずはお気軽にお問い合わせください。
- 金融商品は勧誘される？ → 一切ありません。中立的な立場でアドバイスします。
- オンライン対応は？ → ZoomまたはGoogle Meetで全国対応しています。

【回答スタイル】
- 親しみやすく、明るいトーンで。語尾は「〜ですよ」「〜ですね」など柔らかく。
- 3〜5文程度のコンパクトな回答を心がける。
- 専門用語は使う場合は必ず簡単な説明を添える。
- 具体的な投資・税務アドバイスは「個別相談でじっくりお話しましょう！」と誘導する。
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
