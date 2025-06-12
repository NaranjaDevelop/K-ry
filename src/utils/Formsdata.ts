const dataform =  {
  "formulario": [
    {
      "id": 1,
      "seccion": "¿Qué tipo de música te hace sentir bien?",
      "pregunta": "1. Si tuvieras que elegir una vibra musical para acompañarte hoy, ¿cuál elegirías?",
      "asocia": ["valence", "track_genre"],
      "opciones": [
        { "texto": "Una canción feliz y energética para motivarme 🎉 🎉", "valence": 0.9, "track_genre": "pop" },
        { "texto": "Algo relajante y suave para calmarme 🌿", "valence": 0.4, "track_genre": "ambient" },
        { "texto": "Música intensa o emocional para liberar tensiones 💔", "valence": 0.2, "track_genre": "rock" },
        { "texto": "Solo quiero ritmo y flow para bailar 🕺", "valence": 0.8, "track_genre": "dance" }
      ]
    },
    {
      "id": 2,
      "seccion": "¿Cómo te gusta que suene una canción?",
      "pregunta": "2. ¿Qué te atrae más de una canción?",
      "asocia": ["danceability", "energy", "speechiness", "instrumentalness"],
      "opciones": [
        { "texto": "Que tenga buen ritmo para mover el cuerpo", "danceability": 0.9, "energy": 0.8 },
        { "texto": "Que tenga letras potentes o con mensaje", "speechiness": 0.8, "energy": 0.6 },
        { "texto": "Que sea instrumental, sin letra", "instrumentalness": 0.9, "speechiness": 0.1 },
        { "texto": "Que tenga sonidos suaves, como acústicos", "instrumentalness": 0.5, "energy": 0.3 }
      ]
    },
    {
      "id": 3,
      "pregunta": "3. ¿Qué tan animada o tranquila preferís que sea la música que escuchás?",
      "asocia": ["energy", "tempo", "loudness"],
      "opciones": [
        { "texto": "Muy animada y rápida", "energy": 0.9, "tempo": 140, "loudness": -4 },
        { "texto": "Intermedia, ni muy rápida ni muy lenta", "energy": 0.6, "tempo": 110, "loudness": -8 },
        { "texto": "Tranquila y suave", "energy": 0.3, "tempo": 90, "loudness": -12 },
        { "texto": "Muy relajada o casi ambiental", "energy": 0.1, "tempo": 60, "loudness": -20 }
      ]
    },
    {
      "id": 4,
      "pregunta": "4. ¿Preferís música cantada o sin voz?",
      "asocia": ["instrumentalness", "speechiness"],
      "opciones": [
        { "texto": "Siempre con voz", "instrumentalness": 0.0, "speechiness": 0.7 },
        { "texto": "Me gusta cuando hay mezcla de voz e instrumental", "instrumentalness": 0.5, "speechiness": 0.4 },
        { "texto": "Prefiero canciones sin letra (instrumentales)", "instrumentalness": 0.9, "speechiness": 0.1 }
      ]
    },
    {
      "id": 5,
      "seccion": "Tus hábitos musicales",
      "pregunta": "5. ¿Para qué usás más la música?",
      "asocia": ["energy", "tempo", "track_genre"],
      "opciones": [
        { "texto": "Para concentrarme o estudiar 📚", "energy": 0.2, "tempo": 70, "track_genre": "classical" },
        { "texto": "Para relajarme o dormir 😴", "energy": 0.1, "tempo": 60, "track_genre": "ambient" },
        { "texto": "Para hacer ejercicio 🏃‍♀️", "energy": 0.8, "tempo": 130, "track_genre": "electronic" },
        { "texto": "Para pasar el rato con amigos 🎉", "energy": 0.7, "tempo": 120, "track_genre": "latin" }
      ]
    },
    {
      "id": 6,
      "pregunta": "6. ¿Te molesta que las canciones tengan lenguaje explícito (groserías, etc.)?",
      "asocia": ["explicit"],
      "opciones": [
        { "texto": "Sí, prefiero evitarlas", "explicit": false },
        { "texto": "No me importa", "explicit": true },
        { "texto": "Depende de la canción", "explicit": true }
      ]
    }
  ]
}
export default dataform