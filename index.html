export const statusColor = (s) =>
  ({ prospect: 'tag-prospect', client: 'tag-client', partner: 'tag-partner', leader: 'tag-leader' }[s] || 'tag-prospect')

export const heatInfo = (h) =>
  ({ hot: { label: '🔥 Chaud', color: 'var(--danger)' }, warm: { label: '🟠 Tiède', color: 'var(--warm)' }, cold: { label: '❄️ Froid', color: 'var(--muted)' } }[h])

export const daysSince = (date) => {
  if (!date) return '—'
  const d = Math.floor((new Date() - new Date(date)) / 86400000)
  if (d < 0) return 'À venir'
  if (d === 0) return "Aujourd'hui"
  if (d === 1) return 'Hier'
  return `Il y a ${d}j`
}

export const today = () => new Date().toISOString().split('T')[0]

export function speakText(text, onEnd) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'fr-FR'
  u.rate = 0.95
  if (onEnd) u.onend = onEnd
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel()
}

export function startVoiceInput(onResult, onEnd) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) { alert('Dictée vocale non supportée sur ce navigateur.'); return null }
  const r = new SR()
  r.lang = 'fr-FR'
  r.onresult = (e) => onResult(e.results[0][0].transcript)
  r.onerror = () => onEnd && onEnd()
  r.onend = () => onEnd && onEnd()
  r.start()
  return r
}
