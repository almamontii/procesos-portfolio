import { useState } from 'react'
import { uploadImage, deleteImage } from '../lib/storage.js'
import { supabase } from '../lib/supabase.js'

// Años desde 2026 en adelante
const START_YEAR = 2026
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from(
  { length: Math.max(CURRENT_YEAR - START_YEAR + 3, 3) },
  (_, i) => START_YEAR + i
)

const EMPTY_FORM = {
  year: CURRENT_YEAR >= START_YEAR ? CURRENT_YEAR : START_YEAR,
  title: '',
  technique: '',
  dimensions: '',
  description: '',
  imageFile: null,
  imagePreview: null,
}

const S = {
  label: {
    fontFamily: 'var(--font-sans)',
    fontWeight: '300',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#888',
    display: 'block',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontFamily: 'var(--font-sans)',
    fontWeight: '300',
    fontSize: '13px',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    color: '#1a1a1a',
    outline: 'none',
  },
}

function Field({ label, children }) {
  return (
    <div>
      <span style={S.label}>{label}</span>
      {children}
    </div>
  )
}

export default function AdminPanel({ artworks, onAddArtwork, onDeleteArtwork }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('add')
  const [form, setForm] = useState(EMPTY_FORM)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleImage = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = evt =>
      setForm(f => ({ ...f, imageFile: file, imagePreview: evt.target.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title.trim()) return
    setUploading(true)
    setError(null)

    let imageUrl = ''

    if (form.imageFile) {
      if (supabase) {
        imageUrl = await uploadImage(form.imageFile)
        if (!imageUrl) {
          setError('No se pudo subir la imagen. Revisá las credenciales de Supabase.')
          setUploading(false)
          return
        }
      } else {
        // Sin Supabase: usar data URL como fallback temporal
        imageUrl = form.imagePreview
      }
    }

    onAddArtwork({
      id: Date.now(),
      year: Number(form.year),
      title: form.title.trim(),
      technique: form.technique.trim(),
      dimensions: form.dimensions.trim(),
      description: form.description.trim(),
      image: imageUrl,
    })

    setForm(EMPTY_FORM)
    setUploading(false)
    setTab('manage')
  }

  const handleDelete = async artwork => {
    if (!confirm(`¿Eliminar "${artwork.title}"?`)) return
    if (supabase && artwork.image) await deleteImage(artwork.image)
    onDeleteArtwork(artwork.id)
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          background: '#1a1a1a',
          color: '#f5f5f0',
          border: 'none',
          padding: '10px 18px',
          fontFamily: 'var(--font-sans)',
          fontWeight: '300',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        {open ? '× Cerrar admin' : 'Admin'}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 200, display: 'flex', justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '420px', maxWidth: '95vw', height: '100vh',
              backgroundColor: '#f5f5f0', overflowY: 'auto',
              padding: '32px 28px', display: 'flex',
              flexDirection: 'column', gap: '24px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px' }}>
                Modo Admin
              </span>
              {!supabase && (
                <span style={{ fontSize: '11px', color: 'var(--color-red)', fontFamily: 'var(--font-sans)' }}>
                  Sin Supabase — modo local
                </span>
              )}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #ccc', paddingBottom: '12px' }}>
              {[['add', 'Agregar obra'], ['manage', 'Gestionar']].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: '300',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: tab === id ? '#1a1a1a' : '#aaa',
                    borderBottom: tab === id ? '1px solid #1a1a1a' : '1px solid transparent',
                    paddingBottom: '4px',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── ADD TAB ── */}
            {tab === 'add' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                {/* Image */}
                <Field label="Imagen">
                  <label
                    htmlFor="admin-image"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '100%', aspectRatio: '1', border: '1px dashed #bbb',
                      cursor: 'pointer', overflow: 'hidden', backgroundColor: '#e8e8e3',
                    }}
                  >
                    {form.imagePreview
                      ? <img src={form.imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#aaa', letterSpacing: '0.06em' }}>+ Seleccionar imagen</span>
                    }
                  </label>
                  <input id="admin-image" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                </Field>

                {/* Year */}
                <Field label="Año">
                  <select value={form.year} onChange={set('year')} style={{ ...S.input, appearance: 'none', cursor: 'pointer' }}>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </Field>

                {/* Title */}
                <Field label="Título *">
                  <input type="text" value={form.title} onChange={set('title')} placeholder="Fragmentos I" style={S.input} required />
                </Field>

                {/* Technique */}
                <Field label="Técnica">
                  <input type="text" value={form.technique} onChange={set('technique')} placeholder="Óleo sobre tela" style={S.input} />
                </Field>

                {/* Dimensions */}
                <Field label="Medidas">
                  <input type="text" value={form.dimensions} onChange={set('dimensions')} placeholder="80 × 80 cm" style={S.input} />
                </Field>

                {/* Description */}
                <Field label="Descripción">
                  <textarea
                    value={form.description}
                    onChange={set('description')}
                    placeholder="Texto sobre la obra, proceso, contexto..."
                    rows={6}
                    style={{ ...S.input, resize: 'vertical', lineHeight: '1.6', fontFamily: 'var(--font-serif)' }}
                  />
                </Field>

                {error && (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-red)' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={uploading || !form.title.trim()}
                  style={{
                    background: uploading || !form.title.trim() ? '#ccc' : '#1a1a1a',
                    color: '#f5f5f0', border: 'none', padding: '12px',
                    fontFamily: 'var(--font-sans)', fontWeight: '300', fontSize: '12px',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    cursor: uploading || !form.title.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  {uploading ? 'Subiendo...' : 'Agregar obra'}
                </button>
              </form>
            )}

            {/* ── MANAGE TAB ── */}
            {tab === 'manage' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {artworks.length === 0
                  ? <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#aaa' }}>No hay obras aún.</p>
                  : artworks.map(a => (
                      <div
                        key={a.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          padding: '10px', backgroundColor: '#eee',
                        }}
                      >
                        <div style={{ width: '48px', height: '48px', flexShrink: 0, backgroundColor: '#ddd', overflow: 'hidden' }}>
                          {a.image && <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {a.title}
                          </div>
                          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#888', marginTop: '2px' }}>
                            {a.year}{a.technique ? ` · ${a.technique}` : ''}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(a)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-red)', flexShrink: 0 }}
                        >
                          Eliminar
                        </button>
                      </div>
                    ))
                }
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
