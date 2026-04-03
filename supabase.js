import { useState } from 'react'
import { statusColor, heatInfo, daysSince } from '../lib/utils'

export default function ContactsPage({ contacts, onAdd, onSelect }) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterHeat, setFilterHeat] = useState('all')

  const filtered = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search)) ||
      (c.notes && c.notes.toLowerCase().includes(search.toLowerCase()))
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    const matchHeat = filterHeat === 'all' || c.heat === filterHeat
    return matchSearch && matchStatus && matchHeat
  })

  return (
    <div className="page">
      <div className="page-section">
        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
            <span style={{ color: 'var(--muted)' }}>🔍</span>
            <input placeholder="Rechercher un contact..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-gold" onClick={onAdd}>✦ Nouveau contact</button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <div className="chip-row">
            {[['all','Tous'],['prospect','Prospects'],['client','Clients'],['partner','Partenaires'],['leader','Leaders']].map(([v, l]) => (
              <div key={v} className={`chip ${filterStatus === v ? 'active' : ''}`} onClick={() => setFilterStatus(v)}>{l}</div>
            ))}
          </div>
          <div className="chip-row">
            {[['all','Tous'],['hot','🔥 Chauds'],['warm','🟠 Tièdes'],['cold','❄️ Froids']].map(([v, l]) => (
              <div key={v} className={`chip ${filterHeat === v ? 'active' : ''}`} onClick={() => setFilterHeat(v)}>{l}</div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>{filtered.length} contact{filtered.length !== 1 ? 's' : ''}</div>

        {/* Table */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Statut</th>
                <th>Température</th>
                <th>Produit</th>
                <th>Business</th>
                <th>Dernier contact</th>
                <th>Rappel</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="clickable" onClick={() => onSelect(c)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: 'var(--obsidian)', flexShrink: 0 }}>
                        {c.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.phone || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`tag ${statusColor(c.status)}`}>{c.status}</span></td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
                      <span className="heat-dot" style={{ background: c.heat === 'hot' ? 'var(--danger)' : c.heat === 'warm' ? 'var(--warm)' : 'var(--muted)', boxShadow: c.heat === 'hot' ? '0 0 6px var(--danger)' : 'none' }} />
                      {heatInfo(c.heat)?.label}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="score-bar" style={{ width: 60 }}><div className="score-fill" style={{ width: `${c.product_interest * 10}%`, background: 'var(--gold)' }} /></div>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{c.product_interest}/10</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="score-bar" style={{ width: 60 }}><div className="score-fill" style={{ width: `${c.business_interest * 10}%`, background: 'var(--blue)' }} /></div>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{c.business_interest}/10</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{daysSince(c.last_contact)}</td>
                  <td style={{ fontSize: 12, color: c.next_action && c.next_action <= new Date().toISOString().split('T')[0] ? 'var(--danger)' : 'var(--muted)' }}>
                    {c.next_action || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty">
              <div className="empty-icon">👥</div>
              <div className="empty-text">{contacts.length === 0 ? 'Ajoutez votre premier prospect !' : 'Aucun résultat pour cette recherche.'}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
