export default function HeroText() {
  return (
    <div style={{ marginBottom: '48px', paddingRight: '80px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: '300',
          fontSize: '60px',
          lineHeight: '1',
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
          marginBottom: '12px',
        }}
      >
        PROCESOs
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: '300',
          fontSize: '13px',
          lineHeight: '1.6',
          color: '#555',
          maxWidth: '480px',
        }}
      >
        Un catálogo progresivo de obra. Pintura, técnica mixta y exploración
        material ordenada por año. Cada serie es parte de un proceso continuo
        de investigación plástica.
      </p>
    </div>
  )
}
