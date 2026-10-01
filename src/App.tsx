import { useEffect, useMemo, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Activity, AlertTriangle, BarChart3, Bell, ChevronDown, CircleHelp, FileText, Gauge, Inbox, Lightbulb, ListFilter, Menu, Moon, RefreshCw, Settings as SettingsIcon, Sparkles, Sun, Tags, X, Zap } from 'lucide-react'
import { fetchFeedback, getSettings, saveSettings } from './lib/api'
import type { DashboardSettings } from './lib/types'
import Overview from './pages/Overview'
import FeedbackPage from './pages/Feedback'
import Queues from './pages/Queues'
import IssuesAlerts from './pages/IssuesAlerts'
import AIInsights from './pages/AIInsights'
import SentimentPage from './pages/Sentiment'
import Themes from './pages/Themes'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Pipeline from './pages/Pipeline'

export const locations = ['All Locations', 'Lekki', 'Ikeja', 'Yaba', 'Victoria Island', 'Surulere']

export default function App() {
  const [settings, setSettings] = useState<DashboardSettings>(getSettings())
  const [mobileOpen, setMobileOpen] = useState(false)
  const [location, setLocation] = useState(() => new URLSearchParams(window.location.search).get('location') || 'All Locations')
  const queryClient = useQueryClient()
  const loc = useLocation(); const navigate = useNavigate()
  const feedbackQuery = useQuery({ queryKey:['feedback', settings.mode], queryFn:fetchFeedback, refetchInterval:settings.refreshInterval * 1000 })
  const feedback = feedbackQuery.data ?? []
  const lastUpdated = feedbackQuery.dataUpdatedAt ? new Date(feedbackQuery.dataUpdatedAt) : null

  useEffect(() => { document.documentElement.classList.toggle('dark', settings.darkMode) }, [settings.darkMode])
  useEffect(() => {
    const params = new URLSearchParams(loc.search); if (location === 'All Locations') params.delete('location'); else params.set('location', location)
    navigate(`${loc.pathname}${params.toString() ? `?${params}` : ''}`, { replace:true })
  }, [location]) // intentional URL persistence

  const filtered = useMemo(() => location === 'All Locations' ? feedback : feedback.filter(x => x.location === location), [feedback, location])
  const refresh = () => queryClient.invalidateQueries({ queryKey:['feedback'] })

  function updateSettings(next: DashboardSettings) { setSettings(next); saveSettings(next); queryClient.invalidateQueries({queryKey:['feedback']}) }

  return <div className="min-h-screen bg-[#090b10] text-slate-100">
    <Sidebar mobileOpen={mobileOpen} close={() => setMobileOpen(false)} />
    <div className="lg:pl-[244px]">
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#090b10]/90 backdrop-blur-xl">
        <div className="flex h-[68px] items-center gap-3 px-4 sm:px-6">
          <button className="btn lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={18}/></button>
          <div className="min-w-0 flex-1">
            <div className="hidden text-xs text-slate-500 sm:block">Feedback intelligence / {titleForPath(loc.pathname)}</div>
            <div className="font-semibold tracking-tight sm:hidden">Sentra</div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-xs text-slate-500">Location</span>
            <div className="relative"><select className="input h-9 appearance-none pr-8" value={location} onChange={e=>setLocation(e.target.value)} aria-label="Global location filter">{locations.map(x=><option key={x}>{x}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 text-slate-500" size={15}/></div>
          </div>
          <div className="hidden items-center gap-2 text-[11px] text-slate-500 xl:flex"><span className="h-2 w-2 rounded-full bg-emerald-400"/> {settings.mode === 'demo' ? 'Demo data' : 'Live data'} · {lastUpdated ? `updated ${lastUpdated.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}` : 'waiting'}</div>
          <button className="btn h-9 px-2.5" onClick={refresh} title="Refresh data"><RefreshCw size={16} className={feedbackQuery.isFetching ? 'animate-spin' : ''}/></button>
          <NavLink className="btn h-9 px-2.5" to="/settings" title="Settings"><SettingsIcon size={16}/></NavLink>
        </div>
        <div className="border-t border-white/[0.04] px-4 py-2 md:hidden"><select className="input w-full" value={location} onChange={e=>setLocation(e.target.value)} aria-label="Global location filter">{locations.map(x=><option key={x}>{x}</option>)}</select></div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        {feedbackQuery.isError && <ErrorBanner message={feedbackQuery.error instanceof Error ? feedbackQuery.error.message : 'Unable to reach the feedback source.'} retry={refresh} />}
        <Routes>
          <Route path="/" element={<Overview feedback={filtered} allFeedback={feedback} />} />
          <Route path="/feedback" element={<FeedbackPage feedback={filtered} />} />
          <Route path="/queues" element={<Queues feedback={filtered} />} />
          <Route path="/issues-alerts" element={<IssuesAlerts feedback={filtered} />} />
          <Route path="/ai-insights" element={<AIInsights feedback={filtered} />} />
          <Route path="/sentiment" element={<SentimentPage feedback={filtered} />} />
          <Route path="/themes" element={<Themes feedback={filtered} />} />
          <Route path="/analytics" element={<Analytics feedback={filtered} />} />
          <Route path="/pipeline" element={<Pipeline feedback={filtered} />} />
          <Route path="/settings" element={<Settings settings={settings} onSave={updateSettings} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  </div>
}

function titleForPath(path:string) { const map:Record<string,string> = {'/':'Overview','/feedback':'Feedback','/queues':'Review Queues','/issues-alerts':'Issues & Alerts','/ai-insights':'AI Insights','/sentiment':'Sentiment','/themes':'Themes','/analytics':'Analytics','/pipeline':'Pipeline','/settings':'Settings'}; return map[path] ?? 'Overview' }

const nav = [
  {to:'/', label:'Overview', icon:Gauge}, {to:'/feedback',label:'Feedback',icon:Inbox}, {to:'/queues',label:'Review Queues',icon:ListFilter}, {to:'/issues-alerts',label:'Issues & Alerts',icon:AlertTriangle}, {to:'/ai-insights',label:'AI Insights',icon:Sparkles}, {to:'/sentiment',label:'Sentiment',icon:Activity}, {to:'/themes',label:'Themes',icon:Tags}, {to:'/analytics',label:'Analytics',icon:BarChart3}, {to:'/pipeline',label:'Pipeline',icon:Zap},
]
function Sidebar({mobileOpen,close}:{mobileOpen:boolean;close:()=>void}) { return <>
  {mobileOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={close}/>} 
  <aside className={`fixed inset-y-0 left-0 z-50 w-[244px] border-r border-white/[0.06] bg-[#0d1016] transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0':'-translate-x-full'}`}>
    <div className="flex h-full flex-col p-4">
      <div className="mb-7 flex items-center justify-between px-2"><div className="flex items-center gap-2.5"><div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><Sparkles size={19}/></div><div><div className="text-[17px] font-bold tracking-tight">Sentra</div><div className="text-[10px] uppercase tracking-[0.16em] text-slate-600">Feedback intelligence</div></div></div><button className="btn px-2 lg:hidden" onClick={close}><X size={16}/></button></div>
      <nav className="space-y-1">{nav.map(({to,label,icon:Icon})=><NavLink key={to} to={to} end={to==='/' } onClick={close} className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive?'bg-blue-500/10 text-blue-300':'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'}`}><Icon size={17}/><span>{label}</span>{label==='Issues & Alerts' && <span className="ml-auto rounded-full bg-red-500/15 px-1.5 py-0.5 text-[10px] text-red-300">3</span>}</NavLink>)}</nav>
      <div className="mt-auto space-y-1"><NavLink to="/settings" className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${isActive?'bg-white/[0.06] text-slate-200':'text-slate-400 hover:bg-white/[0.04]'}`}><SettingsIcon size={17}/> Settings</NavLink><div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"><div className="flex items-center gap-2 text-xs font-medium"><CircleHelp size={14} className="text-slate-500"/> Capstone demo</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">Sentra presents processed feedback; n8n remains the automation layer.</p></div></div>
    </div>
  </aside>
</> }

function ErrorBanner({message,retry}:{message:string;retry:()=>void}) { return <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><AlertTriangle className="mt-0.5 text-red-300" size={18}/><div><div className="font-medium text-red-200">Feedback source unavailable</div><div className="mt-1 text-sm text-red-200/60">{message} Check that the workflow is Active and BASE_URL is correct.</div></div></div><button className="btn" onClick={retry}><RefreshCw size={15}/> Retry</button></div> }
