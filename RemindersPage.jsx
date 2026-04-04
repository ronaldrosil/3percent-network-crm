import { useState, useRef } from 'react'
import { askStrategicQuestion } from '../lib/ai'
import { speakText, stopSpeaking, startVoiceInput } from '../lib/utils'

const QUICK_PROMPTS = [
  "Qui sont mes 3 prospects prioritaires cette semaine ?",
  "Donne-moi un message WhatsApp pour réactiver un prospect froid",
  "Comment détecter un prospect prêt à rejoindre l'équipe ?",
  "Quelle stratégie de relance après une présentation sans réponse ?",
  "Comment présenter Zinzino à quelqu'un qui ne connaît pas le MLM ?",
  "Donne-moi une accroche pour inviter sans parler du business",
  "Comment gérer l'objection 'c'est une arnaque' ?",
  "Quelle routine journalière pour développer mon réseau ?",
]

export default function AIPage({ contacts }) {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [listening, setListening] = useState(false)
  const [history, setHistory] = useState([])
  const recRef = useRef(null)

  const ask = async (q) => {
    if (!q.trim() || loading) return
    setLoading(true)
    setResponse('')
    const res = await askStrategicQuestion(q, contacts)
    setResponse(res)
    setHistory(h => [{ q, a: res, ts: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }, ...h].slice(0, 10))
    setLoading(false)
  }

  const handleSpeak = () => {
    if (speaking) { stopSpeaking(); setSpeaking(false); return }
    if (!response) return
    speakText(response, () => setSpeaking(false))
    setSpeaking(true)
  }

  const handleVoice = () => {
    recRef.current = startVoiceInput(
      (text) => { setQuery(text); ask(text); setListening(false) },
      () => setListening(false)
    )
    if (recRef.current) setListening(true)
  }

  return (
    <div className="page">
      <div className="page-section">
        <div className="section-title">🧠 Assistant IA — Expert marketing relationnel</div>

        <div className="ai-panel" style={{ marginBottom: 24 }}>
          <div className="ai-header">
            <span className="ai-icon">🧠</span>
            <div>
              <div className="ai-title">Stratège Zinzino — Neurosciences & PNL</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Analyse votre réseau · Suggère des messages · Détecte les opportunités</div>
            </div>
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div className="search-bar" style={{ flex: 1 }}>
              <input
                placeholder="Posez votre question stratégique..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && ask(query)}
              />
            </div>
            <button
              className={`voice-btn ${listening ? 'active' : ''}`}
              onClick={handleVoice}
              title="Dicter votre question"
            >🎤</button>
            <button className="btn btn-gold" onClick={() => ask(query)} disabled={loading || !query.trim()}>
              {loading ? <span className="spinner" /> : 'Analyser →'}
            </button>
          </div>

          {/* Quick prompts */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Suggestions rapides</div>
            <div className="chip-row">
              {QUICK_PROMPTS.map((p, i) => (
                <div key={i} className="chip" onClick={() => { setQuery(p); ask(p) }}>
                  {p.length > 40 ? p.slice(0, 40) + '…' : p}
                </div>
              ))}
            </div>
          </div>

          {/* Response */}
          {loading
            ? <div className="ai-response loading"><span className="pulse">⚡ Analyse de votre réseau en cours...</span></div>
            : response
              ? <>
                  <div className="ai-response">{response}</div>
                  <div className="ai-actions">
                    <button className="btn btn-ghost btn-sm" onClick={handleSpeak}>{speaking ? '⏹ Stop audio' : '🔊 Écouter'}</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(response).then(() => {})}>📋 Copier</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setResponse(''); setQuery('') }}>🗑 Effacer</button>
                  </div>
                </>
              : <div className="ai-response loading">
                  Votre assistant IA est prêt. Posez une question ou choisissez une suggestion ci-dessus.
                </div>
          }
        </div>

        {/* History */}
        {history.length > 0 && (
          <>
            <div className="section-title">🕐 Historique des analyses</div>
            {history.map((h, i) => (
              <div key={i} className="card" style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>❓ {h.q}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{h.ts}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {h.a.slice(0, 200)}{h.a.length > 200 ? '…' : ''}
                </div>
                <button className="btn btn-ghost btn-xs" style={{ marginTop: 8 }} onClick={() => setResponse(h.a)}>
                  Voir complet
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
