/**
 * Serverless example: /api/askOpenAI
 * - Expects POST { question: string }
 * - Uses OPENAI_API_KEY environment variable
 * - This is a minimal example using fetch to call OpenAI's Chat Completions (REST).
 * - In production, use official SDK and handle errors, rate limits and streaming as needed.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'})
  const { question } = req.body || {}
  if (!question) return res.status(400).json({error:'Missing question'})

  const key = process.env.OPENAI_API_KEY
  if (!key) return res.status(500).json({error:'OPENAI_API_KEY not configured'})

  try{
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{role:'user', content: question}],
        max_tokens: 500
      })
    })
    const data = await resp.json()
    // Attempt to extract text
    const reply = data?.choices?.[0]?.message?.content || JSON.stringify(data)
    return res.status(200).json({reply})
  }catch(err){
    return res.status(500).json({error: err.message})
  }
}
