"use client"
import { useRef } from 'react'
import { Terminal, Code2, Cpu, Database, Network } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function HeroWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    if (!containerRef.current) return
    const centralNode = containerRef.current.querySelector('.central-node')
    const nodes = containerRef.current.querySelectorAll('.peripheral-node')
    const lines = containerRef.current.querySelectorAll('.connection-line')

    // Central node pulse
    gsap.to(centralNode, {
      scale: 1.05,
      boxShadow: "0 0 80px var(--color-accent)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Peripheral nodes floating
    nodes.forEach((node, i) => {
      gsap.to(node, {
        y: "random(-10, 10)",
        x: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      })
    })

    // Lines glowing
    gsap.to(lines, {
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.2
    })
  }, [])

  return (
    <div ref={containerRef} className="h-full flex items-center justify-center p-8 relative overflow-hidden bg-[#050508]">
      
      {/* Central Node */}
      <div className="central-node absolute z-10 w-24 h-24 rounded-full bg-[#11111b] border-2 border-[var(--color-accent)] flex items-center justify-center shadow-[0_0_50px_rgba(250,179,135,0.4)] backdrop-blur-xl">
        <Terminal size={40} className="text-[var(--color-accent)]" />
      </div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" fill="none">
          {/* Top Left */}
          <path className="connection-line" d="M 380 250 L 250 120" />
          {/* Top Right */}
          <path className="connection-line" d="M 420 250 L 550 120" />
          {/* Bottom Left */}
          <path className="connection-line" d="M 380 250 L 250 380" />
          {/* Bottom Right */}
          <path className="connection-line" d="M 420 250 L 550 380" />
        </g>
      </svg>

      {/* Peripheral Nodes */}
      {/* Top Left */}
      <div className="peripheral-node absolute top-20 left-48 z-10 group cursor-pointer">
        <div className="w-14 h-14 rounded-full bg-[#11111b]/80 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:shadow-[0_0_20px_var(--color-accent)] group-hover:text-accent transition-all shadow-xl backdrop-blur-md">
          <Code2 size={24} />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">Frontend</div>
      </div>

      {/* Top Right */}
      <div className="peripheral-node absolute top-20 right-48 z-10 group cursor-pointer">
        <div className="w-14 h-14 rounded-full bg-[#11111b]/80 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:shadow-[0_0_20px_var(--color-accent)] group-hover:text-accent transition-all shadow-xl backdrop-blur-md">
          <Database size={24} />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">Backend</div>
      </div>

      {/* Bottom Left */}
      <div className="peripheral-node absolute bottom-20 left-48 z-10 group cursor-pointer">
        <div className="w-14 h-14 rounded-full bg-[#11111b]/80 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:shadow-[0_0_20px_var(--color-accent)] group-hover:text-accent transition-all shadow-xl backdrop-blur-md">
          <Cpu size={24} />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">Systems</div>
      </div>

      {/* Bottom Right */}
      <div className="peripheral-node absolute bottom-20 right-48 z-10 group cursor-pointer">
        <div className="w-14 h-14 rounded-full bg-[#11111b]/80 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:shadow-[0_0_20px_var(--color-accent)] group-hover:text-accent transition-all shadow-xl backdrop-blur-md">
          <Network size={24} />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">DevOps</div>
      </div>

    </div>
  )
}
