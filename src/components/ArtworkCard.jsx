import { useState } from 'react'

export default function ArtworkCard({ artwork, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onClick(artwork)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--bg-placeholder)',
      }}
    >
      <img
        src={artwork.image}
        alt={artwork.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.4s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
        onError={e => {
          e.target.style.display = 'none'
          e.target.parentElement.style.backgroundColor = '#c8c8c0'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '16px',
            fontWeight: '400',
            color: '#fff',
            textAlign: 'center',
            padding: '0 16px',
            letterSpacing: '0.02em',
            textTransform: 'capitalize',
          }}
        >
          {artwork.title}
        </span>
      </div>
    </div>
  )
}
