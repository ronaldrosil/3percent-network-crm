import { useEffect } from 'react'

export default function Toast({ msg, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [])

  const icon = type === 'error' ? '⚠️' : type === 'info' ? 'ℹ️' : '✅'
  const color = type === 'error' ? 'var(--danger)' : type === 'info' ? 'var(--blue)' : 'var(--success)'

  return (
    <div className="toast" style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
      <span>{icon}</span>
      <span>{msg}</span>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', marginLeft: 8, fontSize: 14 }} onClick={onClose}>✕</button>
    </div>
  )
}
