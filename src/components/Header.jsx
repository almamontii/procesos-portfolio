import YearsNav from './YearsNav.jsx'

export default function Header({ activeYear, onYearChange, years }) {
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
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: '300',
          fontSize: '10px',
          letterSpacing: '0.05em',
          color: '#000',
          paddingTop: '2px',
        }}
      >
        Based in Argentina, Buenos Aires
      </span>
      <YearsNav activeYear={activeYear} onYearChange={onYearChange} years={years} />
    </header>
  )
}
