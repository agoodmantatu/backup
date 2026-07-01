// -- Timeout wrapper (prevents cold-start freezes) ------------------
export function withTimeout(promise, ms = 3500, fallback = null) {
  return Promise.race([
    promise,
    new Promise(resolve => setTimeout(() => resolve(fallback), ms))
  ])
}
// src/lib/studentLib.js
import { supabase } from './supabase'

// â"€â"€ Profile â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

// â"€â"€ Avatar â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function uploadAvatar(userId, file) {
  const ext  = file.name.split('.').pop()
  const path = `${userId}/avatar.${ext}`
  const { error: upErr } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true })
  if (upErr) throw upErr
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(path)
  await updateProfile(userId, { avatar_url: data.publicUrl })
  return data.publicUrl
}

// â"€â"€ Streak â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function getStreak(userId) {
  const { data, error } = await supabase
    .from('user_streaks')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data || { current_streak:0, longest_streak:0, total_study_days:0 }
}

export async function updateStreak(userId) {
  await supabase.rpc('update_streak', { p_user_id: userId })
}

// â"€â"€ Test attempts â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function getRecentAttempts(userId, limit = 5) {
  const { data, error } = await supabase
    .from('test_attempts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

// â"€â"€ Free usage â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function getUsage(userId) {
  const { data, error } = await supabase
    .from('free_usage_tracker')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data || { tests_today:0, games_today:0, doubts_today:0 }
}

export async function incrementUsage(userId, field) {
  const today = new Date().toISOString().split('T')[0]
  const current = await getUsage(userId)
  if (!current || current.last_reset !== today) {
    await supabase.from('free_usage_tracker')
      .upsert({
        user_id: userId,
        tests_today: 0,
        games_today: 0,
        doubts_today: 0,
        last_reset: today
      })
    return
  }
  await supabase.from('free_usage_tracker')
    .upsert({
      user_id: userId,
      [field]: (current[field] || 0) + 1,
      last_reset: today
    })
}

// â"€â"€ Coins â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function addCoins(userId, amount, reason) {
  const { error } = await supabase.rpc('add_coins', {
    p_user_id: userId,
    p_amount: amount,
    p_reason: reason
  })
  if (error) console.error('addCoins error:', error)
}

// â"€â"€ Pricing â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function getPricing(category) {
  const { data, error } = await supabase
    .from('pricing_config')
    .select('*')
    .eq('category', category)
    .single()
  if (error) throw error
  return data
}

// â"€â"€ Leaderboard â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from('test_attempts')
    .select(`
      user_id, rank, score, total, exam_name,
      profiles (name, avatar_url, badge, state)
    `)
    .not('rank', 'is', null)
    .order('rank', { ascending: true })
    .limit(limit)
  if (error) throw error
  return data || []
}

// â"€â"€ Launchpad â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export async function getLaunchpadEnrollment(userId) {
  const { data, error } = await supabase
    .from('launchpad_enrollments')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data || null
}

export async function getTodayTopic(enrollment) {
  if (!enrollment) return null
  const { data, error } = await supabase
    .from('daily_topics')
    .select('*')
    .eq('exam', enrollment.target_exam)
    .eq('topic_index', enrollment.current_topic_index)
    .single()
  if (error) return null
  return data
}

