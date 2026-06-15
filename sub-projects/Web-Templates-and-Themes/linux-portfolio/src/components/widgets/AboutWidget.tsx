"use client"
import { useState } from 'react'
import { Terminal, Settings, Cpu, Layers, Keyboard, Palette, CloudRain, Shield, Info, ChevronRight, Play } from 'lucide-react'

export default function AboutWidget() {
  const [activeTab, setActiveTab] = useState('keybinds')

  const sidebarItems = [
    { id: 'system', label: 'System', icon: <Terminal size={14} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
    { id: 'resources', label: 'Resources', icon: <Cpu size={14} /> },
    { id: 'modules', label: 'Modules', icon: <Layers size={14} /> },
    { id: 'keybinds', label: 'Keybinds', icon: <Keyboard size={14} /> },
    { id: 'matugen', label: 'Matugen', icon: <Palette size={14} /> },
    { id: 'weather', label: 'Weather', icon: <CloudRain size={14} /> },
    { id: 'greeter', label: 'Greeter', icon: <Shield size={14} /> },
    { id: 'about', label: 'About', icon: <Info size={14} /> },
  ]

  const keybinds = [
    { key: 'ALT + TAB', desc: 'Window Switcher', key2: 'SUPER + C', desc2: 'Clipboard History' },
    { key: 'SUPER + F', desc: 'Open Firefox', key2: 'SUPER + E', desc2: 'Open Nautilus' },
    { key: 'ALT + F4', desc: 'Close Active Window/W...', key2: 'SUPER+SHIFT + F', desc2: 'Toggle Floating' },
    { key: 'SUPER + L', desc: 'Lock Screen', key2: 'PRINT', desc2: 'Screenshot' },
    { key: 'SHIFT + PRINT', desc: 'Screenshot (Edit)', key2: 'ALT+SHIFT', desc2: 'Switch Keyboard Layout' },
    { key: 'SUPER + W', desc: 'Toggle Wallpaper Pick...', key2: 'SUPER + Q', desc2: 'Toggle Music Widget' },
    { key: 'SUPER + B', desc: 'Toggle Battery Widget', key2: 'SUPER + S', desc2: 'Toggle Calendar Widget' },
    { key: 'SUPER + N', desc: 'Toggle Network Widget', key2: 'SUPER + V', desc2: 'Toggle Volume Widget' },
    { key: 'SUPER + M', desc: 'Toggle Monitors Widget', key2: 'SUPER+SHIFT + T', desc2: 'Toggle FocusTime' },
    { key: 'SUPER+SHIFT + S', desc: 'Toggle Stewart AI', key2: 'SUPER + A', desc2: 'Toggle SwayNC Panel' },
    { key: 'SUPER + SPACE', desc: 'Play/Pause Media', key2: 'MEDIA + Play/Pause', desc2: 'Play/Pause Media' },
  ]

  return (
    <div className="flex h-full text-slate-300">
      {/* Sidebar */}
      <div className="w-[200px] border-r border-white/5 bg-black/20 p-4 flex flex-col gap-1">
        <div className="flex items-center gap-3 mb-8 px-2 mt-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">A</div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-white">Imperative</span>
            <span className="text-[10px] text-slate-500 font-mono">v...</span>
          </div>
        </div>

        {sidebarItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-accent/10 text-accent border border-accent/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div className="mt-auto pt-4">
          <button className="w-full flex items-center justify-center py-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 border border-white/5">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'keybinds' ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-2">Navigation & Control</h1>
            <p className="text-xs text-slate-400 mb-8 font-mono">Click any row below to instantly execute the keybind command.</p>

            <div className="flex flex-col gap-1.5">
              {keybinds.map((kb, i) => (
                <div key={i} className="flex gap-4 p-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                  <div className="flex-1 flex items-center gap-4">
                    <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-accent border border-white/5 min-w-[80px] text-center">{kb.key}</span>
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{kb.desc}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <span className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-accent border border-white/5 min-w-[80px] text-center">{kb.key2}</span>
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{kb.desc2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-50">
            <h1 className="text-2xl font-semibold text-white mb-2 capitalize">{activeTab}</h1>
            <p className="text-xs text-slate-400 font-mono">Select Keybinds to see the showcase.</p>
          </div>
        )}
      </div>
    </div>
  )
}
