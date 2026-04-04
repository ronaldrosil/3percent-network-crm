import { useState, useEffect, useCallback } from 'react'
import { supabase, getContacts, addContact, updateContact, deleteContact, getDailyActions, upsertDailyActions, getReminders, signOut } from './lib/supabase'

import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import ContactsPage from './pages/ContactsPage'
import PipelinePage from './pages/PipelinePage'
import RemindersPage from './pages/RemindersPage'
import AIPage from './pages/AIPage'
import AddContactModal from './components/AddContactModal'
import ContactDetailModal from './components/ContactDetailModal'
import Toast from './components/Toast'

const NAV = [
  { id: 'dashboard', icon: '⬡', label: 'Tableau de bord' },
  { id: 'contacts',  icon: '👥', label: 'Contacts' },
  { id: 'pipeline',  icon: '🔄', label: 'Pipeline' },
  { id: 'reminders', icon: '🔔', label: 'Rappels' },
  { id: 'ai',        icon: '🧠', label: 'Assistant IA' },
]

export default function App() {
  const [user, setUser]               = useState(null)
  const [loading, setLoading]         = useState(true)
  const [page, setPage]               = useState('dashboard')
  const [contacts, setContacts]       = useState([])
  const [actions, setActions]         = useState({ invitations: 0, presentations: 0, relances: 0 })
  const [reminders, setReminders]     = useState([])
  const [showAdd, setShowAdd]         = useState(false)
  const [selected, setSelected]       = useState(null)
  const [toast, setToast]             = useState(null)
  const [dataLoading, setDataLoading] = useState(false)

  const notify = (msg, type = 'success') => setToast({ msg, type })

  // ── AUTH ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // ── LOAD DATA ───────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    if (!user) return
    setDataLoading(true)
    try {
      const [c, a, r] = await Promise.all([
        getContacts(user.id),
        getDailyActions(user.id),
        getReminders(user.id),
      ])
      setContacts(c)
      setActions(a)
      setReminders(r)
    } catch (err) {
      notify('Erreur de chargement des données.', 'error')
      console.error(err)
    }
    setDataLoading(false)
  }, [user])

  useEffect(() => { loadData() }, [loadData])

  // ── HANDLERS ─────────────────────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    setContacts([])
    notify('Déconnecté avec succès.', 'info')
  }

  const handleAddContact = async (contact) => {
    try {
      const saved = await addContact(user.id, contact)
      setContacts(prev => [saved, ...prev])
      setShowAdd(false)
      notify(`${contact.name} ajouté avec succès !`)
    } catch (err) {
      notify('Erreur lors de l\'ajout.', 'error')
    }
  }

  const handleUpdateContact = async (updated) => {
    try {
      const saved = await updateContact(updated.id, updated)
      setContacts(prev => prev.map(c => c.id === saved.id ? saved : c))
      notify('Contact mis à jour !')
    } catch (err) {
      notify('Erreur lors de la mise à jour.', 'error')
    }
  }

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id)
      setContacts(prev => prev.filter(c => c.id !== id))
      notify('Contact supprimé.')
    } catch (err) {
      notify('Erreur lors de la suppression.', 'error')
    }
  }

  const handleActionChange = async (key, delta) => {
    const updated = { ...actions, [key]: Math.max(0, (actions[key] || 0) + delta) }
    setActions(updated)
    try {
      await upsertDailyActions(user.id, updated)
    } catch (err) {
      console.error('Action save error:', err)
    }
  }

  const todayReminders = reminders.filter(r => r.date <= new Date().toISOString().split('T')[0])
  const todayStr = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

  // ── LOADING SCREEN ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--obsidian)', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, background: 'linear-gradient(135deg, #E8C96B, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3%</div>
        <div className="spinner" style={{ width: 28, height: 28 }} />
      </div>
    )
  }

  // ── AUTH SCREEN ─────────────────────────────────────────────────────────────
  if (!user) return <AuthPage onGoogleLogin={handleGoogleLogin} />

  // ── APP ─────────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* SIDEBAR */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <h1>3%</h1>
          <p>CRM by Ronald</p>
        </div>

        {NAV.map(item => (
          <div
            key={item.id}
            className={`nav-item ${page === item.id ? 'active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.id === 'reminders' && todayReminders.length > 0 && (
              <span className="nav-badge">{todayReminders.length}</span>
            )}
          </div>
        ))}

        {/* User info & logout */}
        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            {user.user_metadata?.avatar_url
              ? <img src={user.user_metadata.avatar_url} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--gold-dim)' }} />
              : <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--obsidian)' }}>
                  {(user.user_metadata?.full_name || user.email || '?')[0].toUpperCase()}
                </div>
            }
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>Connecté</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={handleLogout}>
            ↩ Déconnexion
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div className="main">
        {/* TOPBAR */}
        <div className="topbar">
          <div>
            <div className="topbar-title">
              {page === 'dashboard' && <>Tableau de <span>bord</span></>}
              {page === 'contacts'  && <>Mes <span>contacts</span></>}
              {page === 'pipeline'  && <>Mon <span>pipeline</span></>}
              {page === 'reminders' && <>Mes <span>rappels</span></>}
              {page === 'ai'        && <>Assistant <span>IA</span></>}
            </div>
            <div className="topbar-sub">
              {todayStr} · {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
              {dataLoading && <span style={{ marginLeft: 8, color: 'var(--gold)' }}>↻ Chargement...</span>}
            </div>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-ghost btn-sm" onClick={loadData} title="Actualiser">↻</button>
            <button className="btn btn-gold" onClick={() => setShowAdd(true)}>✦ Ajouter</button>
          </div>
        </div>

        {/* PAGES */}
        {page === 'dashboard' && (
          <Dashboard contacts={contacts} actions={actions} reminders={reminders} onActionChange={handleActionChange} />
        )}
        {page === 'contacts' && (
          <ContactsPage contacts={contacts} onAdd={() => setShowAdd(true)} onSelect={setSelected} />
        )}
        {page === 'pipeline' && (
          <PipelinePage contacts={contacts} onSelect={setSelected} />
        )}
        {page === 'reminders' && (
          <RemindersPage contacts={contacts} reminders={reminders} userId={user.id} onRefresh={loadData} />
        )}
        {page === 'ai' && (
          <AIPage contacts={contacts} />
        )}
      </div>

      {/* MODALS */}
      {showAdd && (
        <AddContactModal onSave={handleAddContact} onClose={() => setShowAdd(false)} />
      )}
      {selected && (
        <ContactDetailModal
          contact={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdateContact}
          onDelete={handleDeleteContact}
        />
      )}

      {/* TOAST */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
