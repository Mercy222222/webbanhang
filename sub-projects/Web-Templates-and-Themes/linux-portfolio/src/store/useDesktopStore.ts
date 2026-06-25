import { create } from 'zustand'

export type WindowData = {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
  componentName: string
}

export type Theme = 'default' | 'nord' | 'gruvbox' | 'cyberpunk'

interface DesktopState {
  activeWorkspace: number
  setActiveWorkspace: (id: number) => void
  windows: Record<string, WindowData>
  focusedWindowId: string | null
  openWindow: (id: string, initialData?: Partial<WindowData>) => void
  closeWindow: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  isPlayingAudio: boolean
  toggleAudio: () => void
  currentTrackIndex: number
  nextTrack: () => void
  prevTrack: () => void
}

const INITIAL_WINDOWS: Record<string, WindowData> = {
  hero: {
    id: 'hero',
    title: 'Node Map',
    isOpen: false, // Hide hero by default
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 100, y: 100 },
    size: { width: 800, height: 500 },
    componentName: 'HeroWidget'
  },
  about: {
    id: 'about',
    title: 'Navigation & Control',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 150, y: 100 },
    size: { width: 850, height: 500 },
    componentName: 'AboutWidget'
  },
  projects: {
    id: 'projects',
    title: 'Theme Selector',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 150 },
    size: { width: 900, height: 550 },
    componentName: 'ProjectsWidget'
  },
  activity: {
    id: 'activity',
    title: 'Interactive Modules',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 250, y: 200 },
    size: { width: 800, height: 500 },
    componentName: 'ActivityWidget'
  }
}

let nextZIndex = 100

export const useDesktopStore = create<DesktopState>((set) => ({
  activeWorkspace: 1,
  setActiveWorkspace: (id) => set({ activeWorkspace: id }),
  windows: INITIAL_WINDOWS,
  focusedWindowId: 'hero',
  theme: 'default',
  setTheme: (theme) => set({ theme }),
  isPlayingAudio: false,
  toggleAudio: () => set((state) => ({ isPlayingAudio: !state.isPlayingAudio })),
  currentTrackIndex: 0,
  nextTrack: () => set((state) => ({ currentTrackIndex: state.currentTrackIndex + 1 })),
  prevTrack: () => set((state) => ({ currentTrackIndex: Math.max(0, state.currentTrackIndex - 1) })),
  openWindow: (id, initialData) => set((state) => {
    const w = state.windows[id]
    if (!w) return state // Ignore if undefined
    nextZIndex++
    return {
      windows: {
        ...state.windows,
        [id]: { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex, ...initialData }
      },
      focusedWindowId: id
    }
  }),
  closeWindow: (id) => set((state) => {
    const w = state.windows[id]
    if (!w) return state
    return {
      windows: { ...state.windows, [id]: { ...w, isOpen: false } },
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
    }
  }),
  toggleMinimize: (id) => set((state) => {
    const w = state.windows[id]
    if (!w) return state
    return {
      windows: { ...state.windows, [id]: { ...w, isMinimized: !w.isMinimized } },
      focusedWindowId: !w.isMinimized && state.focusedWindowId === id ? null : state.focusedWindowId
    }
  }),
  toggleMaximize: (id) => set((state) => {
    const w = state.windows[id]
    if (!w) return state
    nextZIndex++
    return {
      windows: { ...state.windows, [id]: { ...w, isMaximized: !w.isMaximized, zIndex: nextZIndex } },
      focusedWindowId: id
    }
  }),
  focusWindow: (id) => set((state) => {
    if (state.focusedWindowId === id) return state
    nextZIndex++
    const w = state.windows[id]
    if (!w) return state
    return {
      windows: { ...state.windows, [id]: { ...w, zIndex: nextZIndex, isMinimized: false } },
      focusedWindowId: id
    }
  }),
  updateWindowPosition: (id, position) => set((state) => {
    const w = state.windows[id]
    if (!w) return state
    return {
      windows: { ...state.windows, [id]: { ...w, position } }
    }
  })
}))
