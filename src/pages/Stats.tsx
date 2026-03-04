import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Trophy, Swords, Target, TrendingUp, Clock, Zap } from 'lucide-react'

const killHistory = [
  { day: 'Mon', kills: 12, deaths: 4 },
  { day: 'Tue', kills: 19, deaths: 6 },
  { day: 'Wed', kills: 8, deaths: 3 },
  { day: 'Thu', kills: 25, deaths: 7 },
  { day: 'Fri', kills: 31, deaths: 8 },
  { day: 'Sat', kills: 47, deaths: 12 },
  { day: 'Sun', kills: 38, deaths: 9 },
]

const cpsData = [
  { t: '0s', cps: 8 }, { t: '5s', cps: 11 }, { t: '10s', cps: 13 },
  { t: '15s', cps: 12 }, { t: '20s', cps: 14 }, { t: '25s', cps: 10 },
  { t: '30s', cps: 13 }, { t: '35s', cps: 15 }, { t: '40s', cps: 12 },
]

const fpsData = [
  { t: '0s', fps: 240 }, { t: '5s', fps: 238 }, { t: '10s', fps: 245 },
  { t: '15s', fps: 230 }, { t: '20s', fps: 244 }, { t: '25s', fps: 242 },
  { t: '30s', fps: 248 }, { t: '35s', fps: 244 }, { t: '40s', fps: 246 },
]

const tooltipStyle = {
  backgroundColor: 'hsl(222 40% 7%)',
  border: '1px solid hsl(222 25% 14%)',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '11px',
  color: 'hsl(120 15% 90%)',
  borderRadius: '4px',
}

const statCards = [
  { icon: Swords, label: 'Total Kills', value: '1,847', sub: '+47 today', color: 'text-primary' },
  { icon: Trophy, label: 'K/D Ratio', value: '3.2', sub: 'Lifetime avg', color: 'text-yellow-400' },
  { icon: Target, label: 'Win Rate', value: '68%', sub: 'Last 50 games', color: 'text-primary' },
  { icon: TrendingUp, label: 'Win Streak', value: '12', sub: 'Current streak', color: 'text-primary' },
  { icon: Clock, label: 'Playtime', value: '142h', sub: 'This month', color: 'text-blue-400' },
  { icon: Zap, label: 'Peak CPS', value: '17', sub: 'All-time high', color: 'text-primary' },
]

const recentMatches = [
  { map: 'Hypixel Pit', result: 'WIN', kills: 8, deaths: 1, duration: '4:23' },
  { map: 'Bridge Duel', result: 'WIN', kills: 3, deaths: 0, duration: '2:01' },
  { map: 'Hypixel Sky Wars', result: 'LOSS', kills: 2, deaths: 1, duration: '8:45' },
  { map: 'Hypixel Bedwars', result: 'WIN', kills: 5, deaths: 2, duration: '12:11' },
  { map: 'CubeCraft PvP', result: 'WIN', kills: 11, deaths: 3, duration: '6:34' },
]

export default function Stats() {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div>
        <h1 className="font-minecraft text-lg text-primary tracking-wider">PVP STATISTICS</h1>
        <p className="text-xs text-muted-foreground font-mono">Lifetime performance overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {statCards.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="rounded-lg pixel-border p-4 flex items-center gap-3" style={{ background: 'hsl(222 40% 7%)' }}>
            <div className="w-9 h-9 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <div className={`font-minecraft text-xl ${color}`}>{value}</div>
              <div className="font-mono text-xs text-muted-foreground">{label}</div>
              <div className="font-mono text-xs text-primary/70">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Kills / Deaths chart */}
        <div className="rounded-lg pixel-border p-4" style={{ background: 'hsl(222 40% 7%)' }}>
          <h3 className="font-minecraft text-xs text-muted-foreground mb-3 tracking-wider">KILLS THIS WEEK</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={killHistory} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 14%)" />
              <XAxis dataKey="day" tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'hsl(220 10% 50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'hsl(220 10% 50%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(142 70% 40% / 0.05)' }} />
              <Bar dataKey="kills" fill="hsl(142 70% 40%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="deaths" fill="hsl(0 72% 51% / 0.7)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-primary" /><span className="font-mono text-xs text-muted-foreground">Kills</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-destructive/70" /><span className="font-mono text-xs text-muted-foreground">Deaths</span></div>
          </div>
        </div>

        {/* CPS Chart */}
        <div className="rounded-lg pixel-border p-4" style={{ background: 'hsl(222 40% 7%)' }}>
          <h3 className="font-minecraft text-xs text-muted-foreground mb-3 tracking-wider">CPS LIVE GRAPH</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={cpsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 14%)" />
              <XAxis dataKey="t" tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'hsl(220 10% 50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'hsl(220 10% 50%)' }} axisLine={false} tickLine={false} domain={[0, 20]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="cps" stroke="hsl(142 70% 40%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FPS chart */}
      <div className="rounded-lg pixel-border p-4" style={{ background: 'hsl(222 40% 7%)' }}>
        <h3 className="font-minecraft text-xs text-muted-foreground mb-3 tracking-wider">FPS PERFORMANCE</h3>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={fpsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 14%)" />
            <XAxis dataKey="t" tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'hsl(220 10% 50%)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'hsl(220 10% 50%)' }} axisLine={false} tickLine={false} domain={[200, 260]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="fps" stroke="hsl(200 70% 50%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Matches */}
      <div className="rounded-lg pixel-border p-4" style={{ background: 'hsl(222 40% 7%)' }}>
        <h3 className="font-minecraft text-xs text-muted-foreground mb-3 tracking-wider">RECENT MATCHES</h3>
        <div className="flex flex-col gap-1">
          {recentMatches.map((m, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded border border-border/40 hover:border-border transition-colors">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${m.result === 'WIN' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}`}>
                  {m.result}
                </span>
                <span className="font-mono text-sm text-foreground">{m.map}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                <span className="text-primary">{m.kills}K</span>
                <span className="text-destructive">{m.deaths}D</span>
                <span>{m.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
