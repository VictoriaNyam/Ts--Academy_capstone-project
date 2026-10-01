import { cloneMockData } from '../data/mockData'
import type { DashboardSettings, Feedback, NormalizedResponse, Route, Sentiment, Severity, Status } from './types'

const SETTINGS_KEY = 'sentra-settings'
const DATA_KEY = 'sentra-demo-feedback'

export const defaultSettings: DashboardSettings = {
  baseUrl: import.meta.env.VITE_BASE_URL ?? '', mode: 'demo', refreshInterval: 30, severityThreshold: 0.75, darkMode: true,
}

export function getSettings(): DashboardSettings {
  try { return { ...defaultSettings, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') } } catch { return defaultSettings }
}
export function saveSettings(settings: DashboardSettings) { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)) }

function getDemoData(): Feedback[] {
  const raw = localStorage.getItem(DATA_KEY)
  if (raw) { try { return JSON.parse(raw) as Feedback[] } catch { /* reset below */ } }
  const seed = cloneMockData(); localStorage.setItem(DATA_KEY, JSON.stringify(seed)); return seed
}
function saveDemoData(data: Feedback[]) { localStorage.setItem(DATA_KEY, JSON.stringify(data)) }

const first = (v: unknown, fallback = '') => v === null || v === undefined ? fallback : v
function scoreSentiment(v: unknown): number {
  if (typeof v === 'number') return Math.max(-1, Math.min(1, v > 1 ? v / 100 : v))
  if (typeof v === 'string') {
    const n = Number(v); if (!Number.isNaN(n)) return n > 1 ? Math.max(-1, Math.min(1, n / 100)) : Math.max(-1, Math.min(1, n))
  }
  return 0
}
function sentimentFrom(v: unknown, score: number): Sentiment {
  if (v === 'positive' || v === 'neutral' || v === 'negative') return v
  return score > 0.15 ? 'positive' : score < -0.15 ? 'negative' : 'neutral'
}
function severityFrom(v: unknown, score: number): Severity {
  if (v === 'low' || v === 'medium' || v === 'high') return v
  return score >= 0.75 ? 'high' : score >= 0.4 ? 'medium' : 'low'
}
function routeFrom(v: unknown, sentiment: Sentiment, severity: Severity, repeat: boolean, confidence?: number): Route {
  if (v === 'ready_to_post' || v === 'private_queue' || v === 'manager_alert' || v === 'needs_review') return v
  if (confidence !== undefined && confidence < 0.6) return 'needs_review'
  if (sentiment === 'positive') return 'ready_to_post'
  if (sentiment === 'negative' && (severity === 'high' || repeat)) return 'manager_alert'
  if (sentiment === 'negative') return 'private_queue'
  return 'needs_review'
}

export function normalizeResponse(payload: unknown): NormalizedResponse {
  const records = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && Array.isArray((payload as {data?:unknown}).data) ? (payload as {data:unknown[]}).data : [])
  const feedback = records.map((r, index) => {
    const x = (r && typeof r === 'object' ? r : {}) as Record<string, unknown>
    const sentimentScore = scoreSentiment(x.sentimentScore ?? x.sentiment_score)
    const severityScore = Number(x.severityScore ?? x.severity_score ?? 0)
    const sentiment = sentimentFrom(x.sentiment, sentimentScore)
    const severity = severityFrom(x.severity, severityScore)
    const repeat = Boolean(x.isRepeatNegative ?? x.is_repeat_negative ?? x.repeatNegative)
    const confidence = x.confidence == null ? undefined : Number(x.confidence)
    const route = routeFrom(x.route, sentiment, severity, repeat, confidence)
    return {
      feedbackId: String(first(x.feedbackId ?? x.feedback_id, `FB-unknown-${index}`)), receivedAt: String(first(x.receivedAt ?? x.received_at, new Date().toISOString())),
      customerName: String(first(x.customerName ?? x.customer_name, 'Unknown customer')), customerEmail: String(first(x.customerEmail ?? x.customer_email, '')),
      location: String(first(x.location, 'Unknown')), service: String(first(x.service, 'General Service')), originalMessage: String(first(x.originalMessage ?? x.original_message ?? x.message, '')),
      sentiment, sentimentScore, severity, severityScore: Number.isFinite(severityScore) ? severityScore : 0, isRepeatNegative: repeat, route,
      category: String(first(x.category, 'Uncategorized')), theme: String(first(x.theme, 'Uncategorized')), issue: String(first(x.issue, 'Unspecified issue')),
      aiSummary: String(first(x.aiSummary ?? x.ai_summary, '')), aiDraftReply: String(first(x.aiDraftReply ?? x.ai_draft_reply, '')), responseSent: Boolean(x.responseSent ?? x.response_sent),
      responseSentAt: x.responseSentAt ? String(x.responseSentAt) : undefined, alertAcknowledged: Boolean(x.alertAcknowledged ?? x.alert_acknowledged),
      alertAcknowledgedAt: x.alertAcknowledgedAt ? String(x.alertAcknowledgedAt) : undefined, confidence, status: (String(first(x.status, route === 'manager_alert' ? 'open' : 'unsent')) as Status), source: String(first(x.source, 'Webhook')),
    } satisfies Feedback
  })
  return { feedback }
}

async function liveRequest(path: string, options?: RequestInit) {
  const settings = getSettings()
  if (!settings.baseUrl) throw new Error('BASE_URL is not configured. Open Settings and add the n8n webhook base URL.')
  const url = `${settings.baseUrl.replace(/\/$/, '')}${path}`
  const res = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } })
  if (!res.ok) throw new Error(`Webhook returned HTTP ${res.status}`)
  return res.status === 204 ? null : res.json()
}

export async function fetchFeedback(): Promise<Feedback[]> {
  const settings = getSettings()
  if (settings.mode === 'demo') return getDemoData()
  return normalizeResponse(await liveRequest('/webhook/feedback-dashboard')).feedback
}

export async function acknowledgeFeedback(feedbackId: string) {
  const settings = getSettings()
  if (settings.mode === 'demo') {
    const next = getDemoData().map(x => x.feedbackId === feedbackId ? { ...x, alertAcknowledged:true, alertAcknowledgedAt:new Date().toISOString(), status:'acknowledged' as const } : x); saveDemoData(next); return
  }
  await liveRequest('/webhook/feedback-acknowledge', { method:'POST', body:JSON.stringify({ feedbackId }) })
}
export async function markSent(feedbackId: string) {
  const settings = getSettings()
  if (settings.mode === 'demo') {
    const next = getDemoData().map(x => x.feedbackId === feedbackId ? { ...x, responseSent:true, responseSentAt:new Date().toISOString(), status:'sent' as const } : x); saveDemoData(next); return
  }
  await liveRequest('/webhook/feedback-mark-sent', { method:'POST', body:JSON.stringify({ feedbackId }) })
}

export function resetDemoData() { localStorage.removeItem(DATA_KEY) }
