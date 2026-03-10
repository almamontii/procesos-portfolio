export default function YearsNav({ activeYear, onYearChange, years }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '13px',
          fontWeight: '400',
          color: '#000',
          marginRight: '4px',
        }}
      >
        Years
      </span>
      {years.map(year => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            fontWeight: activeYear === year ? '500' : '400',
            color: activeYear === year ? 'var(--color-red)' : '#1a1a1a',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => {
            if (activeYear !== year) e.target.style.color = 'var(--color-red)'
          }}
          onMouseLeave={e => {
            if (activeYear !== year) e.target.style.color = '#1a1a1a'
          }}
        >
          {year}
        </button>
      ))}
    </div>
  )
}
