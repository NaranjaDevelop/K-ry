

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
  user_groups: [{}];
  user_email: string;
  user_favorites: [{}];

}
