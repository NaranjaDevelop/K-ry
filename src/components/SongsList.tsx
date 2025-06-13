// // 1. Fetch group data when paramid
//   id: number;
//   name: string;
//   danceability: string;
//   energy: string;
//   songs: songsrecommended[]; // assuming the song objects are of type songsrecommended
//   users: string[];
//   speechiness: string;
//   instrumentalness: string;
//   tempo: string;
//   loudness: string;
//   valence: string;
//   explicit: string;
//   image: string;
//   genres: string[];
//   photo: string | null;
//   description: string;
// }
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import getSpotifyToken from "../services/spotify";
import { useParams } from "react-router-dom";
import supabase from "../services/supaConfig";
import type { Group, Song } from "../Types/Interfaces";

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
  favorites: string[]; // lista de IDs favoritos
  onToggleFavorite: (song: Song) => void;
}

const SongsList = ({  title = "All Songs", onToggleFavorite }: SongsListProps) => {
  const [songss, setsongs] = useState<Group>({
    id: 0,
    name: "",
    danceability: 0,
    energy: 0,
    songs: [],
    users: [],
    speechiness: 0,
    instrumentalness: 0,
    tempo: 0,
    loudness: 0,
    valence: 0,
    explicit: false,
    image: "",
    genres: [],
    description: "",
  })
  const [spotify, setspotify] = useState<any>([]) 

 const { id: paramid } = useParams<{ id: string }>();
 

useEffect(() => {
  
  const fetchData = async () => {
    // Fetch song list
const getGroup = async () => {
      const { data: group } = await supabase
        .from('groups')
        .select('*')
        .eq('id', paramid)
        .single();
      setsongs(group ? group : {
        id: 0,
        name: "",
        danceability: "",
        energy: "",
        songs: [],
        users: [],
        speechiness: "",
        instrumentalness: "",
        tempo: "",
        loudness: "",
        valence: "",
        explicit: "",
        image: "",
        genres: [],
        photo: null,
        description: "",
      });
    };
    getGroup();
    // Fetch Spotify info for the first song if available
    
      
    
  };
  

  fetchData();
}, []);

useEffect(() => {

  if (!songss.songs || songss.songs.length === 0) return;

  const fecthSpotyfy = async () => {
    const tokens = await getSpotifyToken(
        import.meta.env.VITE_CLIENTIDSPOTIFY,
        import.meta.env.VITE_SECRETKEYSPOTIFY
      );
      
      const spotifyTracks = await Promise.all(
        
        songss.songs.map(async (spotifydata: any) => {
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
          console.log(trackInfo);
          return trackInfo;
        })
      );

      console.log('mi')
      setspotify(spotifyTracks);
  }

  fecthSpotyfy()
  
}, [songss])

  


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
                onClick={() => onToggleFavorite(songss.songs.find(s => s.track_id === song.id) as Song)}
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
