import { useState } from 'react'
import { statusColor, heatInfo, daysSince } from '../lib/utils'
import { analyzeContact } from '../lib/ai'
import { speakText, stopSpeaking } from '../lib/utils'

export default function ContactDetailModal({ contact, onClose, onUpdate, onDelete }) {
  const [tab, setTab] = useState('profile')
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [editNotes, setEditNotes] = useState(contact.notes || '')
  const [editStatus, setEditStatus] = useState(contact.status)
  const [editHeat, setEditHeat] = useState(contact.heat)
  const [editNext, setEditNext] = useState(contact.next_action || '')
  const [speaking, setSpeaking] = useState(false)
  const [saving, setSaving] = useState(false)

  const doAnalyze = async () => {
    setAiLoading(true)
    setTab('ai')
    const res = await analyzeContact(contact)
    setAiResponse(res)
    setAiLoading(false)
  }

  const handleSpeak = () => {
    if (speaking) { stopSpeaking(); setSpeaking(false); return }
    if (!aiResponse) return
    speakText(aiResponse, () => setSpeaking(false))
    setSpeaking(true)
  }

  const handleSave = async () => {
    setSaving(true)
    await onUpdate({ ...contact, notes: editNotes, status: editStatus, heat: editHeat, next_action: editNext })
    setSaving(false)
    onClose()
  }

  const TABS = [
    { id: 'profile', label: '📋 Profil' },
    { id: 'ai', label: '🧠 Stratégie IA' },
    { id: 'edit', label: '✏️ Modifier' },
  ]

  return (
    <div className="overlay" onClick={e => e.target.className === 'overlay' && onClose()}>
      <div className="modal" style={{ maxWidth: 620 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: 'var(--obsidian)', flexShrink: 0 }}>
                {contact.name[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>{contact.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{contact.phone || 'Pas de téléphone'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className={`tag ${statusColor(contact.status)}`}>{contact.status}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>{heatInfo(contact.heat)?.label}</span>
              {contact.source && <span style={{ fontSize: 12, color: 'var(--muted)' }}>📍 {contact.source}</span>}
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="chip-row" style={{ marginBottom: 20 }}>
          {TABS.map(t => (
            <div key={t.id} className={`chip ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </div>
          ))}
        </div>

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <>
            <div className="profile-grid" style={{ marginBottom: 16 }}>
              <div className="profile-item"><div className="profile-item-label">Dernier contact</div><div className="profile-item-value">{daysSince(contact.last_contact)}</div></div>
              <div className="profile-item"><div className="profile-item-label">Prochain rappel</div><div className="profile-item-value" style={{ color: contact.next_action && contact.next_action <= new Date().toISOString().split('T')[0] ? 'var(--danger)' : 'var(--text)' }}>{contact.next_action || '—'}</div></div>
            </div>

            <div style={{ marginBottom: 16 }}>
              {[['Intérêt produit', contact.product_interest, 'linear-gradient(90deg, var(--gold-dim), var(--gold))'], ['Intérêt business', contact.business_interest, 'linear-gradient(90deg, #3a5fa0, var(--blue))']].map(([label, val, grad]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--muted)' }}>{label}</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{val}/10</span>
                  </div>
                  <div className="score-bar"><div className="score-fill" style={{ width: `${val * 10}%`, background: grad }} /></div>
                </div>
              ))}
            </div>

            {contact.objection && (
              <div style={{ background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 14 }}>
                <span style={{ color: 'var(--danger)' }}>⚠ Objection : </span>{contact.objection}
              </div>
            )}

            {contact.notes && (
              <div style={{ background: 'var(--slate)', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.6 }}>
                📝 {contact.notes}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-gold" onClick={doAnalyze}>🧠 Analyser avec l'IA</button>
              <button className="btn btn-danger btn-sm" onClick={() => { onDelete(contact.id); onClose() }}>🗑 Supprimer</button>
            </div>
          </>
        )}

        {/* AI TAB */}
        {tab === 'ai' && (
          <div className="ai-panel">
            <div className="ai-header">
              <span className="ai-icon">🧠</span>
              <span className="ai-title">Stratégie pour {contact.name}</span>
            </div>
            {aiLoading
              ? <div className="ai-response loading"><span className="pulse">⚡ Analyse en cours...</span></div>
              : aiResponse
                ? <>
                    <div className="ai-response">{aiResponse}</div>
                    <div className="ai-actions">
                      <button className="btn btn-ghost btn-sm" onClick={handleSpeak}>{speaking ? '⏹ Stop' : '🔊 Écouter'}</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(aiResponse)}>📋 Copier</button>
                      <button className="btn btn-gold btn-sm" onClick={doAnalyze}>🔄 Ré-analyser</button>
                    </div>
                  </>
                : <div className="ai-response loading">
                    Cliquez sur "Analyser avec l'IA" dans l'onglet Profil pour obtenir une stratégie personnalisée.
                    <div style={{ marginTop: 12 }}>
                      <button className="btn btn-gold btn-sm" onClick={doAnalyze}>🧠 Analyser maintenant</button>
                    </div>
                  </div>
            }
          </div>
        )}

        {/* EDIT TAB */}
        {tab === 'edit' && (
          <div>
            <div className="form-grid">
              <div className="form-group">
                <label>Statut</label>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                  <option value="partner">Partenaire</option>
                  <option value="leader">Leader</option>
                </select>
              </div>
              <div className="form-group">
                <label>Température</label>
                <select value={editHeat} onChange={e => setEditHeat(e.target.value)}>
                  <option value="hot">🔥 Chaud</option>
                  <option value="warm">🟠 Tiède</option>
                  <option value="cold">❄️ Froid</option>
                </select>
              </div>
              <div className="form-group full">
                <label>Prochain rappel</label>
                <input type="date" value={editNext} onChange={e => setEditNext(e.target.value)} />
              </div>
              <div className="form-group full">
                <label>Notes</label>
                <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} style={{ minHeight: 100 }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
              <button className="btn btn-gold" onClick={handleSave} disabled={saving}>
                {saving ? <><span className="spinner" /> Sauvegarde...</> : '💾 Sauvegarder'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
