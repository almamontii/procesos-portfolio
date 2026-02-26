import { supabase, BUCKET } from './supabase.js'

/**
 * Sube una imagen al bucket 'artworks' en Supabase Storage.
 * Devuelve la URL pública o null si falla / no hay Supabase.
 */
export async function uploadImage(file) {
  if (!supabase) return null

  const ext = file.name.split('.').pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('Error subiendo imagen:', error.message)
    return null
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Elimina una imagen del bucket dado su URL pública.
 */
export async function deleteImage(publicUrl) {
  if (!supabase || !publicUrl) return

  // Extraer el path relativo dentro del bucket
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return

  const path = publicUrl.slice(idx + marker.length)
  await supabase.storage.from(BUCKET).remove([path])
}
