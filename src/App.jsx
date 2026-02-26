import { useState, useMemo } from 'react'
import { artworks as seedArtworks } from './data/artworks.js'
import Header from './components/Header.jsx'
import HeroText from './components/HeroText.jsx'
import SidebarName from './components/SidebarName.jsx'
import ArtworkGrid from './components/ArtworkGrid.jsx'
import Lightbox from './components/Lightbox.jsx'
import AdminPanel from './components/AdminPanel.jsx'

const STORAGE_KEY = 'procesos_artworks'

function loadArtworks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return null
}

function saveArtworks(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {}
}

export default function App() {
  const [artworks, setArtworks] = useState(() => loadArtworks() ?? seedArtworks)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  const years = useMemo(
    () => [...new Set(artworks.map(a => a.year))].sort((a, b) => b - a),
    [artworks]
  )

  const [activeYear, setActiveYear] = useState(() => {
    const list = loadArtworks() ?? seedArtworks
    const ys = [...new Set(list.map(a => a.year))].sort((a, b) => b - a)
    return ys[0] ?? new Date().getFullYear()
  })

  const handleAddArtwork = artwork => {
    const next = [artwork, ...artworks]
    setArtworks(next)
    saveArtworks(next)
    setActiveYear(artwork.year)
  }

  const handleDeleteArtwork = id => {
    const next = artworks.filter(a => a.id !== id)
    setArtworks(next)
    saveArtworks(next)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f0',
        padding: '32px 32px 80px 32px',
        position: 'relative',
      }}
    >
      <Header activeYear={activeYear} onYearChange={setActiveYear} years={years} />
      <HeroText />
      <ArtworkGrid
        artworks={artworks}
        activeYear={activeYear}
        onArtworkClick={setSelectedArtwork}
      />
      <SidebarName />
      <Lightbox artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      <AdminPanel
        artworks={artworks}
        onAddArtwork={handleAddArtwork}
        onDeleteArtwork={handleDeleteArtwork}
      />
    </div>
  )
}
