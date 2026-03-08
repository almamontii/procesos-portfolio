import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { artworks, years } from './data/artworks.js'
import Header from './components/Header.jsx'
import HeroText from './components/HeroText.jsx'
import SidebarName from './components/SidebarName.jsx'
import ArtworkGrid from './components/ArtworkGrid.jsx'
import Lightbox from './components/Lightbox.jsx'

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [activeYear, setActiveYear] = useState(years[0] ?? new Date().getFullYear())

  const handleCloseLightbox = useCallback(() => setSelectedArtwork(null), [])

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
      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          initial={{ x: 48, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -48, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArtworkGrid
            artworks={artworks}
            activeYear={activeYear}
            onArtworkClick={setSelectedArtwork}
          />
        </motion.div>
      </AnimatePresence>
      <SidebarName />
      <Lightbox artwork={selectedArtwork} onClose={handleCloseLightbox} />
    </div>
  )
}
