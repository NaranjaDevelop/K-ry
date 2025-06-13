export interface userinterface{
  id:number;
  user_name: string;
  user_genre: string;
  user_danceability: number;
  user_energy: number;
  user_instrumentalness: number;
  user_speechiness: number;
  user_tempo: number;
  user_loudness: number;
  user_explicit: boolean;
  user_groups: Group[];
  user_email: string;
  user_favorites: Song[];
}

export type Group = {
  id: number;
  name: string;
  songs: Song[];
  description: string;
  genres: string[];
  users: string[];
  image: string;

  matchPercentage?: number;

  tempo: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  speechiness: number;
  loudness: number;
  explicit: boolean;
  valence: number;
}

export type Song = {
  "Unnamed: 0": number;
  acousticness: number;
  album_name: string;
  artists: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  explicit: boolean;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  popularity: number;
  score: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_genre: string;
  track_id: string;
  track_name: string;
  valence: number;
};

export type UserPreferences = {
  user_danceability: number;
  user_energy: number;
  user_explicit: boolean;
  user_genre: string;
  user_instrumentalness: number;
  user_loudness: number;
  user_speechiness: number;
  user_tempo: number;
  user_valence: number;
};

export type SupaUserTastes = {
  genres: string[];
  dance: number;
  energy: number;
  instrumental: number;
  speech: number;
  tempo: number;
  loudness: number;
  explicit: boolean;
  valence: number;
}


