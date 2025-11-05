/**
 * Serverless endpoint for Google Gemini (gemini-1.5-flash-latest)
 * - Vercel serverless function
 * - Requires GOOGLE_API_KEY in environment
 * - Forces responses in Portuguese regardless of input language
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { question } = req.body || {};
  if (!question) return res.status(400).json({ error: 'Missing question' });
  const key = process.env.GOOGLE_API_KEY;
  if (!key) return res.status(500).json({ error: 'GOOGLE_API_KEY not configured' });

  try {
    // Build prompt/instruction to force Portuguese output
    const prompt = `Responde em Português. Usuário pergunta: "${question}". Dá uma resposta clara, concisa e útil.`;

    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + key, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: {
          text: prompt
        },
        temperature: 0.2,
        maxOutputTokens: 512
      })
    });

    const data = await resp.json();
    // Gemini responses differ; attempt common fields
    const reply = data?.candidates?.[0]?.content || data?.output?.[0]?.content || JSON.stringify(data);
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
