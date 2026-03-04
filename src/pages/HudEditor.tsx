import { useState, useRef, useCallback } from 'react'
import { RotateCcw, Eye, EyeOff, Lock, Unlock } from 'lucide-react'

type HudEl = {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
  visible: boolean
  color: string
  preview: () => React.ReactNode
}

const defaultEls: HudEl[] = [
  {
    id: 'fps', label: 'FPS Counter', x: 4, y: 4, w: 80, h: 28, visible: true, color: '#4ade80',
    preview: () => <span className="font-mono text-xs" style={{ color: '#4ade80' }}>FPS: 244</span>
  },
  {
    id: 'cps', label: 'CPS Counter', x: 4, y: 36, w: 90, h: 28, visible: true, color: '#4ade80',
    preview: () => <span className="font-mono text-xs" style={{ color: '#4ade80' }}>CPS: 12 | 9</span>
  },
  {
    id: 'health', label: 'Health Bar', x: 100, y: 300, w: 180, h: 32, visible: true, color: '#ef4444',
    preview: () => (
      <div className="w-full h-full flex items-center gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-3 h-3 flex-shrink-0" style={{ color: i < 8 ? '#ef4444' : '#555' }}>❤</div>
        ))}
      </div>
    )
  },
  {
    id: 'armor', label: 'Armor Bar', x: 100, y: 268, w: 180, h: 28, visible: true, color: '#60a5fa',
    preview: () => (
      <div className="w-full h-full flex items-center gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-3 h-3 flex-shrink-0 text-xs" style={{ color: i < 9 ? '#60a5fa' : '#555' }}>🛡</div>
        ))}
      </div>
    )
  },
  {
    id: 'hotbar', label: 'Hotbar', x: 140, y: 340, w: 300, h: 40, visible: true, color: '#a1a1aa',
    preview: () => (
      <div className="flex gap-0.5 h-full items-center">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`w-8 h-8 border flex items-center justify-center text-xs font-mono ${i === 0 ? 'border-white bg-white/10' : 'border-gray-600 bg-black/30'}`} style={{ color: '#a1a1aa' }}>
            {i === 0 ? '⚔' : i === 1 ? '🍗' : ''}
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'coords', label: 'Coordinates', x: 4, y: 68, w: 140, h: 50, visible: true, color: '#facc15',
    preview: () => (
      <div className="font-mono text-xs leading-4" style={{ color: '#facc15' }}>
        <div>X: 1204</div>
        <div>Y: 64</div>
        <div>Z: -892</div>
      </div>
    )
  },
  {
    id: 'ping', label: 'Ping', x: 4, y: 122, w: 70, h: 22, visible: true, color: '#4ade80',
    preview: () => <span className="font-mono text-xs" style={{ color: '#4ade80' }}>42ms</span>
  },
  {
    id: 'potions', label: 'Potion Effects', x: 520, y: 4, w: 110, h: 80, visible: true, color: '#a78bfa',
    preview: () => (
      <div className="font-mono text-xs leading-5" style={{ color: '#a78bfa' }}>
        <div>Speed II (1:20)</div>
        <div>Strength I (0:45)</div>
      </div>
    )
  },
  {
    id: 'crosshair', label: 'Crosshair', x: 290, y: 188, w: 20, h: 20, visible: true, color: '#ffffff',
    preview: () => <div className="w-full h-full flex items-center justify-center text-white font-bold">+</div>
  },
]

export default function HudEditor() {
  const [elements, setElements] = useState<HudEl[]>(defaultEls)
  const [selected, setSelected] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ id: string; startX: number; startY: number; elX: number; elY: number } | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    if (locked) return
    e.preventDefault()
    setSelected(id)
    const el = elements.find(el => el.id === id)!
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, elX: el.x, elY: el.y }

    const onMove = (me: MouseEvent) => {
      if (!dragRef.current || !canvasRef.current) return
      const canvas = canvasRef.current.getBoundingClientRect()
      const dx = me.clientX - dragRef.current.startX
      const dy = me.clientY - dragRef.current.startY
      const newX = Math.max(0, Math.min(canvas.width - 10, dragRef.current.elX + dx))
      const newY = Math.max(0, Math.min(canvas.height - 10, dragRef.current.elY + dy))
      setElements(prev => prev.map(el => el.id === dragRef.current!.id ? { ...el, x: newX, y: newY } : el))
    }
    const onUp = () => {
      dragRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [elements, locked])

  const toggleVisible = (id: string) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, visible: !el.visible } : el))
  }

  const resetLayout = () => {
    setElements(defaultEls)
    setSelected(null)
  }

  const selectedEl = elements.find(el => el.id === selected)

  return (
    <div className="flex flex-col gap-4 h-full animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-minecraft text-lg text-primary tracking-wider">HUD EDITOR</h1>
          <p className="text-xs text-muted-foreground font-mono">Drag elements to reposition</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setLocked(!locked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs border transition-all ${locked ? 'border-destructive text-destructive' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
            {locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            {locked ? 'LOCKED' : 'LOCK'}
          </button>
          <button onClick={resetLayout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all">
            <RotateCcw className="w-3 h-3" />
            RESET
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Canvas */}
        <div className="flex-1 relative rounded-lg pixel-border overflow-hidden"
          style={{ background: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=60") center/cover no-repeat', minHeight: '440px' }}>
          <div className="absolute inset-0 bg-black/50" />
          <div ref={canvasRef} className="absolute inset-0">
            {elements.filter(el => el.visible).map(el => (
              <div
                key={el.id}
                className={`absolute hud-element p-1 rounded transition-all ${selected === el.id ? 'ring-1 ring-primary/70 bg-black/40' : 'hover:bg-black/30'}`}
                style={{ left: el.x, top: el.y, width: el.w, height: el.h }}
                onMouseDown={e => handleMouseDown(e, el.id)}
              >
                {el.preview()}
                {selected === el.id && (
                  <div className="absolute -top-4 left-0 bg-primary text-primary-foreground font-mono text-[9px] px-1 py-0.5 rounded whitespace-nowrap">
                    {el.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="w-52 flex flex-col gap-2 overflow-y-auto">
          <div className="rounded-lg pixel-border p-3" style={{ background: 'hsl(222 40% 7%)' }}>
            <h3 className="font-minecraft text-xs text-muted-foreground mb-2 tracking-wider">ELEMENTS</h3>
            <div className="flex flex-col gap-1">
              {elements.map(el => (
                <div
                  key={el.id}
                  className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-all ${selected === el.id ? 'bg-primary/15 border border-primary/40' : 'hover:bg-secondary/40 border border-transparent'}`}
                  onClick={() => setSelected(el.id)}
                >
                  <span className={`font-mono text-xs ${el.visible ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                    {el.label}
                  </span>
                  <button onClick={e => { e.stopPropagation(); toggleVisible(el.id) }} className="text-muted-foreground hover:text-foreground transition-colors">
                    {el.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {selectedEl && (
            <div className="rounded-lg pixel-border p-3" style={{ background: 'hsl(222 40% 7%)' }}>
              <h3 className="font-minecraft text-xs text-primary mb-2 tracking-wider">{selectedEl.label}</h3>
              <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>X</span><span className="text-foreground">{Math.round(selectedEl.x)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Y</span><span className="text-foreground">{Math.round(selectedEl.y)}</span>
                </div>
                <div className="flex justify-between">
                  <span>W</span><span className="text-foreground">{selectedEl.w}px</span>
                </div>
                <div className="flex justify-between">
                  <span>H</span><span className="text-foreground">{selectedEl.h}px</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Visible</span>
                  <button
                    onClick={() => toggleVisible(selectedEl.id)}
                    className={`w-7 h-3.5 rounded-full transition-all ${selectedEl.visible ? 'bg-primary' : 'bg-secondary border border-border'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-all mt-[1px] ${selectedEl.visible ? 'ml-[14px]' : 'ml-[1px]'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
