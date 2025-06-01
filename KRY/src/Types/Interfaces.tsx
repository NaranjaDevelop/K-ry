export interface recomended {
  Unnamed: number; 
  number: number;
  a: string;
  acousticness: number;
  album_name: string;
  artists: string;
  danceability: number;
  duration_ms: string;
  energy: number;
  explicit: string;
  instrumentalness: number;
  key: number;
  liveness: string;
  loudness: number;
  mode: number;
  popularity: string;
  score: number;
  speechiness: number;
  tempo: number;
  time_signature: string;
  track_genre: string;
  track_id: string;
  track_name: string;
  valence: string;
}
export interface tracks {
  album: {
    album_type: string;
    artists: Array<{
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: Array<{
      height: number;
      url: string;
      width: number;
    }>;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: Array<{
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}
//user_danceability, user_energy, user_genre,user_instrumentalness, user_speechiness, user_tempo
export interface userinterface{
  id:number;
  user_name: string;
  user_genre: string;
  user_danceability: number;
  user_energy: number;
  user_instrumentalness: number;
  user_speechiness: number;
  user_tempo: number;

}

