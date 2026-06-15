"use client"
import React, { useEffect } from 'react'
import { useDesktopStore } from '@/store/useDesktopStore'
import Waybar from '@/components/waybar/Waybar'
import DraggableWindow from '@/components/windows/DraggableWindow'
import BlackHole from '@/components/desktop/BlackHole'

// Import widgets
import HeroWidget from '@/components/widgets/HeroWidget'
import AboutWidget from '@/components/widgets/AboutWidget'
import ProjectsWidget from '@/components/widgets/ProjectsWidget'
import ActivityWidget from '@/components/widgets/ActivityWidget'

const componentMap: Record<string, React.FC> = {
  HeroWidget,
  AboutWidget,
  ProjectsWidget,
  ActivityWidget
}

export default function DesktopEnvironment() {
  const { windows, activeWorkspace, openWindow, theme, isPlayingAudio, currentTrackIndex, nextTrack } = useDesktopStore()

  // Simulate workspace switching by conditionally rendering or moving windows
  // In a real desktop, each workspace has its own set of windows.
  // Here we'll just show the windows that correspond to the active workspace.
  // We mock this by auto-opening the widget associated with the workspace number when switched.
  
  useEffect(() => {
    if (activeWorkspace === 1) openWindow('hero')
    if (activeWorkspace === 2) openWindow('about')
    if (activeWorkspace === 3) openWindow('projects')
    if (activeWorkspace === 4) openWindow('activity')
  }, [activeWorkspace, openWindow])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Lofi Playlist
  const playlist = [
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    "https://cdn.pixabay.com/download/audio/2022/04/27/audio_e0d71cb369.mp3?filename=the-beat-of-nature-122841.mp3",
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b1dc6a91.mp3?filename=lofi-chill-medium-version-108709.mp3"
  ]

  const audioRef = React.useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.play().catch(e => console.log('Autoplay blocked', e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlayingAudio, currentTrackIndex])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <BlackHole />
      <audio 
        ref={audioRef} 
        src={playlist[currentTrackIndex % playlist.length]} 
        onEnded={nextTrack}
        preload="auto"
      />
      <Waybar />
      
      {/* Desktop Area where windows live */}
      <div className="absolute top-12 left-0 right-0 bottom-0 p-4">
        {Object.values(windows).map((win) => {
          const WidgetComponent = componentMap[win.componentName]
          if (!WidgetComponent) return null
          
          return (
            <DraggableWindow key={win.id} id={win.id}>
              <WidgetComponent />
            </DraggableWindow>
          )
        })}
      </div>
    </div>
  )
}
