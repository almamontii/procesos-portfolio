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
  {
    id: 5,
    year: 2025,
    title: "Serie Azul I",
    technique: "Acrílico sobre tela",
    dimensions: "90 × 90 cm",
    description: "Primera obra de una serie exploratoria sobre el color azul y sus connotaciones emocionales en la cultura rioplatense.",
    image: "/images/obra-5.jpg"
  },
  {
    id: 6,
    year: 2025,
    title: "Palimpsesto",
    technique: "Óleo sobre tela",
    dimensions: "120 × 80 cm",
    description: "Capas de escritura sobre escritura, imagen sobre imagen. El palimpsesto como método y como metáfora de la memoria colectiva.",
    image: "/images/obra-6.jpg"
  },
  {
    id: 7,
    year: 2025,
    title: "Campo Abierto",
    technique: "Técnica mixta",
    dimensions: "100 × 100 cm",
    description: "La pampa como fondo psicológico. El horizonte infinito y la soledad luminosa del paisaje argentino.",
    image: "/images/obra-7.jpg"
  },
  {
    id: 8,
    year: 2024,
    title: "Interior I",
    technique: "Óleo sobre tela",
    dimensions: "70 × 50 cm",
    description: "El primero de una serie de interiores imaginarios, espacios que podrían existir pero no existen.",
    image: "/images/obra-8.jpg"
  },
]

export const years = [...new Set(artworks.map(a => a.year))].sort((a, b) => b - a)
