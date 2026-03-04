import { useState } from 'react'
import { Shield, Zap, Users, Server, Play, Download, Star } from 'lucide-react'

const servers = [
  { name: 'Hypixel', ip: 'mc.hypixel.net', players: '83,241', ping: 42, status: 'online' },
  { name: 'Mineplex', ip: 'us.mineplex.com', players: '4,102', ping: 78, status: 'online' },
  { name: 'CubeCraft', ip: 'play.cubecraft.net', players: '12,488', ping: 65, status: 'online' },
  { name: 'PvPLand', ip: 'pvpland.net', players: '891', ping: 31, status: 'online' },
]

const features = [
  { icon: Zap, label: 'AutoClicker', desc: 'Up to 20 CPS' },
  { icon: Shield, label: 'KillAura', desc: '3.5 block reach' },
  { icon: Star, label: 'Velocity', desc: 'Custom knockback' },
  { icon: Users, label: 'NameTags', desc: 'Always visible' },
]

export default function MainMenu() {
  const [activeServer, setActiveServer] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative rounded-lg overflow-hidden pixel-border"
        style={{
          background: 'linear-gradient(135deg, hsl(222 40% 7%) 0%, hsl(142 70% 40% / 0.08) 100%)',
          minHeight: '180px'
        }}>
        <div className="absolute inset-0 scanlines" />
        <div className="relative z-10 p-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center glow-green">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-minecraft text-2xl text-primary glow-green-text tracking-widest">
                VOIDCLIENT
              </h1>
              <p className="text-xs text-muted-foreground font-mono">v2.4.1 • Minecraft 1.8.9</p>
            </div>
          </div>
          <p className="text-sm text-secondary-foreground font-mono mt-2 max-w-md">
            The most advanced PvP client for 1.8.9. Dominate every fight with precision-tuned modules and lightning-fast combat tools.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 glow-green">
              <Play className="w-4 h-4" />
              LAUNCH GAME
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded border border-border text-secondary-foreground font-mono text-sm hover:border-primary/50 hover:text-primary transition-all">
              <Download className="w-4 h-4" />
              UPDATE
            </button>
          </div>
        </div>
        {/* Decorative grid */}
        <div className="absolute right-8 top-4 opacity-10 font-mono text-xs text-primary leading-4 select-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>{Array.from({ length: 16 }).map((_, j) => Math.random() > 0.5 ? '█' : '░').join('')}</div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick PvP Mods */}
        <div className="lg:col-span-1">
          <div className="rounded-lg pixel-border p-4" style={{ background: 'hsl(222 40% 7%)' }}>
            <h2 className="font-minecraft text-xs text-muted-foreground mb-3 tracking-wider">ACTIVE MODS</h2>
            <div className="flex flex-col gap-2">
              {features.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-center justify-between p-2 rounded bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-xs text-foreground">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">{desc}</span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Server List */}
        <div className="lg:col-span-2">
          <div className="rounded-lg pixel-border p-4" style={{ background: 'hsl(222 40% 7%)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-minecraft text-xs text-muted-foreground tracking-wider">SERVER LIST</h2>
              <button className="text-xs text-primary font-mono hover:text-accent transition-colors">+ ADD SERVER</button>
            </div>
            <div className="flex flex-col gap-2">
              {servers.map((s, i) => (
                <div
                  key={s.name}
                  className={`flex items-center justify-between p-3 rounded cursor-pointer border transition-all hover:border-primary/40 ${activeServer === i ? 'mod-enabled border-primary/50' : 'border-border bg-secondary/20'}`}
                  onClick={() => setActiveServer(activeServer === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Server className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-semibold text-foreground">{s.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{s.ip}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-mono text-xs text-foreground">{s.players}</div>
                      <div className="font-mono text-xs text-muted-foreground">players</div>
                    </div>
                    <div>
                      <div className={`font-mono text-xs ${s.ping < 50 ? 'text-primary' : s.ping < 100 ? 'text-yellow-400' : 'text-destructive'}`}>
                        {s.ping}ms
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">ping</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${s.status === 'online' ? 'bg-primary' : 'bg-destructive'}`} />
                  </div>
                </div>
              ))}
            </div>
            {activeServer !== null && (
              <button className="w-full mt-3 py-2 rounded bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] glow-green">
                CONNECT TO {servers[activeServer].name.toUpperCase()}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'SESSION TIME', value: '2h 34m', color: 'text-primary' },
          { label: 'KILLS TODAY', value: '47', color: 'text-primary' },
          { label: 'K/D RATIO', value: '3.2', color: 'text-yellow-400' },
          { label: 'AVG CPS', value: '12.4', color: 'text-primary' },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg pixel-border p-3 text-center" style={{ background: 'hsl(222 40% 7%)' }}>
            <div className={`font-minecraft text-xl ${stat.color}`}>{stat.value}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
