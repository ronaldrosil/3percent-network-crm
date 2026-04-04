import { useState } from 'react'
import { today } from '../lib/utils'
import { addReminder, markReminderDone } from '../lib/supabase'

export default function RemindersPage({ contacts, reminders, userId, onRefresh }) {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ contact_id: '', contact_name: '', type: 'Relance', date: today(), note: '' })
  const [saving, setSaving] = useState(false)

  const todayStr = today()
  const sorted = [...reminders].sort((a, b) => a.date.localeCompare(b.date))

  const urgency = (date) => {
    if (date < todayStr) return 'urgent'
    if (date === todayStr) return 'today'
    return 'upcoming'
  }
  const urgencyLabel = (date) => {
    if (date < todayStr) return { icon: '🚨', color: 'var(--danger)', label: 'En retard' }
    if (date === todayStr) return { icon: '⚡', color: 'var(--gold)', label: "Aujourd'hui" }
    return { icon: '📅', color: 'var(--blue)', label: 'À venir' }
  }

  const handleContactChange = (id) => {
    const c = contacts.find(x => x.id === id)
    setForm(f => ({ ...f, contact_id: id, contact_name: c ? c.name : '' }))
  }

  const handleSave = async () => {
    if (!form.contact_name || !form.date) return
    setSaving(true)
    try {
      await addReminder(userId, form)
      setShowAdd(false)
      setForm({ contact_id: '', contact_name: '', type: 'Relance', date: today(), note: '' })
      onRefresh()
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const handleDone = async (id) => {
    await markReminderDone(id)
    onRefresh()
  }

  return (
    <div className="page">
      <div className="page-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div className="section-title" style={{ margin: 0 }}>🔔 Calendrier de rappels</div>
          <button className="btn btn-gold btn-sm" onClick={() => setShowAdd(!showAdd)}>+ Ajouter</button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, marginBottom: 16, color: 'var(--gold)' }}>Nouveau rappel</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Contact</label>
                <select value={form.contact_id} onChange={e => handleContactChange(e.target.value)}>
                  <option value="">Sélectionner un contact</option>
                  {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Type d'action</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  {['Relance','Présentation','Invitation','Suivi client','Appel','Réunion Zoom','Autre'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} min={today()} />
              </div>
              <div className="form-group">
                <label>Note</label>
                <input value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Rappel rapide..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>Annuler</button>
              <button className="btn btn-gold btn-sm" onClick={handleSave} disabled={saving || !form.contact_name}>
                {saving ? 'Enregistrement...' : '✦ Sauvegarder'}
              </button>
            </div>
          </div>
        )}

        {/* Reminders list */}
        {sorted.length === 0
          ? <div className="empty"><div className="empty-icon">📅</div><div className="empty-text">Aucun rappel prévu. Planifiez votre prochaine action !</div></div>
          : sorted.map(r => {
              const { icon, color, label } = urgencyLabel(r.date)
              return (
                <div key={r.id} className={`reminder-item ${urgency(r.date)}`}>
                  <span className="reminder-emoji">{icon}</span>
                  <div className="reminder-content">
                    <div className="reminder-name">{r.contact_name}</div>
                    <div className="reminder-desc">{r.type}{r.note ? ` — ${r.note}` : ''}</div>
                  </div>
                  <div style={{ display: 'flex', flex-direction: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <div className="reminder-time" style={{ color }}>{label}</div>
                    <div className="reminder-time">{r.date}</div>
                    <button className="btn btn-xs btn-ghost" onClick={() => handleDone(r.id)} title="Marquer comme fait">✓ Fait</button>
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
  )
}
