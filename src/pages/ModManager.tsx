import { useState } from 'react'
import { ChevronDown, ChevronRight, Settings2 } from 'lucide-react'

type Mod = {
  id: string
  name: string
  desc: string
  enabled: boolean
  category: string
  settings?: { label: string; type: 'slider' | 'toggle' | 'select'; value: number | boolean | string; min?: number; max?: number; step?: number; options?: string[] }[]
}

const initialMods: Mod[] = [
  // Combat
  { id: 'killaura', name: 'KillAura', desc: 'Auto-attacks nearby entities within range', enabled: false, category: 'Combat',
    settings: [
      { label: 'Range', type: 'slider', value: 3.5, min: 2, max: 6, step: 0.1 },
      { label: 'Rotations', type: 'toggle', value: true },
      { label: 'Mode', type: 'select', value: 'Single', options: ['Single', 'Switch', 'Multi'] },
      { label: 'Speed', type: 'slider', value: 12, min: 1, max: 20, step: 1 },
    ]
  },
  { id: 'autoclicker', name: 'AutoClicker', desc: 'Automatically clicks at a set CPS rate', enabled: true, category: 'Combat',
    settings: [
      { label: 'Min CPS', type: 'slider', value: 10, min: 1, max: 20, step: 1 },
      { label: 'Max CPS', type: 'slider', value: 14, min: 1, max: 20, step: 1 },
      { label: 'Right Click', type: 'toggle', value: false },
    ]
  },
  { id: 'reach', name: 'Reach', desc: 'Extends your attack reach beyond normal', enabled: true, category: 'Combat',
    settings: [
      { label: 'Extra Reach', type: 'slider', value: 0.5, min: 0.1, max: 3.0, step: 0.1 },
      { label: 'Randomize', type: 'toggle', value: true },
    ]
  },
  { id: 'velocity', name: 'Velocity', desc: 'Reduces knockback taken from hits', enabled: false, category: 'Combat',
    settings: [
      { label: 'Horizontal %', type: 'slider', value: 50, min: 0, max: 100, step: 5 },
      { label: 'Vertical %', type: 'slider', value: 80, min: 0, max: 100, step: 5 },
    ]
  },
  { id: 'criticals', name: 'Criticals', desc: 'Forces critical hits on every attack', enabled: false, category: 'Combat',
    settings: [
      { label: 'Mode', type: 'select', value: 'Jump', options: ['Jump', 'Packet', 'NoGround'] },
    ]
  },
  // Movement
  { id: 'sprint', name: 'ToggleSprint', desc: 'Automatically keeps you sprinting', enabled: true, category: 'Movement',
    settings: [
      { label: 'Always Sprint', type: 'toggle', value: true },
      { label: 'Sneak Override', type: 'toggle', value: false },
    ]
  },
  { id: 'speed', name: 'Speed', desc: 'Increases movement speed', enabled: false, category: 'Movement',
    settings: [
      { label: 'Speed', type: 'slider', value: 1.3, min: 1.0, max: 3.0, step: 0.05 },
      { label: 'Mode', type: 'select', value: 'Strafe', options: ['Strafe', 'Legit', 'Custom'] },
    ]
  },
  { id: 'bhopper', name: 'BHop', desc: 'Automatically bunny hops for speed', enabled: false, category: 'Movement',
    settings: [
      { label: 'Mode', type: 'select', value: 'Legit', options: ['Legit', 'Other'] },
    ]
  },
  // Visual
  { id: 'xray', name: 'Xray', desc: 'See through blocks to find ores and players', enabled: false, category: 'Visual',
    settings: [
      { label: 'Show Ores', type: 'toggle', value: true },
      { label: 'Show Players', type: 'toggle', value: false },
    ]
  },
  { id: 'esp', name: 'ESP', desc: 'Highlights players through walls', enabled: false, category: 'Visual',
    settings: [
      { label: 'Mode', type: 'select', value: 'Box', options: ['Box', '2D', 'Corner'] },
      { label: 'Tracers', type: 'toggle', value: true },
      { label: 'Health Bar', type: 'toggle', value: true },
    ]
  },
  { id: 'nametags', name: 'NameTags', desc: 'Always shows player name tags', enabled: true, category: 'Visual',
    settings: [
      { label: 'Scale', type: 'slider', value: 1.5, min: 0.5, max: 3.0, step: 0.1 },
      { label: 'Ping', type: 'toggle', value: true },
    ]
  },
  { id: 'fullbright', name: 'FullBright', desc: 'Maximum brightness everywhere', enabled: true, category: 'Visual' },
  // Misc
  { id: 'freecam', name: 'FreeCam', desc: 'Fly your camera around freely', enabled: false, category: 'Misc' },
  { id: 'fastreplace', name: 'FastPlace', desc: 'Instantly place blocks without delay', enabled: false, category: 'Misc',
    settings: [
      { label: 'Delay', type: 'slider', value: 0, min: 0, max: 5, step: 1 },
    ]
  },
  { id: 'antiblind', name: 'AntiBlind', desc: 'Removes blindness and darkness effects', enabled: true, category: 'Misc' },
]

const categories = ['All', 'Combat', 'Movement', 'Visual', 'Misc']

export default function ModManager() {
  const [mods, setMods] = useState<Mod[]>(initialMods)
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggleMod = (id: string) => {
    setMods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m))
  }

  const updateSetting = (modId: string, label: string, val: number | boolean | string) => {
    setMods(prev => prev.map(m => {
      if (m.id !== modId) return m
      return {
        ...m,
        settings: m.settings?.map(s => s.label === label ? { ...s, value: val } : s)
      }
    }))
  }

  const filtered = filter === 'All' ? mods : mods.filter(m => m.category === filter)

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-minecraft text-lg text-primary tracking-wider">MOD MANAGER</h1>
          <p className="text-xs text-muted-foreground font-mono">{mods.filter(m => m.enabled).length} mods active</p>
        </div>
        <div className="flex gap-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded font-mono text-xs transition-all ${filter === cat
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filtered.map(mod => (
          <div
            key={mod.id}
            className={`rounded-lg pixel-border transition-all ${mod.enabled ? 'mod-enabled' : ''}`}
            style={{ background: 'hsl(222 40% 7%)' }}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setExpanded(expanded === mod.id ? null : mod.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {mod.settings ? (
                    expanded === mod.id
                      ? <ChevronDown className="w-3.5 h-3.5" />
                      : <ChevronRight className="w-3.5 h-3.5" />
                  ) : (
                    <Settings2 className="w-3.5 h-3.5 opacity-30" />
                  )}
                </button>
                <div>
                  <div className={`font-mono text-sm font-semibold ${mod.enabled ? 'text-primary' : 'text-foreground'}`}>
                    {mod.name}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">{mod.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${mod.enabled ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                  {mod.category}
                </span>
                {/* Toggle */}
                <button
                  onClick={() => toggleMod(mod.id)}
                  className={`relative w-10 h-5 rounded-full transition-all ${mod.enabled ? 'bg-primary glow-green' : 'bg-secondary border border-border'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${mod.enabled ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            {expanded === mod.id && mod.settings && (
              <div className="px-4 pb-3 flex flex-col gap-3 border-t border-border/50 pt-3">
                {mod.settings.map(setting => (
                  <div key={setting.label} className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-secondary-foreground w-28 shrink-0">{setting.label}</span>
                    {setting.type === 'slider' && typeof setting.value === 'number' && (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="range"
                          min={setting.min}
                          max={setting.max}
                          step={setting.step}
                          value={setting.value}
                          onChange={e => updateSetting(mod.id, setting.label, parseFloat(e.target.value))}
                          className="flex-1 h-1 appearance-none bg-border rounded-full accent-primary cursor-pointer"
                        />
                        <span className="font-mono text-xs text-primary w-10 text-right">{setting.value}</span>
                      </div>
                    )}
                    {setting.type === 'toggle' && typeof setting.value === 'boolean' && (
                      <button
                        onClick={() => updateSetting(mod.id, setting.label, !setting.value)}
                        className={`relative w-8 h-4 rounded-full transition-all shrink-0 ${setting.value ? 'bg-primary' : 'bg-secondary border border-border'}`}
                      >
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${setting.value ? 'left-4' : 'left-0.5'}`} />
                      </button>
                    )}
                    {setting.type === 'select' && (
                      <select
                        value={setting.value as string}
                        onChange={e => updateSetting(mod.id, setting.label, e.target.value)}
                        className="bg-secondary border border-border rounded px-2 py-0.5 font-mono text-xs text-foreground focus:outline-none focus:border-primary cursor-pointer"
                      >
                        {setting.options?.map(o => <option key={o}>{o}</option>)}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
