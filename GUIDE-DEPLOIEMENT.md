import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Variables Supabase manquantes. Vérifiez votre fichier .env')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

// ── CONTACTS ────────────────────────────────────────────────────────────────

export async function getContacts(userId) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addContact(userId, contact) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ ...contact, user_id: userId }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateContact(id, updates) {
  const { data, error } = await supabase
    .from('contacts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteContact(id) {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── DAILY ACTIONS ────────────────────────────────────────────────────────────

export async function getDailyActions(userId) {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('daily_actions')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .maybeSingle()
  if (error) throw error
  return data || { invitations: 0, presentations: 0, relances: 0 }
}

export async function upsertDailyActions(userId, actions) {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('daily_actions')
    .upsert(
      { user_id: userId, date: today, ...actions },
      { onConflict: 'user_id,date' }
    )
    .select()
    .single()
  if (error) throw error
  return data
}

// ── REMINDERS ────────────────────────────────────────────────────────────────

export async function getReminders(userId) {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .eq('user_id', userId)
    .eq('done', false)
    .order('date', { ascending: true })
  if (error) throw error
  return data || []
}

export async function addReminder(userId, reminder) {
  const { data, error } = await supabase
    .from('reminders')
    .insert([{ ...reminder, user_id: userId }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function markReminderDone(id) {
  const { error } = await supabase
    .from('reminders')
    .update({ done: true })
    .eq('id', id)
  if (error) throw error
}

// ── AUTH ─────────────────────────────────────────────────────────────────────

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}
