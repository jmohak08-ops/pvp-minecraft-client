import { useState } from 'react'
import { Monitor, Volume2, Keyboard, Cpu, Palette } from 'lucide-react'

type SettingSection = 'video' | 'audio' | 'keybinds' | 'client' | 'theme'

const keybinds = [
  { action: 'Sprint', key: 'W' },
  { action: 'Jump', key: 'SPACE' },
  { action: 'Attack', key: 'LMB' },
  { action: 'Use Item', key: 'RMB' },
  { action: 'Drop Item', key: 'Q' },
  { action: 'Inventory', key: 'E' },
  { action: 'Toggle Client Menu', key: 'RSHIFT' },
  { action: 'Toggle Mods', key: 'F6' },
  { action: 'Toggle HUD', key: 'F7' },
  { action: 'Screenshot', key: 'F2' },
  { action: 'Zoom', key: 'C' },
]

function Slider({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-secondary-foreground w-36 shrink-0">{label}</span>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 h-1 appearance-none bg-border rounded-full accent-primary cursor-pointer"
      />
      <span className="font-mono text-xs text-primary w-14 text-right shrink-0">{value}{unit}</span>
    </div>
  )
}

function Toggle({ label, value, onChange, desc }: { label: string; value: boolean; onChange: (v: boolean) => void; desc?: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <div className="font-mono text-xs text-foreground">{label}</div>
        {desc && <div className="font-mono text-xs text-muted-foreground">{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-all ${value ? 'bg-primary glow-green' : 'bg-secondary border border-border'}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const [section, setSection] = useState<SettingSection>('video')
  const [rebinding, setRebinding] = useState<string | null>(null)
  const [keys, setKeys] = useState(keybinds)

  // Video
  const [fps, setFps] = useState(244)
  const [renderDist, setRenderDist] = useState(8)
  const [fov, setFov] = useState(90)
  const [gamma, setGamma] = useState(100)
  const [guiScale, setGuiScale] = useState(2)
  const [vsync, setVsync] = useState(false)
  const [smooth, setSmooth] = useState(false)
  const [particles, setParticles] = useState(false)
  const [antialiasing, setAntialiasing] = useState(false)

  // Audio
  const [master, setMaster] = useState(70)
  const [music, setMusic] = useState(0)
  const [sound, setSound] = useState(80)
  const [ambient, setAmbient] = useState(30)
  const [hitSounds, setHitSounds] = useState(true)
  const [customPitch, setCustomPitch] = useState(false)

  // Client
  const [showWatermark, setShowWatermark] = useState(true)
  const [notification, setNotification] = useState(true)
  const [freelook, setFreelook] = useState(false)
  const [noclip, setNoclip] = useState(false)
  const [debugInfo, setDebugInfo] = useState(false)

  const sections: { id: SettingSection; icon: typeof Monitor; label: string }[] = [
    { id: 'video', icon: Monitor, label: 'Video' },
    { id: 'audio', icon: Volume2, label: 'Audio' },
    { id: 'keybinds', icon: Keyboard, label: 'Keybinds' },
    { id: 'client', icon: Cpu, label: 'Client' },
    { id: 'theme', icon: Palette, label: 'Theme' },
  ]

  return (
    <div className="flex gap-4 animate-fade-in">
      {/* Sidebar */}
      <div className="w-36 shrink-0">
        <div className="rounded-lg pixel-border overflow-hidden" style={{ background: 'hsl(222 40% 7%)' }}>
          {sections.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 font-mono text-xs transition-all ${section === id ? 'nav-active' : 'text-muted-foreground hover:text-foreground border-l-2 border-transparent'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 rounded-lg pixel-border p-5" style={{ background: 'hsl(222 40% 7%)' }}>
        {section === 'video' && (
          <div className="flex flex-col gap-4">
            <h2 className="font-minecraft text-sm text-primary tracking-wider">VIDEO SETTINGS</h2>
            <div className="flex flex-col gap-3">
              <Slider label="Max FPS" value={fps} min={30} max={500} unit=" fps" onChange={setFps} />
              <Slider label="Render Distance" value={renderDist} min={2} max={32} unit=" chunks" onChange={setRenderDist} />
              <Slider label="FOV" value={fov} min={60} max={110} unit="°" onChange={setFov} />
              <Slider label="Brightness" value={gamma} min={0} max={100} unit="%" onChange={setGamma} />
              <Slider label="GUI Scale" value={guiScale} min={1} max={4} onChange={setGuiScale} />
            </div>
            <div className="border-t border-border pt-3 flex flex-col gap-2">
              <Toggle label="VSync" value={vsync} onChange={setVsync} desc="Cap FPS to monitor refresh rate" />
              <Toggle label="Smooth Lighting" value={smooth} onChange={setSmooth} />
              <Toggle label="Fancy Particles" value={particles} onChange={setParticles} desc="Can impact FPS" />
              <Toggle label="Anti-aliasing" value={antialiasing} onChange={setAntialiasing} desc="Smooth edges (FPS cost)" />
            </div>
          </div>
        )}

        {section === 'audio' && (
          <div className="flex flex-col gap-4">
            <h2 className="font-minecraft text-sm text-primary tracking-wider">AUDIO SETTINGS</h2>
            <div className="flex flex-col gap-3">
              <Slider label="Master Volume" value={master} min={0} max={100} unit="%" onChange={setMaster} />
              <Slider label="Music" value={music} min={0} max={100} unit="%" onChange={setMusic} />
              <Slider label="Sound Effects" value={sound} min={0} max={100} unit="%" onChange={setSound} />
              <Slider label="Ambient / Cave" value={ambient} min={0} max={100} unit="%" onChange={setAmbient} />
            </div>
            <div className="border-t border-border pt-3 flex flex-col gap-2">
              <Toggle label="Custom Hit Sounds" value={hitSounds} onChange={setHitSounds} desc="Play custom sound on hit" />
              <Toggle label="Custom Pitch" value={customPitch} onChange={setCustomPitch} desc="Randomize hit sound pitch" />
            </div>
          </div>
        )}

        {section === 'keybinds' && (
          <div className="flex flex-col gap-3">
            <h2 className="font-minecraft text-sm text-primary tracking-wider">KEYBINDS</h2>
            <p className="font-mono text-xs text-muted-foreground">Click a key to rebind it</p>
            <div className="flex flex-col gap-1.5">
              {keys.map((k, i) => (
                <div key={k.action} className="flex items-center justify-between p-2 rounded border border-border/40 hover:border-border transition-colors">
                  <span className="font-mono text-xs text-foreground">{k.action}</span>
                  <button
                    onClick={() => setRebinding(rebinding === k.action ? null : k.action)}
                    onKeyDown={e => {
                      if (rebinding !== k.action) return
                      e.preventDefault()
                      const newKey = e.key === ' ' ? 'SPACE' : e.key.toUpperCase()
                      setKeys(prev => prev.map((kb, j) => j === i ? { ...kb, key: newKey } : kb))
                      setRebinding(null)
                    }}
                    className={`font-mono text-xs px-3 py-1 rounded border transition-all min-w-[60px] text-center ${rebinding === k.action
                      ? 'border-primary bg-primary/20 text-primary animate-pulse'
                      : 'border-border text-secondary-foreground hover:border-primary/50'
                    }`}
                  >
                    {rebinding === k.action ? '...' : k.key}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'client' && (
          <div className="flex flex-col gap-4">
            <h2 className="font-minecraft text-sm text-primary tracking-wider">CLIENT SETTINGS</h2>
            <div className="flex flex-col gap-2">
              <Toggle label="Watermark" value={showWatermark} onChange={setShowWatermark} desc="Show VoidClient watermark in game" />
              <Toggle label="Mod Notifications" value={notification} onChange={setNotification} desc="Toast alerts when mods toggle" />
              <Toggle label="Freelook" value={freelook} onChange={setFreelook} desc="Look around without moving cursor" />
              <Toggle label="NoClip (Spectator)" value={noclip} onChange={setNoclip} desc="Phase through blocks" />
              <Toggle label="Debug Info" value={debugInfo} onChange={setDebugInfo} desc="Show F3 style debug overlay" />
            </div>
          </div>
        )}

        {section === 'theme' && (
          <div className="flex flex-col gap-4">
            <h2 className="font-minecraft text-sm text-primary tracking-wider">CLIENT THEME</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'VoidGreen', primary: '#16a34a', active: true },
                { name: 'SkyBlue', primary: '#2563eb', active: false },
                { name: 'BloodRed', primary: '#dc2626', active: false },
                { name: 'PurpleRain', primary: '#9333ea', active: false },
                { name: 'GoldPvP', primary: '#d97706', active: false },
                { name: 'IceWhite', primary: '#94a3b8', active: false },
              ].map(t => (
                <div key={t.name}
                  className={`p-3 rounded border cursor-pointer transition-all flex items-center gap-2 ${t.active ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}>
                  <div className="w-5 h-5 rounded-full border border-black/20" style={{ background: t.primary }} />
                  <span className={`font-mono text-xs ${t.active ? 'text-primary' : 'text-foreground'}`}>{t.name}</span>
                  {t.active && <span className="ml-auto font-mono text-xs text-primary">ACTIVE</span>}
                </div>
              ))}
            </div>
            <div className="text-xs font-mono text-muted-foreground pt-2">
              More themes coming in v2.5
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
