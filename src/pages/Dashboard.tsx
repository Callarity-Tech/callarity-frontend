'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

type Ticket = {
  name: string
  product_id: string
  issue: string
  intent: string
  date: string
}

const INTENT_COLORS: { [key: string]: { bg: string; text: string } } = {
  complaint: { bg: 'bg-red-500/15', text: 'text-red-700' },
  inquiry: { bg: 'bg-blue-500/15', text: 'text-blue-700' },
  support: { bg: 'bg-purple-500/15', text: 'text-purple-700' },
  feedback: { bg: 'bg-amber-500/15', text: 'text-amber-700' },
  suggestion: { bg: 'bg-green-500/15', text: 'text-green-700' },
  other: { bg: 'bg-gray-500/15', text: 'text-gray-700' },
}

const CHART_COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#8b5cf6', // purple
  '#f59e0b', // amber
  '#10b981', // green
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#6366f1', // indigo
]

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('complaints') || '[]')
    setTickets(data.reverse())
  }, [])

  const perDay = tickets.reduce((acc: any[], t) => {
    const d = t.date.slice(0, 10)
    const x = acc.find((a) => a.date === d)
    x ? x.count++ : acc.push({ date: d, count: 1 })
    return acc
  }, [])

  const intents = tickets.reduce((acc: any[], t) => {
    const x = acc.find((a) => a.intent === t.intent)
    x ? x.count++ : acc.push({ intent: t.intent, count: 1 })
    return acc
  }, [])

  const getIntentColor = (intent: string) => {
    return INTENT_COLORS[intent?.toLowerCase()] || INTENT_COLORS['other']
  }

  return (
    <div className="min-h-screen bg-[#121212] text-foreground p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Callarity Dashboard</h1>
          <p className="text-muted-foreground">Monitor customer conversations and intent distribution</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total Conversations" value={tickets.length} />
          <StatCard label="Unique Users" value={new Set(tickets.map((t) => t.name)).size} />
          <StatCard label="Distinct Intents" value={new Set(tickets.map((t) => t.intent)).size} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Complaints Over Time" description="Daily conversation volume">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={perDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis dataKey="date" stroke="hsl(var(--color-muted-foreground))" style={{ fontSize: '12px' }} />
                <YAxis stroke="hsl(var(--color-muted-foreground))" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--color-card))',
                    border: '1px solid hsl(var(--color-border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--color-foreground))' }}
                />
                <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Intent Distribution" description="Breakdown by intent type">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={intents} dataKey="count" nameKey="intent" cx="50%" cy="50%" outerRadius={90} label>
                  {intents.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--color-card))',
                    border: '1px solid hsl(var(--color-border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--color-foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <Panel title="Conversation Records" description={`${tickets.length} total records`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border hover:bg-transparent">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Intent</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Issue</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {tickets.slice(0, 10).map((t, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 align-middle">{t.name}</td>
                    <td className="px-4 py-3 align-middle">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getIntentColor(t.intent).bg} ${getIntentColor(t.intent).text}`}>
                        {t.intent}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-muted-foreground">{t.product_id}</td>
                    <td className="px-4 py-3 align-middle text-muted-foreground truncate">{t.issue}</td>
                    <td className="px-4 py-3 align-middle text-muted-foreground text-xs">{t.date.slice(0, 16).replace('T', ' ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  )
}

function Panel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
