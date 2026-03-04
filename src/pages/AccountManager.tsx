import { useState } from 'react'
import { User, Plus, Trash2, Star, RefreshCw, Copy, Check } from 'lucide-react'

type Account = {
  id: string
  username: string
  type: 'cracked' | 'premium'
  uuid?: string
  active: boolean
  addedAt: string
}

const defaultAccounts: Account[] = [
  { id: '1', username: 'xX_VoidSlayer_Xx', type: 'cracked', active: true, addedAt: '2024-01-15' },
  { id: '2', username: 'NightFall2009', type: 'cracked', active: false, addedAt: '2024-02-03' },
  { id: '3', username: 'Steve', type: 'cracked', active: false, addedAt: '2024-01-10' },
  { id: '4', username: 'pvp_god_420', type: 'premium', uuid: 'a8f3c2d1-...', active: false, addedAt: '2024-03-01' },
]

function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export default function AccountManager() {
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts)
  const [tab, setTab] = useState<'cracked' | 'premium'>('cracked')
  const [showAdd, setShowAdd] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const setActive = (id: string) => {
    setAccounts(prev => prev.map(a => ({ ...a, active: a.id === id })))
  }

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id))
  }

  const addCracked = () => {
    if (!newUsername.trim()) return
    const account: Account = {
      id: Date.now().toString(),
      username: newUsername.trim(),
      type: 'cracked',
      active: false,
      addedAt: new Date().toISOString().slice(0, 10),
    }
    setAccounts(prev => [...prev, account])
    setNewUsername('')
    setShowAdd(false)
  }

  const addPremium = () => {
    if (!newEmail.trim() || !newUsername.trim()) return
    const account: Account = {
      id: Date.now().toString(),
      username: newUsername.trim(),
      type: 'premium',
      uuid: randomUUID(),
      active: false,
      addedAt: new Date().toISOString().slice(0, 10),
    }
    setAccounts(prev => [...prev, account])
    setNewEmail('')
    setNewUsername('')
    setNewPassword('')
    setShowAdd(false)
  }

  const copyUUID = (uuid: string) => {
    navigator.clipboard.writeText(uuid)
    setCopied(uuid)
    setTimeout(() => setCopied(null), 1500)
  }

  const filtered = accounts.filter(a => a.type === tab)
  const active = accounts.find(a => a.active)

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-minecraft text-lg text-primary tracking-wider">ACCOUNT MANAGER</h1>
          <p className="text-xs text-muted-foreground font-mono">{accounts.length} accounts • {accounts.filter(a => a.type === 'premium').length} premium</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          ADD ACCOUNT
        </button>
      </div>

      {/* Active account banner */}
      {active && (
        <div className="flex items-center gap-3 p-3 rounded-lg mod-enabled pixel-border">
          <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center overflow-hidden">
            <img
              src={`https://mc-heads.net/avatar/${active.username}/40`}
              alt={active.username}
              className="w-full h-full"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-mono text-sm font-semibold text-primary">{active.username}</div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${active.type === 'premium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-secondary text-muted-foreground'}`}>
                {active.type === 'premium' ? '⭐ PREMIUM' : 'CRACKED'}
              </span>
              <span className="text-xs text-muted-foreground font-mono">Currently Active</span>
            </div>
          </div>
          <div className="ml-auto">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          </div>
        </div>
      )}

      {/* Add account form */}
      {showAdd && (
        <div className="rounded-lg pixel-border p-4 animate-slide-in" style={{ background: 'hsl(222 40% 7%)' }}>
          <div className="flex gap-2 mb-3">
            {(['cracked', 'premium'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded font-mono text-xs transition-all ${tab === t ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}
              >
                {t === 'premium' ? '⭐ PREMIUM' : 'CRACKED'}
              </button>
            ))}
          </div>
          {tab === 'cracked' ? (
            <div className="flex gap-2">
              <input
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCracked()}
                placeholder="Username (e.g. xX_Player_Xx)"
                className="flex-1 bg-input border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button onClick={addCracked} className="px-4 py-2 rounded bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-all">
                ADD
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Email / Mojang email"
                className="bg-input border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="bg-input border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                placeholder="In-game name"
                className="bg-input border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button onClick={addPremium} className="py-2 rounded bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-all">
                ADD PREMIUM ACCOUNT
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1">
        {(['cracked', 'premium'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded font-mono text-xs transition-all ${tab === t ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:border-primary/50'}`}
          >
            {t === 'premium' ? '⭐ PREMIUM' : 'CRACKED'} ({accounts.filter(a => a.type === t).length})
          </button>
        ))}
      </div>

      {/* Account grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filtered.map(acc => (
          <div
            key={acc.id}
            className={`rounded-lg pixel-border p-3 transition-all ${acc.active ? 'mod-enabled' : ''}`}
            style={{ background: 'hsl(222 40% 7%)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-secondary border border-border overflow-hidden flex items-center justify-center relative shrink-0">
                <img
                  src={`https://mc-heads.net/avatar/${acc.username}/40`}
                  alt={acc.username}
                  className="w-full h-full absolute inset-0"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-semibold text-foreground truncate">{acc.username}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-mono px-1 py-0.5 rounded ${acc.type === 'premium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-secondary text-muted-foreground'}`}>
                    {acc.type === 'premium' ? '⭐' : '🔓'} {acc.type}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{acc.addedAt}</span>
                </div>
                {acc.uuid && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-mono text-xs text-muted-foreground truncate max-w-[120px]">{acc.uuid}</span>
                    <button onClick={() => copyUUID(acc.uuid!)} className="text-muted-foreground hover:text-primary transition-colors">
                      {copied === acc.uuid ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                {!acc.active && (
                  <button onClick={() => setActive(acc.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-primary/20 border border-primary/30 text-primary font-mono text-xs hover:bg-primary/30 transition-all">
                    <Star className="w-3 h-3" />
                    USE
                  </button>
                )}
                {acc.active && (
                  <span className="px-2 py-1 rounded bg-primary text-primary-foreground font-mono text-xs">ACTIVE</span>
                )}
                <button onClick={() => deleteAccount(acc.id)}
                  className="flex items-center gap-1 px-2 py-1 rounded border border-destructive/30 text-destructive font-mono text-xs hover:bg-destructive/10 transition-all">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-muted-foreground font-mono text-sm">
            No {tab} accounts added yet
          </div>
        )}
      </div>
    </div>
  )
}
