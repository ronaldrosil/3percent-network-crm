import { daysSince } from '../lib/utils'

const COLS = [
  { key: 'prospect', label: 'Prospects', cls: 'pipe-prospect', emoji: '🎯' },
  { key: 'client', label: 'Clients', cls: 'pipe-client', emoji: '💚' },
  { key: 'partner', label: 'Partenaires', cls: 'pipe-partner', emoji: '🤝' },
  { key: 'leader', label: 'Leaders', cls: 'pipe-leader', emoji: '⭐' },
]

export default function PipelinePage({ contacts, onSelect }) {
  return (
    <div className="page">
      <div className="page-section">
        <div className="section-title">🔄 Pipeline prospect → client → partenaire → leader</div>

        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.7 }}>
          Cliquez sur un contact pour l'analyser avec l'IA et changer son statut.
        </div>

        <div className="pipeline">
          {COLS.map(col => {
            const list = contacts.filter(c => c.status === col.key)
            return (
              <div key={col.key} className={`pipe-col ${col.cls}`}>
                <div className="pipe-col-header">
                  <span className="pipe-col-title">{col.emoji} {col.label}</span>
                  <span className="pipe-badge">{list.length}</span>
                </div>

                {list.length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>
                    Aucun contact
                  </div>
                )}

                {list.map(c => (
                  <div key={c.id} className="pipe-card" onClick={() => onSelect(c)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <span className="heat-dot" style={{
                        background: c.heat === 'hot' ? 'var(--danger)' : c.heat === 'warm' ? 'var(--warm)' : 'var(--muted)',
                        boxShadow: c.heat === 'hot' ? '0 0 6px var(--danger)' : 'none'
                      }} />
                      <span className="pipe-card-name">{c.name}</span>
                    </div>
                    <div className="pipe-card-meta">
                      Produit {c.product_interest}/10 · Business {c.business_interest}/10
                    </div>
                    <div className="pipe-card-meta" style={{ marginTop: 4 }}>
                      {daysSince(c.last_contact)}
                    </div>
                    {c.objection && (
                      <div style={{ marginTop: 6, fontSize: 10, color: 'var(--danger)', background: 'rgba(224,82,82,0.08)', borderRadius: 4, padding: '3px 6px' }}>
                        ⚠ {c.objection.slice(0, 30)}{c.objection.length > 30 ? '...' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Stats bar */}
        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {COLS.map(col => {
            const count = contacts.filter(c => c.status === col.key).length
            const pct = contacts.length ? Math.round(count / contacts.length * 100) : 0
            return (
              <div key={col.key} style={{ flex: 1, minWidth: 80, background: 'var(--panel)', borderRadius: 8, padding: '10px 14px', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{col.label}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700 }}>{count}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{pct}%</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
