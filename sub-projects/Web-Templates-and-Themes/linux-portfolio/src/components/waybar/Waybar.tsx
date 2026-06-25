"use client"
import { useState, useEffect } from 'react'
import { Wifi, Volume2, Battery, Power, Play, Pause, SkipBack, SkipForward, Search, Navigation, Send, CloudRain } from 'lucide-react'
import { useDesktopStore } from '@/store/useDesktopStore'
import { cn } from '@/lib/utils'

export default function Waybar() {
  const { activeWorkspace, setActiveWorkspace, isPlayingAudio, toggleAudio, currentTrackIndex, nextTrack, prevTrack } = useDesktopStore()
  
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
    }
    updateTime()
    const int = setInterval(updateTime, 1000)
    return () => clearInterval(int)
  }, [])

  return (
    <div className="fixed top-3 left-4 right-4 z-50 flex items-start justify-between font-mono select-none">
      
      {/* LEFT MODULE */}
      <div className="flex gap-4 items-center">
        {/* Search */}
        <div className="h-8 w-8 rounded-full bg-[#11111b]/80 backdrop-blur-md border border-white/5 flex items-center justify-center text-slate-400 cursor-pointer hover:text-white transition-colors">
          <Search size={14} />
        </div>

        {/* Workspaces */}
        <div className="h-8 rounded-full bg-[#11111b]/80 backdrop-blur-md border border-white/5 px-2 flex gap-1 items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <button 
              key={num}
              onClick={() => setActiveWorkspace(num)}
              className={cn(
                "w-6 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300",
                activeWorkspace === num 
                  ? "bg-accent text-[#11111b]" 
                  : "hover:bg-white/10 text-slate-400"
              )}
            >
              {num}
            </button>
          ))}
        </div>
        
        {/* Media Player */}
        <div className="h-8 rounded-full bg-[#11111b]/80 backdrop-blur-md border border-white/5 px-4 flex items-center gap-3 text-[#cdd6f4]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-wider truncate max-w-[150px] uppercase opacity-90 font-semibold text-accent">
              LONOWN, riserayss - worry (Slowed)
            </span>
          </div>
          <span className="opacity-30 mx-1">|</span>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[9px] opacity-60">00:51 / 01:21</span>
            <button onClick={prevTrack} className="hover:text-accent transition-colors"><SkipBack size={12} fill="currentColor" /></button>
            <button onClick={toggleAudio} className="hover:text-accent transition-colors">
              {isPlayingAudio ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
            </button>
            <button onClick={nextTrack} className="hover:text-accent transition-colors"><SkipForward size={12} fill="currentColor" /></button>
          </div>
        </div>
      </div>

      {/* CENTER MODULE */}
      <div className="flex gap-4 items-center">
        {/* Clock & Date */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-accent font-bold text-sm tracking-widest">{time}</span>
          <span className="text-[9px] text-slate-400 uppercase tracking-wider">{date}</span>
        </div>
        {/* Weather */}
        <div className="flex items-center gap-1.5 text-accent text-xs font-semibold">
          <CloudRain size={14} /> 7.7°C
        </div>
      </div>

      {/* RIGHT MODULE */}
      <div className="flex gap-4 items-center">
        {/* Social / Lang */}
        <div className="flex gap-3 items-center text-accent">
          <Send size={12} className="cursor-pointer" />
          <Navigation size={12} className="cursor-pointer" />
          <span className="h-4 w-6 bg-white/10 text-[9px] flex items-center justify-center rounded uppercase text-slate-300">en</span>
        </div>

        {/* System Stats */}
        <div className="h-8 rounded-full bg-[#11111b]/80 backdrop-blur-md border border-white/5 flex items-center text-[10px] font-semibold text-[#cdd6f4] overflow-hidden">
          <div className="px-3 py-2 bg-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-1.5 border-r border-white/5">
            <Wifi size={12} className="text-accent" /> Fibernet-IA...
          </div>
          <div className="px-3 py-2 bg-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-1.5 border-r border-white/5">
             <span className="text-accent text-xs">B</span> JBL Tune 72...
          </div>
          <div className="px-3 py-2 bg-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-1.5 border-r border-white/5">
            <Battery size={12} className="text-accent" /> 54%
          </div>
          <div className="px-3 py-2 bg-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-1.5">
            <Volume2 size={12} className="text-accent" /> 100%
          </div>
        </div>

        {/* Power */}
        <button className="h-8 w-8 rounded-full bg-[#11111b]/80 backdrop-blur-md border border-white/5 flex items-center justify-center text-accent hover:bg-red-500/20 hover:text-red-400 transition-colors">
          <Power size={14} />
        </button>
      </div>

    </div>
  )
}
