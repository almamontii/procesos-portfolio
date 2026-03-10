import YearsNav from './YearsNav.jsx'

export default function Header({ activeYear, onYearChange, years, darkMode, onToggleDark }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingRight: '80px',
        marginBottom: '48px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: '300',
            fontSize: '10px',
            letterSpacing: '0.05em',
            color: 'var(--text-primary)',
            paddingTop: '2px',
          }}
        >
          Based in Argentina, Buenos Aires
        </span>
        <button
          onClick={onToggleDark}
          style={{
            background: 'none',
            border: '1px solid var(--text-secondary)',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: 'var(--text-primary)',
            transition: 'all 0.3s ease',
            padding: 0,
          }}
          title={darkMode ? 'Modo claro' : 'Modo oscuro'}
        >
          {darkMode ? '\u2600' : '\u25CF'}
        </button>
      </div>
      <YearsNav activeYear={activeYear} onYearChange={onYearChange} years={years} />
    </header>
  )
}
