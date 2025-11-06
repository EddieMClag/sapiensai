import React, { useState } from 'react'
import logo from '/logo.png'
import { IAProvider, useIA } from './IAContext.jsx'

function Header(){ const { model, setModel } = useIA(); return (
  <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00ffb3] to-[#00e5ff] p-2 shadow-lg">
        <img src={logo} alt="Sapiens.AI" className="w-full h-full object-contain" />
      </div>
      <div>
        <div className="text-2xl font-semibold">Sapiens.AI</div>
        <div className="text-xs text-slate-300">Conhecimento inteligente para todos</div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <nav className="hidden md:flex gap-6 text-slate-200">
        <a href="#recipes" className="hover:text-white">Receitas</a>
        <a href="#study" className="hover:text-white">Estudo</a>
        <a href="#tools" className="hover:text-white">Ferramentas IA</a>
        <a href="#contact" className="hover:text-white">Contacto</a>
      </nav>
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-300">Modelo IA</label>
        <select value={model} onChange={(e)=>setModel(e.target.value)} className="p-2 rounded bg-[#02101a] border border-slate-700">
          <option value="openai">OpenAI (ChatGPT)</option>
          <option value="gemini">Google Gemini</option>
        </select>
      </div>
    </div>
  </header>
) }

function StudyCard(){ const { model } = useIA(); const [question, setQuestion] = useState(''); const [answer, setAnswer] = useState(''); const [loading, setLoading] = useState(false); const DEMO = true;
  async function ask(e){ e && e.preventDefault(); if(!question) return; setLoading(true); setAnswer('A processar...'); try{
    if(DEMO){ await new Promise(r=>setTimeout(r,700)); const simulated = model === 'gemini' ? 'Explicação simulada (Gemini, PT): A fotossíntese é o processo pelo qual as plantas convertem luz em energia...' : 'Explicação simulada (OpenAI, PT): A fotossíntese transforma luz em energia química nas plantas...'; setAnswer(simulated);
    } else { const res = await fetch(model === 'openai' ? '/api/askOpenAI_improved' : '/api/askGemini', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ question }) }); const data = await res.json(); setAnswer(data.reply || JSON.stringify(data)); }
  }catch(err){ setAnswer('Erro: '+err.message) } finally { setLoading(false) } }
  return (
    <div className="p-4 rounded-xl bg-[#071021]/60 border border-slate-800">
      <form onSubmit={ask}>
        <label className="text-sm text-slate-300">Pergunta à IA (ex.: Explica-me a fotossíntese em 3 frases)</label>
        <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} className="w-full mt-2 p-3 rounded bg-transparent border border-slate-700 h-32" placeholder="Escreve a tua dúvida..." />
        <div className="flex gap-2 mt-3">
          <button type="submit" className={`px-4 py-2 rounded font-semibold ${model==='gemini'? 'bg-gradient-to-r from-[#8b5cf6] to-[#5b2aff] text-white' : 'bg-gradient-to-r from-[#00ffb3] to-[#00e5ff] text-black'}`}>
            {loading ? 'A processar...' : `Perguntar à ${model==='gemini' ? 'Gemini' : 'OpenAI'}`}
          </button>
        </div>
      </form>
      <div className="mt-4 p-3 rounded bg-[#031226]/50 border border-slate-800 min-h-[120px]">
        <div className="text-xs text-slate-400">Resposta</div>
        <pre className="whitespace-pre-wrap mt-2 text-slate-200">{answer ? (model==='gemini'? '💡 Resposta da Gemini: ' : '💡 Resposta da OpenAI: ') + answer : 'Aqui aparecerá a resposta da IA.'}</pre>
      </div>
    </div>
  ) }

export default function App(){ return (
  <IAProvider>
    <div className="min-h-screen font-open-sans bg-gradient-to-br from-[#071029] via-[#0b1b3a] to-[#19143b] text-white">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <style>{".font-open-sans{font-family:'Open Sans',sans-serif}"}</style>
      <Header />
      <main className="max-w-6xl mx-auto px-6">
        <section className="grid md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">Sapiens.AI</h1>
            <p className="mt-4 text-lg text-slate-300">Tecnologia. Curiosidade. Você.</p>
            <p className="mt-6 text-slate-200 max-w-xl">Do estudo à prática com IA — receitas, dicas de estudo, sugestões de estilo e identificação de pedras com tecnologia e sentido humano.</p>
            <div className="mt-8 flex gap-3">
              <a href="#recipes" className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#0066cc] to-[#5b2aff] shadow-md">Ver Receitas</a>
              <a href="#study" className="px-5 py-3 rounded-lg border border-slate-600">Como estudar</a>
            </div>
            <div className="mt-6 text-sm text-slate-400">Dominio sugerido: <span className="text-green-300">sapiensai.pt</span></div>
          </div>
          <div className="relative">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#081224]/60 to-[#0a122e]/40 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center bg-[#001b2b]/60 border border-[#00ffb3]/30">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8 2 4 4 4 8c0 3 2 4 4 6 1 1 2 2 4 2s3-1 4-2c2-2 4-3 4-6 0-4-4-6-8-6z" />
                  </svg>
                </div>
