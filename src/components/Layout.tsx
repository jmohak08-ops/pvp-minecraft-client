import { useState } from 'react'
import { Shield, LayoutGrid, Sword, Monitor, Users, BarChart2, Settings, ChevronLeft, ChevronRight, Wifi, Battery, Clock } from 'lucide-react'
import MainMenu from '../pages/MainMenu'
import ModManager from '../pages/ModManager'
import HudEditor from '../pages/HudEditor'
import AccountManager from '../pages/AccountManager'
import Stats from '../pages/Stats'
import Settings from '../pages/Settings'

type Page = 'home' | 'mods' | 'hud' | 'accounts' | 'stats' | 'settings'

const navItems: { id: Page; icon: typeof Shield; label: string }[] = [
  { id: 'home', icon: LayoutGrid, label: 'Home' },
  { id: 'mods', icon: Sword, label: 'Mods' },
  { id: 'hud', icon: Monitor, label: 'HUD Editor' },
  { id: 'accounts', icon: Users, label: 'Accounts' },
  { id: 'stats', icon: BarChart2, label: 'Statistics' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

function Clock12() {
  const now = new Date()
  return <span>{now.getHours().toString().padStart(2, '0')}:{now.getMinutes().toString().padStart(2, '0')}</span>
}

export default function Layout() {
  const [page, setPage] = useState<Page>('home')
  const [collapsed, setCollapsed] = useState(false)

  const renderPage = () => {
    switch (page) {
      case 'home': return <MainMenu />
      case 'mods': return <ModManager />
      case 'hud': return <HudEditor />
      case 'accounts': return <AccountManager />
      case 'stats': return <Stats />
      case 'settings': return <Settings />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'hsl(222 47% 4%)' }}>
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-14' : 'w-52'} h-screen flex flex-col border-r border-border transition-all duration-200 shrink-0`}
        style={{ background: 'hsl(222 40% 6%)' }}>
        {/* Logo */}
        <div className={`h-14 border-b border-border flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} gap-2 shrink-0`}>
          <div className="w-7 h-7 rounded bg-primary/20 border border-primary/40 flex items-center justify-center glow-green shrink-0">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <div className="font-minecraft text-sm text-primary tracking-widest glow-green-text">VOID</div>
              <div className="font-mono text-[9px] text-muted-foreground -mt-0.5">1.8.9 CLIENT</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-0.5 py-3 px-2 overflow-y-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-2.5 rounded px-2.5 py-2 font-mono text-xs transition-all ${page === id
                ? 'bg-primary/15 text-primary border-l-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40 border-l-2 border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className={`border-t border-border p-2 shrink-0`}>
          {!collapsed && (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-primary/5 border border-primary/20 mb-2">
              <div className="w-6 h-6 rounded bg-secondary border border-border flex items-center justify-center overflow-hidden">
                <img
                  src="https://mc-heads.net/avatar/xX_VoidSlayer_Xx/24"
                  alt="user"
                  className="w-full h-full"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-xs text-foreground truncate">xX_VoidSlayer_Xx</div>
                <div className="font-mono text-[9px] text-muted-foreground">Cracked</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto shrink-0 animate-pulse-glow" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-1 rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-5 shrink-0"
          style={{ background: 'hsl(222 40% 6%)' }}>
          <div className="flex items-center gap-2">
            <span className="font-minecraft text-xs text-muted-foreground tracking-wider">
              {navItems.find(n => n.id === page)?.label.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Live indicators */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-primary/10 border border-primary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary">244 FPS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-xs text-primary">42ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground"><Clock12 /></span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-xs text-muted-foreground">v2.4.1</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
