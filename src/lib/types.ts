export type Sentiment = 'positive' | 'neutral' | 'negative'
export type Severity = 'low' | 'medium' | 'high'
export type Route = 'ready_to_post' | 'private_queue' | 'manager_alert' | 'needs_review'
export type Status = 'open' | 'acknowledged' | 'sent' | 'unsent' | 'posted' | 'review'

export interface Feedback {
  feedbackId: string
  receivedAt: string
  customerName: string
  customerEmail: string
  location: string
  service: string
  originalMessage: string
  sentiment: Sentiment
  sentimentScore: number
  severity: Severity
  severityScore: number
  isRepeatNegative: boolean
  route: Route
  category: string
  theme: string
  issue: string
  aiSummary: string
  aiDraftReply: string
  responseSent: boolean
  responseSentAt?: string
  alertAcknowledged: boolean
  alertAcknowledgedAt?: string
  confidence?: number
  status: Status
  source?: string
}

export interface DashboardSettings {
  baseUrl: string
  mode: 'demo' | 'live'
  refreshInterval: number
  severityThreshold: number
  darkMode: boolean
}

export interface NormalizedResponse { feedback: Feedback[] }
