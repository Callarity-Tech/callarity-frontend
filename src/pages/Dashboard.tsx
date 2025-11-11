import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

type Ticket = {
  name: string;
  product_id: string;
  issue: string;
  intent: string;
  date: string;
};

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("complaints") || "[]");
    setTickets(data.reverse());
  }, []);

  // Graph: complaints per day
  const perDay = tickets.reduce((acc: any[], t) => {
    const d = t.date.slice(0, 10);
    const x = acc.find((a) => a.date === d);
    x ? x.count++ : acc.push({ date: d, count: 1 });
    return acc;
  }, []);

  // Intent distribution (pie chart)
  const intents = tickets.reduce((acc: any[], t) => {
    const x = acc.find((a) => a.intent === t.intent);
    x ? x.count++ : acc.push({ intent: t.intent, count: 1 });
    return acc;
  }, []);

  const COLORS = ["#FF4BFF", "#00E5FF", "#FFAA00", "#72FF56"];

  return (
    <div className="min-h-screen bg-black text-white p-40 flex flex-col gap-10">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-white text-transparent bg-clip-text drop-shadow-lg">
        Callarity Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6 ">
        <StatCard label="Total Conversations" value={tickets.length} />
        <StatCard label="Unique Users" value={new Set(tickets.map(t => t.name)).size} />
        <StatCard label="Distinct Intents" value={new Set(tickets.map(t => t.intent)).size} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-10">
        <GlassPanel title="Complaints Over Time">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={perDay}>
              <XAxis dataKey="date" stroke="#bbb" />
              <YAxis stroke="#bbb" />
              <Tooltip />
              <Bar dataKey="count" fill="#fee" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassPanel>

        <GlassPanel title="Intent Breakdown">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={intents} dataKey="count" nameKey="intent" outerRadius={110}>
                {intents.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </GlassPanel>
      </div>

      {/* Table */}
      <GlassPanel title="Conversation Records">
        <div className="overflow-auto max-h-[45vh]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/20 text-red-300">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Intent</th>
                <th className="p-2">Product ID</th>
                <th className="p-2">Issue</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, i) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="p-2">{t.name}</td>
                  <td className="p-2 text-purple-300">{t.intent}</td>
                  <td className="p-2">{t.product_id}</td>
                  <td className="p-2">{t.issue}</td>
                  <td className="p-2 opacity-60">{t.date.slice(0, 16).replace("T", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-center shadow-lg">
      <div className="text-4xl font-bold text-pink-300 drop-shadow-sm">{value}</div>
      <div className="text-lg opacity-70">{label}</div>
    </div>
  );
}

function GlassPanel({ title, children }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl">
      <h2 className="text-xl mb-4 font-semibold opacity-90">{title}</h2>
      {children}
    </div>
  );
}
