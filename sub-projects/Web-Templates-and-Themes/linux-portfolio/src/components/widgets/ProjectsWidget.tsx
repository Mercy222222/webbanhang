"use client"
import { useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useDesktopStore } from '@/store/useDesktopStore'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ProjectsWidget() {
  const { theme, setTheme } = useDesktopStore()
  
  const themes = [
    { id: 'default', color: 'bg-black', name: 'Dark Space' },
    { id: 'nord', color: 'bg-[#2e3440]', name: 'Nord' },
    { id: 'gruvbox', color: 'bg-[#282828]', name: 'Gruvbox' },
    { id: 'cyberpunk', color: 'bg-[#0f0f1c]', name: 'Cyberpunk' },
    { id: 'catppuccin', color: 'bg-[#1e1e2e]', name: 'Catppuccin' },
    { id: 'dracula', color: 'bg-[#282a36]', name: 'Dracula' },
    { id: 'tokyo', color: 'bg-[#1a1b26]', name: 'Tokyo Night' },
  ]

  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.theme-card')
    const currentIndex = themes.findIndex(th => th.id === theme) || 0

    cards.forEach((card, i) => {
      const offset = i - currentIndex
      const isCenter = offset === 0

      let rotateY = offset * -25
      let z = Math.abs(offset) * -100
      let scale = 1 - Math.abs(offset) * 0.15
      let x = offset * 60

      gsap.to(card, {
        rotateY,
        z,
        scale,
        x,
        opacity: 1 - Math.abs(offset) * 0.2,
        duration: 0.8,
        ease: "power3.out"
      })
    })
  }, [theme])

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden bg-[#0a0a0f]">
      
      {/* Search Bar */}
      <div className="absolute top-8 flex items-center bg-[#11111b]/80 border border-white/10 rounded-full px-4 py-2 w-96 backdrop-blur-md z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <span className="text-xs text-slate-400 mr-4">Search P...</span>
        <div className="flex gap-2 flex-1 items-center justify-center">
          {themes.map((t) => (
            <button 
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`w-6 h-6 rounded-full border-2 ${theme === t.id ? 'border-accent shadow-[0_0_15px_var(--color-accent)]' : 'border-transparent hover:border-white/20'} ${t.color} transition-all duration-300`}
              title={t.name}
            />
          ))}
        </div>
        <Search size={14} className="text-slate-400 ml-4" />
      </div>

      {/* Coverflow */}
      <div ref={containerRef} className="w-full flex items-center justify-center gap-4 mt-8 perspective-[1500px] h-[400px]">
        {themes.map((t, i) => {
          const currentIndex = themes.findIndex(th => th.id === theme) || 0
          const isCenter = i === currentIndex
          
          return (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`theme-card absolute w-[200px] h-[340px] cursor-pointer rounded-xl border shadow-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-800 to-[#000] ${isCenter ? 'border-accent/80' : 'border-white/5 hover:border-white/20'}`}
              style={{ transformStyle: 'preserve-3d', zIndex: 50 - Math.abs(i - currentIndex) }}
            >
              {/* Abstract representation of the wallpaper */}
              <div className={`absolute inset-0 opacity-40 ${t.color}`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="z-10 text-center transform translate-z-10">
                 <div className={`w-20 h-20 rounded-full mx-auto mb-6 border-2 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] ${t.color}`}></div>
                 <span className={`text-base font-bold ${isCenter ? 'text-white' : 'text-slate-400'} tracking-widest uppercase drop-shadow-lg`}>{t.name}</span>
              </div>
              
              {isCenter && (
                <div className="absolute inset-0 border-2 border-accent rounded-xl pointer-events-none shadow-[inset_0_0_30px_var(--color-accent)] mix-blend-screen"></div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
