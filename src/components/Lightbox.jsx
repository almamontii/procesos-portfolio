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
        <>
          {/* Backdrop — click cierra */}
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              zIndex: 100,
            }}
          />

          {/* Panel lateral derecho */}
          <motion.div
            key="lightbox-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: '65%',
              backgroundColor: '#f5f5f0',
              zIndex: 101,
              overflowY: 'auto',
              padding: '40px 48px',
              boxShadow: '-24px 0 48px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '32px',
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

            {/* Título */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '30px',
                fontWeight: '400',
                color: '#1a1a1a',
                lineHeight: '1.1',
                marginBottom: '24px',
              }}
            >
              {artwork.title}
            </h2>

            {/* Imagen + técnica vertical */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
              <img
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

            {/* Descripción */}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
