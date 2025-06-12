import starface from '../assets/Q1/starface.png'; import sad from '../assets/Q1/sad02.png'; import calm from '../assets/Q1/relieved01.png'; import cool from '../assets/Q1/sunglasses.png';
import angle from '../assets/Q2/angle.png'; import mute from '../assets/Q2/mute.png'; import singright from '../assets/Q2/singright.png'; 
import sleeping from '../assets/Q3/sleeping.png'; import smile from '../assets/Q3/smile.png'; import tongue from '../assets/Q3/tongue-wink-right.png'; import mused from '../assets/Q3/unamused.png';
import music from '../assets/Q4/music-note-01.png'; import shuffle from '../assets/Q4/shuffle.png';
import book from '../assets/Q5/book bookmark-02.png'; import dum from '../assets/Q5/dumbbell-01.png'; import group from '../assets/Q5/user-group.png';
import head from '../assets/Q6/headphone-mute.png'; import mutehead from '../assets/Q6/headphone-mute.png';;

const dataform =  {
  "formulario": [
    {
      "id": 1,
      "seccion": "¿Qué tipo de música te hace sentir bien?",
      "pregunta": "1. Si tuvieras que elegir una vibra musical para acompañarte hoy, ¿cuál elegirías?",
      "asocia": ["valence", "track_genre"],
      "opciones": [
        { "texto": "Una canción feliz y energética para motivarme 🎉 🎉", "valence": 0.9, "track_genre": "pop", "icon": starface },
        { "texto": "Algo relajante y suave para calmarme 🌿", "valence": 0.4, "track_genre": "ambient", "icon": sad },
        { "texto": "Música intensa o emocional para liberar tensiones 💔", "valence": 0.2, "track_genre": "rock", "icon": calm },
        { "texto": "Solo quiero ritmo y flow para bailar 🕺", "valence": 0.8, "track_genre": "dance", "icon": cool }
      ]
    },
    {
      "id": 2,
      "seccion": "¿Cómo te gusta que suene una canción?",
      "pregunta": "2. ¿Qué te atrae más de una canción?",
      "asocia": ["danceability", "energy", "speechiness", "instrumentalness"],
      "opciones": [
        { "texto": "Que tenga buen ritmo para mover el cuerpo", "danceability": 0.9, "energy": 0.8,"icon": cool },
        { "texto": "Que tenga letras potentes o con mensaje", "speechiness": 0.8, "energy": 0.6, "icon": singright },
        { "texto": "Que sea instrumental, sin letra", "instrumentalness": 0.9, "speechiness": 0.1 , "icon": mute},
        { "texto": "Que tenga sonidos suaves, como acústicos", "instrumentalness": 0.5, "energy": 0.3 , "icon": angle}
      ]
    },
    {
      "id": 3,
      "pregunta": "3. ¿Qué tan animada o tranquila preferís que sea la música que escuchás?",
      "asocia": ["energy", "tempo", "loudness"],
      "opciones": [
        { "texto": "Muy animada y rápida", "energy": 0.9, "tempo": 140, "loudness": -4 , "icon": tongue},
        { "texto": "Intermedia, ni muy rápida ni muy lenta", "energy": 0.6, "tempo": 110, "loudness": -8, "icon": smile },
        { "texto": "Tranquila y suave", "energy": 0.3, "tempo": 90, "loudness": -12, "icon": mused },
        { "texto": "Muy relajada o casi ambiental", "energy": 0.1, "tempo": 60, "loudness": -20 , "icon": sleeping}
      ]
    },
    {
      "id": 4,
      "pregunta": "4. ¿Preferís música cantada o sin voz?",
      "asocia": ["instrumentalness", "speechiness"],
      "opciones": [
        { "texto": "Siempre con voz", "instrumentalness": 0.0, "speechiness": 0.7, "icon": singright },
        { "texto": "Me gusta cuando hay mezcla de voz e instrumental", "instrumentalness": 0.5, "speechiness": 0.4, "icon": shuffle },
        { "texto": "Prefiero canciones sin letra (instrumentales)", "instrumentalness": 0.9, "speechiness": 0.1, "icon": music }
      ]
    },
    {
      "id": 5,
      "seccion": "Tus hábitos musicales",
      "pregunta": "5. ¿Para qué usás más la música?",
      "asocia": ["energy", "tempo", "track_genre"],
      "opciones": [
        { "texto": "Para concentrarme o estudiar 📚", "energy": 0.2, "tempo": 70, "track_genre": "classical", "icon": book },
        { "texto": "Para relajarme o dormir 😴", "energy": 0.1, "tempo": 60, "track_genre": "ambient" , "icon": sleeping},
        { "texto": "Para hacer ejercicio 🏃‍♀️", "energy": 0.8, "tempo": 130, "track_genre": "electronic", "icon": dum},
        { "texto": "Para pasar el rato con amigos 🎉", "energy": 0.7, "tempo": 120, "track_genre": "latin", "icon": group }
      ]
    },
    {
      "id": 6,
      "pregunta": "7. ¿Te molesta que las canciones tengan lenguaje explícito (groserías, etc.)?",
      "asocia": ["explicit"],
      "opciones": [
        { "texto": "Sí, prefiero evitarlas", "explicit": false,  "icon": mutehead },
        { "texto": "No me importa", "explicit": true , "icon": head },
        { "texto": "Depende de la canción", "explicit": true, "icon": mused }
      ]
    }
  ]
}
export default dataform