"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useDesktopStore } from '@/store/useDesktopStore'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function DraggableWindow({ id, children }: { id: string, children: React.ReactNode }) {
  const { windows, focusWindow, closeWindow, toggleMaximize, updateWindowPosition, focusedWindowId } = useDesktopStore()
  const windowData = windows[id]
  const isFocused = focusedWindowId === id
  
  const windowRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })

  // GSAP Entrance Animation
  useGSAP(() => {
    if (windowRef.current && windowData.isOpen && !windowData.isMinimized) {
      gsap.fromTo(windowRef.current, 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", clearProps: "transform" }
      )
    }
  }, [windowData.isOpen, windowData.isMinimized])

  // Drag logic
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    focusWindow(id)
    if (windowData.isMaximized) return
    isDragging.current = true
    dragStart.current = { 
      x: e.clientX - windowData.position.x, 
      y: e.clientY - windowData.position.y 
    }
    // Set pointer capture to ensure smooth dragging even if pointer leaves element
    const target = e.target as HTMLElement
    if (target.setPointerCapture) target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || windowData.isMaximized) return
    const newX = e.clientX - dragStart.current.x
    const newY = e.clientY - dragStart.current.y
    updateWindowPosition(id, { x: newX, y: newY })
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    const target = e.target as HTMLElement
    if (target.releasePointerCapture) target.releasePointerCapture(e.pointerId)
  }

  if (!windowData || !windowData.isOpen) return null

  const displayStyle: React.CSSProperties = windowData.isMaximized 
    ? {
        top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%',
        zIndex: windowData.zIndex,
        position: 'fixed'
      }
    : {
        width: windowData.size.width,
        height: windowData.size.height,
        left: windowData.position.x,
        top: windowData.position.y,
        zIndex: windowData.zIndex,
        position: 'absolute',
        display: windowData.isMinimized ? 'none' : 'flex'
      }

  return (
    <div
      ref={windowRef}
      onPointerDown={() => focusWindow(id)}
      style={displayStyle}
      className={cn(
        "flex flex-col rounded-xl overflow-hidden glass-panel shadow-2xl ring-1 ring-white/10",
        isFocused && "glass-panel-active ring-[var(--color-accent)]/50",
        windowData.isMaximized && "rounded-none ring-0"
      )}
    >
      {/* Subtle Window Controls (Hover to see) */}
      <div 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={(e) => { e.stopPropagation(); toggleMaximize(id) }}
        className="absolute top-0 left-0 right-0 h-6 z-50 cursor-grab active:cursor-grabbing flex justify-end items-center px-3 opacity-0 hover:opacity-100 transition-opacity bg-black/20"
      >
        <button 
          onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking close
          onClick={(e) => { e.stopPropagation(); closeWindow(id) }}
          className="text-slate-400 hover:text-red-400 bg-black/50 rounded-full p-1 transition-colors hover:shadow-[0_0_10px_rgba(248,113,113,0.5)]"
        >
          <X size={12} />
        </button>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-[#11111b]/80 relative backdrop-blur-3xl rounded-xl border border-[var(--panel-border)]">
        {children}
      </div>
    </div>
  )
}
