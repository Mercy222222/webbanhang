"use client"
import { useRef } from 'react'
import { Play, Calendar, Music, Battery, Wifi, ChevronLeft, ChevronRight, CloudRain } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ActivityWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.module-card')

    cards.forEach((card) => {
      const q = gsap.utils.selector(card)
      const glow = q('.glow-effect')

      card.addEventListener('mousemove', (e: any) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        // Tilt effect
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.4
        })

        // Glow effect
        gsap.to(glow, {
          x,
          y,
          opacity: 1,
          duration: 0.2
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          ease: "power2.out",
          duration: 0.6
        })
        gsap.to(glow, {
          opacity: 0,
          duration: 0.4
        })
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col h-full text-slate-300 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Interactive Modules</h1>
          <p className="text-xs text-slate-400 font-mono">Use arrow keys or select below to preview. Double-click or press Enter to toggle.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent rounded-full border border-accent/30 font-semibold text-xs hover:bg-accent/30 hover:shadow-[0_0_15px_var(--color-accent)] transition-all cursor-pointer">
          <Play size={12} fill="currentColor" /> PLAY
        </button>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-[#0a0a0f]/80 backdrop-blur-md rounded-xl border border-white/5 relative overflow-hidden mb-6 flex shadow-inner shadow-black/50">
        {/* Mocking the inner dashboard shown in the preview */}
        <div className="w-1/2 p-6 flex flex-col justify-between border-r border-white/5">
          {/* Calendar Mock */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <ChevronLeft size={16} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
              <span className="text-xs font-bold text-white tracking-widest">APRIL 2026</span>
              <ChevronRight size={16} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-slate-500 mb-2 font-mono">
              <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-300">
              <span className="opacity-30">30</span><span className="opacity-30">31</span>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(d => (
                <span key={d} className="cursor-pointer hover:text-white hover:font-bold transition-all">{d}</span>
              ))}
              <span className="bg-accent text-[#11111b] rounded-full w-6 h-6 flex items-center justify-center mx-auto shadow-[0_0_10px_var(--color-accent)] cursor-pointer">15</span>
              {[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(d => (
                <span key={d} className="cursor-pointer hover:text-white hover:font-bold transition-all">{d}</span>
              ))}
              <span className="opacity-30">1</span><span className="opacity-30">2</span><span className="opacity-30">3</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_5px_var(--color-accent)]"></span> Wednesday, 15 Apr (Tomorrow)
          </div>
        </div>

        <div className="w-1/2 p-6 flex flex-col items-center justify-center relative">
          <div className="absolute top-4 right-4 text-[10px] flex items-center gap-2 bg-white/5 px-2 py-1 rounded cursor-pointer hover:bg-white/10 transition-colors">
            <ChevronLeft size={12} /> TUESDAY <ChevronRight size={12} />
          </div>
          <div className="text-6xl font-bold text-white tracking-wider mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            23<span className="text-accent animate-pulse">:</span>17<span className="text-lg text-slate-500 ml-1">19</span>
          </div>
          <div className="text-xs text-slate-400 mb-8 tracking-widest uppercase">Tuesday, April 07</div>

          <div className="flex items-center gap-4 text-white">
            <CloudRain size={32} className="text-accent drop-shadow-[0_0_15px_var(--color-accent)]" />
            <div>
              <div className="text-3xl font-bold">11°</div>
              <div className="text-xs text-slate-400">Clear Sky</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-4 gap-4 perspective-[1000px]">
        <ModuleCard icon={<Calendar size={14} />} title="Calendar & Weather" desc="Dual-sync calendar with live OpenWeatherMap integration." active />
        <ModuleCard icon={<Music size={14} />} title="Media & Lyrics" desc="PlayerCtl integration, Cava visualizer, and live lyrics." />
        <ModuleCard icon={<Battery size={14} />} title="Battery & Power" desc="Uptime tracking, power profiles, and battery health metrics." />
        <ModuleCard icon={<Wifi size={14} />} title="Network Hub" desc="Wi-Fi and Bluetooth connect management via nmcli/bluez." />
      </div>
    </div>
  )
}

function ModuleCard({ icon, title, desc, active }: any) {
  return (
    <div className={`module-card relative p-4 rounded-xl border transition-colors cursor-pointer overflow-hidden ${active ? 'border-accent/50 bg-[#11111b] shadow-[0_5px_20px_rgba(250,179,135,0.15)]' : 'border-white/5 bg-[#11111b] hover:border-white/20'}`} style={{ transformStyle: 'preserve-3d' }}>
      {/* GSAP Glow element */}
      <div className="glow-effect absolute w-32 h-32 bg-accent/20 rounded-full blur-[30px] -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none mix-blend-screen"></div>
      
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className={`flex items-center gap-2 text-xs font-semibold mb-2 ${active ? 'text-accent' : 'text-white'}`}>
          {icon} {title}
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed font-mono">{desc}</p>
      </div>
    </div>
  )
}
