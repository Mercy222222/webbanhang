"use client"
import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) return <span>--:--</span>

  return (
    <span>
      {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      <span className="mx-2 opacity-50">|</span>
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
    </span>
  )
}
