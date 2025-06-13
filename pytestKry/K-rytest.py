import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from os.path import join, dirname
from supabase import Client, create_client


app = Flask(__name__)
dotenv_path = join(dirname(__file__), '.env')
ultrasecretkey = os.environ.get("SUPABASEKEY_PY")
ultrasecreturl = os.environ.get("SUPABASEURL_PY")
supabase: Client = create_client("https://icabjgwodrysbrwrraxg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYWJqZ3dvZHJ5c2Jyd3JyYXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODAyNzMsImV4cCI6MjA2MzQ1NjI3M30.580CcYX4GCffjdRZgRy1xs4Hz-69zY-Zvj9TjPxtn90")


CORS(app)


csv_path = os.path.join(os.path.dirname(__file__), 'data', 'music.csv')
if not os.path.exists(csv_path):
    raise FileNotFoundError(f"CSV file not found at {csv_path}")
df = pd.read_csv(csv_path, on_bad_lines='skip', low_memory=False)

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


@app.route('/updateproto', methods=['POST'])
def update_group_proto():
    payload = request.get_json()
    username = payload.get("username")
    group_id = payload.get("groupId")

    if not username or not isinstance(group_id, int):
        return jsonify({'error': 'Invalid input'}), 400

    # Fetch group by ID
    group_response = supabase.table('groups').select('*').eq('id', group_id).single().execute()
    if not group_response.data:
        return jsonify({'error': 'Group not found'}), 404

    group = group_response.data
    usernames = group.get("users") or []

    # Update usernames array
    if username in usernames:
        usernames.remove(username)
    else:
        usernames.append(username)

    # Fetch user data for all usernames
    user_rows = supabase.table('users').select('*').in_('username', usernames).execute().data
    if not user_rows:
        return jsonify({'error': 'No users found'}), 404

    # Aggregate protoperson fields
    fields = ['dance', 'tempo', 'valence', 'loudness', 'speech', 'instrumental', 'energy']
    protoperson = {f'user_{f}': 0.0 for f in fields}
    
    protoperson['user_explicit'] = 0
    genre_union = set()

    for row in user_rows:
        for f in fields:
            protoperson[f'user_{f}'] += float(row.get(f, 0.0))
        protoperson['user_explicit'] += int(bool(row.get('explicit')))
        genres = row.get('genres') or []
        genre_union.update(map(str.strip, genres))

    count = len(user_rows)
    for f in fields:
        protoperson[f'user_{f}'] = str(protoperson[f'user_{f}'] / count)

    protoperson['user_explicit'] = str(round(protoperson['user_explicit'] / count))
    protoperson['user_genre'] = list(genre_union)
    print(protoperson)

    # Call recommend_songs
    rec_df = recommend_songs(
        df,
        float(protoperson['user_dance']),
        float(protoperson['user_energy']),
        ','.join(protoperson['user_genre']),
        float(protoperson['user_instrumental']),
        float(protoperson['user_speech']),
        float(protoperson['user_tempo']),
        float(protoperson['user_loudness']),
        float(protoperson['user_valence']),
        bool(int(protoperson['user_explicit']))
    )
    recommended_songs = rec_df.to_dict(orient='records')

    # Prepare update payload for group
    update_payload = {
        'users': usernames,
        'songs': recommended_songs,
        'genres': protoperson['user_genre']
    }
    print(update_payload)

    # Map user fields to group fields
    field_mapping = {
        'dance': 'danceability',
        'speech': 'speechiness',
        'instrumental': 'instrumentalness',
        'tempo': 'tempo',
        'valence': 'valence',
        'loudness': 'loudness',
        'energy': 'energy'
    }
    for user_key, group_key in field_mapping.items():
        update_payload[group_key] = protoperson[f'user_{user_key}']
    
    update_payload['explicit'] = protoperson['user_explicit']
    # Update group
    supabase.table('groups').update(update_payload).eq('id', group_id).execute()

    return jsonify({
        'protoperson': protoperson,
        'recommended_songs': recommended_songs,
        'updated_group': update_payload
    }), 200


    


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

def compareusers(user_logged, user_proto):
    # Calculate similarity score between two user profiles
    # Example: Euclidean distance on selected features
    features = [
        'user_danceability', 'user_energy', 'user_instrumentalness',
        'user_speechiness', 'user_tempo', 'user_loudness', 'user_valence'
    ]
    score = 0
    for feat in features:
        score += (user_logged.get(feat, 0) - user_proto.get(feat, 0)) ** 2
    score = score ** 0.5

    # Compare genres (intersection over union)
    genres_logged = set(map(str.strip, str(user_logged.get('user_genre', '')).lower().split(',')))
    genres_proto = set(map(str.strip, str(user_proto.get('user_genre', '')).lower().split(',')))
    genre_similarity = len(genres_logged & genres_proto) / max(1, len(genres_logged | genres_proto))

    # Compare explicit preference
    explicit_match = user_logged.get('user_explicit') == user_proto.get('user_explicit')

    return {
        'distance_score': score,
        'genre_similarity': genre_similarity,
        'explicit_match': explicit_match
    }


@app.route("/compare", methods=["POST"])
def compareusers_route():
    Userstocompare = request.get_json()
    if not Userstocompare or 'user_logged' not in Userstocompare or 'user_proto' not in Userstocompare:
        return jsonify({'error': 'Invalid input'}), 400

    result = compareusers(Userstocompare['user_logged'], Userstocompare['user_proto'])
    return jsonify(result), 200


app.run(host="0.0.0.0", port=5000, debug="True")