import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ artwork, onClose }) {
  useEffect(() => {
    if (!artwork) return
    const handleKey = e => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [artwork, onClose])

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(245, 245, 240, 0.96)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          {/* Inner container — stops click propagation */}
          <motion.div
            key="lightbox-content"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '900px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Top meta */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '300',
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#888',
                }}
              >
                Colecciones del {artwork.year}
              </span>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: '300',
                  color: '#888',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Cerrar ×
              </button>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '30px',
                fontWeight: '400',
                color: '#1a1a1a',
                lineHeight: '1.1',
              }}
            >
              {artwork.title}
            </h2>

            {/* Image + vertical technique */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <motion.img
                src={artwork.image}
                alt={artwork.title}
                style={{
                  flex: '1',
                  maxHeight: '480px',
                  width: '100%',
                  objectFit: 'contain',
                  backgroundColor: '#ddd',
                  display: 'block',
                }}
                onError={e => {
                  e.target.style.minHeight = '300px'
                  e.target.style.backgroundColor = '#c8c8c0'
                }}
              />

              {/* Vertical technique + dimensions */}
              <div
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '300',
                  fontSize: '13px',
                  color: '#555',
                  lineHeight: '1.5',
                  flexShrink: 0,
                  alignSelf: 'stretch',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingBottom: '4px',
                }}
              >
                {artwork.technique} — {artwork.dimensions}
              </div>
            </div>

            {/* Description */}
            <div
              style={{
                maxHeight: '120px',
                overflowY: 'auto',
                paddingRight: '8px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '13px',
                  lineHeight: '1.75',
                  color: '#333',
                  fontWeight: '400',
                }}
              >
                {artwork.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
