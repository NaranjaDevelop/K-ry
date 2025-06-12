import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from os.path import join, dirname
from supabase import Client, create_client


app = Flask(__name__)
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
ultrasecretkey = os.environ.get("SUPABASEKEY_PY")
ultrasecreturl = os.environ.get("SUPABASEURL_PY")
supabase: Client = create_client("https://icabjgwodrysbrwrraxg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYWJqZ3dvZHJ5c2Jyd3JyYXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODAyNzMsImV4cCI6MjA2MzQ1NjI3M30.580CcYX4GCffjdRZgRy1xs4Hz-69zY-Zvj9TjPxtn90")


CORS(app)


df = pd.read_csv(r'Music.csv', on_bad_lines='skip', low_memory=False)

df.columns = df.columns.str.strip().str.replace(';', '')
df["track_genre"] = df["track_genre"].str.replace(';', '') 

# Ensure numeric columns are of float type
for col in ['danceability', 'energy', 'instrumentalness', 'speechiness', 'tempo']:
    df[col] = pd.to_numeric(df[col], errors='coerce')


def recommend_songs(df , user_danceability, user_energy, user_genre, user_instrumentalness, user_speechiness, user_tempo, user_loudness, user_valence, user_explicit, top_n=10):
    # Filter by multiple genres
    user_genres = [genres.strip().lower() for genres in user_genre.split(',')]
    genre_filtered = df[df['track_genre'].isin(user_genres)].copy()
    if genre_filtered.empty:
        genre_filtered = df.copy()

    if genre_filtered['explicit'].dtype != bool:
        genre_filtered['explicit'] = genre_filtered['explicit'].astype(str).str.lower().map({'true': True, 'false': False, '1': True, '0': False})

    genre_filtered = genre_filtered[genre_filtered['explicit'] == user_explicit]

    genre_filtered['score'] = (
        (genre_filtered['danceability'] - user_danceability).abs() +
        (genre_filtered['energy'] - user_energy).abs() +
        (genre_filtered['speechiness'] - user_speechiness).abs() +
        (genre_filtered['instrumentalness'] - user_instrumentalness).abs() +
        (genre_filtered['tempo'] - user_tempo).abs() +
        (genre_filtered['loudness'] - user_loudness).abs() +
        (genre_filtered['valence'] - user_valence).abs()
    )

    recommendations = genre_filtered.sort_values('score').head(top_n)
    return recommendations

# ejemplo de datos de usuario
# user_loudness = -10
# user_tempo = 120.0  
# user_speechiness = 0.9
# user_danceability = 0.4
# user_energy = 0.6,
# user_valence = 0.3
# user_instrumentalness = 0.7
# user_genre = 'spanish,pop,rock'
# user_explicit = False  

@app.route('/', methods=['GET'])
def getuser():
    return "<p>Hello, World!</p>"
    


@app.route('/Newuser', methods=['POST'])
def postuser():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    userrecommended = recommend_songs(
        df,
        data['data']['user_danceability'],
        data['data']['user_energy'],
        data['data']['user_genre'],
        data['data']['user_instrumentalness'],
        data['data']['user_speechiness'],
        data['data']['user_tempo'],
        data['data']['user_loudness'],
        data['data']['user_valence'],
        data['data']['user_explicit']
    )
    return jsonify(userrecommended.to_dict(orient='records'), data['data']), 200
    



app.run()