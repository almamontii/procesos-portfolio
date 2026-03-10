import ArtworkCard from './ArtworkCard.jsx'

export default function ArtworkGrid({ artworks, activeYear, onArtworkClick }) {
  const filtered = artworks.filter(a => a.year === activeYear)

  if (filtered.length === 0) {
    return (
      <div
        style={{
          paddingRight: '80px',
          paddingTop: '40px',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: 'var(--text-primary)',
        }}
      >
        No hay obras registradas para {activeYear}.
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        paddingRight: '80px',
      }}
    >
      {filtered.map(artwork => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onClick={onArtworkClick}
        />
      ))}
    </div>
  )
}
