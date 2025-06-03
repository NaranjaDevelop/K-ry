import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS 
from dotenv import load_dotenv
import os
from os.path import join, dirname
import json
import supabase
from supabase import Client, create_client


app = Flask(__name__)
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
ultrasecretkey = os.environ.get("SUPABASEKEY_PY")
ultrasecreturl = os.environ.get("SUPABASEURL_PY")
supabase: Client = create_client(ultrasecreturl, ultrasecretkey)



@app.route("/")
def hello_world():
    
    return "<p>Hello, World!</p>"

CORS(app)


df = pd.read_csv(r'd:\stikers\STIKRY\pytestKry\Music.csv', on_bad_lines='skip', low_memory=False)


df.columns = df.columns.str.strip().str.replace(';', '')
df["track_genre"] = df["track_genre"].str.replace(';', '')

# Ensure numeric columns are of float type
for col in ['danceability', 'energy', 'instrumentalness', 'speechiness', 'tempo']:
    df[col] = pd.to_numeric(df[col], errors='coerce')


def recommend_songs(df, user_danceability, user_energy, user_genre, user_instrumentalness,user_speechiness,user_tempo, top_n=10):
    # Filter by multiple genres
    user_genres = [genres.strip().lower() for genres in user_genre.split(',')]
    genre_filtered = df[df['track_genre'].isin(user_genres)].copy()
    if genre_filtered.empty:
        genre_filtered = df.copy() 

    
    genre_filtered['score'] = ((genre_filtered['danceability'] - user_danceability).abs() + (genre_filtered['energy'] - user_energy).abs() + (genre_filtered['instrumentalness'] - user_instrumentalness).abs() + (genre_filtered['speechiness'] - user_speechiness).abs() + (genre_filtered['tempo'] - user_tempo).abs())

    
    recommendations = genre_filtered.sort_values('score').head(top_n)
    return recommendations

user_tempo = 0.5
user_speechiness = 0.9
user_danceability = 0.4
user_energy = 0.6
user_instrumentalness = 0.7
user_genre = 'spanish,pop,rock'  
recommended = recommend_songs(df, user_danceability, user_energy, user_genre,user_instrumentalness, user_speechiness, user_tempo)
print("Recommended songs:")
print(recommended["track_name"])
print(recommended["artists"])



@app.route('/names', methods=['GET'])
def getnames():
    listrecomended = recommended.to_dict(orient='records')
    return(jsonify(listrecomended), 200)

@app.route('/Newuser', methods=['POST'])
def postuser():
    data = request.get_json()
    print(data['data']['user_genre'])
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    userrecommended = recommend_songs(
        df,
        data['data']['user_danceability'],
        data['data']['user_energy'],
        data['data']['user_genre'],
        data['data']['user_instrumentalness'],
        data['data']['user_speechiness'],
        data['data']['user_tempo']
    )
    
    return jsonify(userrecommended.to_dict(orient='records'), data['data']), 200
    
    
    
app.run(debug=True)