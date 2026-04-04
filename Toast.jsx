import { statusColor, daysSince } from '../lib/utils'

export default function Dashboard({ contacts, actions, reminders, onActionChange }) {
  const stats = {
    total: contacts.length,
    prospects: contacts.filter(c => c.status === 'prospect').length,
    clients: contacts.filter(c => c.status === 'client').length,
    partners: contacts.filter(c => c.status === 'partner' || c.status === 'leader').length,
    hot: contacts.filter(c => c.heat === 'hot').length,
  }
  const totalActions = (actions.invitations || 0) + (actions.presentations || 0) + (actions.relances || 0)
  const today = new Date().toISOString().split('T')[0]
  const urgentReminders = reminders.filter(r => r.date <= today)

  const ACTION_TYPES = [
    { key: 'invitations', emoji: '📨', label: 'Invitations', color: 'var(--blue)' },
    { key: 'presentations', emoji: '🎯', label: 'Présentations', color: 'var(--success)' },
    { key: 'relances', emoji: '🔁', label: 'Relances', color: 'var(--warm)' },
  ]

  return (
    <div className="page">

      {/* KPIs */}
      <div className="page-section">
        <div className="section-title">📊 Vue d'ensemble</div>
        <div className="grid-4">
          <div className="card card-gold kpi kpi-gold">
            <div className="kpi-label">Total contacts</div>
            <div className="kpi-value">{stats.total}</div>
            <div className="kpi-sub">{stats.hot} chauds 🔥</div>
          </div>
          <div className="card kpi kpi-blue">
            <div className="kpi-label">Prospects</div>
            <div className="kpi-value">{stats.prospects}</div>
            <div className="kpi-sub">En cours de suivi</div>
          </div>
          <div className="card kpi kpi-green">
            <div className="kpi-label">Clients</div>
            <div className="kpi-value">{stats.clients}</div>
            <div className="kpi-sub">Commandes actives</div>
          </div>
          <div className="card kpi kpi-warm">
            <div className="kpi-label">Partenaires</div>
            <div className="kpi-value">{stats.partners}</div>
            <div className="kpi-sub">Réseau en croissance</div>
          </div>
        </div>
      </div>

      {/* Action counters */}
      <div className="page-section">
        <div className="section-title">⚡ Actions du jour</div>
        <div className="action-bar">
          {ACTION_TYPES.map(({ key, emoji, label, color }) => (
            <div key={key} className="action-counter">
              <div className="action-counter-value" style={{ color }}>{actions[key] || 0}</div>
              <div className="action-counter-label">{label}</div>
              <div className="action-btns">
                <span className="action-btn" onClick={() => onActionChange(key, 1)} title={`+1 ${label}`}>{emoji}</span>
                <span className="action-btn" style={{ fontSize: 18, opacity: 0.5 }} onClick={() => onActionChange(key, -1)} title="Annuler">−</span>
              </div>
            </div>
          ))}
        </div>
        {totalActions > 0 && (
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--muted)' }}>
            Total aujourd'hui : <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{totalActions} actions</span>
          </div>
        )}
      </div>

      {/* Urgent reminders */}
      {urgentReminders.length > 0 && (
        <div className="page-section">
          <div className="section-title">🚨 Rappels urgents ({urgentReminders.length})</div>
          {urgentReminders.map(r => (
            <div key={r.id} className="reminder-item urgent">
              <span className="reminder-emoji">🚨</span>
              <div className="reminder-content">
                <div className="reminder-name">{r.contact_name}</div>
                <div className="reminder-desc">{r.type} — {r.note}</div>
              </div>
              <div className="reminder-time" style={{ color: 'var(--danger)' }}>{r.date}</div>
            </div>
          ))}
        </div>
      )}

      {/* Hot prospects */}
      <div className="page-section">
        <div className="section-title">🔥 Contacts chauds prioritaires</div>
        {contacts.filter(c => c.heat === 'hot').length === 0
          ? <div className="empty"><div className="empty-icon">🔥</div><div className="empty-text">Aucun contact chaud. Bougez !</div></div>
          : <div className="grid-2">
              {contacts.filter(c => c.heat === 'hot').slice(0, 6).map(c => (
                <div key={c.id} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: 'var(--obsidian)', flexShrink: 0 }}>
                    {c.name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className={`tag ${statusColor(c.status)}`} style={{ fontSize: 10, padding: '1px 6px' }}>{c.status}</span>
                      <span>{daysSince(c.last_contact)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>

    </div>
  )
}
