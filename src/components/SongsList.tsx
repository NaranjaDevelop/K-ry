import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import getSpotifyToken from "../services/spotify";

interface songsrecommended {
  Unnamed: number;
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
}

interface SongsListProps {
  songs: songsrecommended[];
  title?: string;
  favorites: number[]; // lista de IDs favoritos
  onToggleFavorite: (songId: number) => void;
}

const SongsList = ({ songs, title = "All Songs", favorites, onToggleFavorite }: SongsListProps) => {
  const [songss, setsongs] = useState<songsrecommended[]>([])
  const [spotify, setspotify] = useState<any>([]) // Use a proper type if available
useEffect(() => {
  const fetchData = async () => {
    // Fetch song list
    const response = await fetch("https://k-ry.onrender.com/Newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          user_loudness: -10,
          user_tempo: 120.0,
          user_speechiness: 0.9,
          user_danceability: 0.4,
          user_energy: 0.6,
          user_valence: 0.3,
          user_instrumentalness: 0.7,
          user_genre: 'spanish,pop,rock',
          user_explicit: false
        }
      }),
    });
    const data = await response.json();
    setsongs(data);
    console.log(data);

    // Fetch Spotify info for the first song if available
    
      const tokens = await getSpotifyToken(
        import.meta.env.VITE_CLIENTIDSPOTIFY,
        import.meta.env.VITE_SECRETKEYSPOTIFY
      );
      
      const spotifyTracks = await Promise.all(
        data[0].map(async (spotifydata: any) => {
          const spotifyResponse = await fetch(
        `https://api.spotify.com/v1/tracks/${spotifydata.track_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
          );
          const trackInfo = await spotifyResponse.json();
          return trackInfo;
        })
      );
      setspotify(spotifyTracks);
    
  };
  

  fetchData();
}, []);
console.log(spotify);


useEffect(() => {
  
  
}, [songss]);

  return (
    <div className="bg-gray-900/50 rounded-lg p-6 w-full">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>

      <div className="space-y-4">
        {(Array.isArray(spotify) ? spotify : []).map((song: any, index: number) => {
          const isFavorite = 1

          return (
            <div
              key={index}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
            >
              <span className="text-gray-400 text-sm w-8">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={song?.album?.images?.[0]?.url}
                alt={song.name}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-left text-white font-medium">{song.name}</h3>
                    <p className="text-gray-400 text-sm">{song.artists && song.artists[0]?.name}</p>
                  </div>
                </div>
              </div>

              <div className="text-gray-400 text-sm hidden md:block">{song.album.name}</div>

              <button
                className="p-2 text-gray-400 hover:text-white transition-colors group-hover:opacity-100"
                onClick={() => onToggleFavorite(index)}
              >
                <Heart
                  size={16}
                  className={isFavorite ? "text-white fill-white" : ""}
                />
              </button>

              <div className="text-gray-400 text-sm w-12 text-right">{song.duration_ms}</div>
            </div>
          );
        })}
            </div>
          
        
      </div>
  ); 
  
};

export default SongsList;
