export const artworks = [
  {
    id: 1,
    year: 2026,
    title: "Fragmentos I",
    technique: "Óleo sobre tela",
    dimensions: "80 × 80 cm",
    description: "Una exploración de la memoria fragmentada y los espacios que habitamos sin saberlo. La pintura surge de capas superpuestas, cada una ocultando y revelando partes de la anterior.",
    image: "/images/obra-1.jpg"
  },
  {
    id: 2,
    year: 2026,
    title: "Umbral",
    technique: "Acrílico sobre tela",
    dimensions: "100 × 70 cm",
    description: "El umbral como metáfora del paso entre estados. Los bordes difusos y las transiciones cromáticas invitan a detenerse en el espacio intermedio, ese lugar sin nombre entre lo que fue y lo que será.",
    image: "/images/obra-2.jpg"
  },
  {
    id: 3,
    year: 2026,
    title: "Materia Blanda",
    technique: "Técnica mixta sobre papel",
    dimensions: "60 × 60 cm",
    description: "Lo que parece sólido tiene una consistencia maleable. Esta obra trabaja con la contradicción entre apariencia y textura, entre lo que vemos y lo que tocamos.",
    image: "/images/obra-3.jpg"
  },
  {
    id: 4,
    year: 2026,
    title: "Residuo",
    technique: "Óleo sobre cartón",
    dimensions: "40 × 40 cm",
    description: "Lo que queda después del proceso. El residuo no como descarte sino como esencia, como la parte más honesta de cualquier práctica artística.",
    image: "/images/obra-4.jpg"
  },
]

export const years = [...new Set(artworks.map(a => a.year))].sort((a, b) => b - a)
