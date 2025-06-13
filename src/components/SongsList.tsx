import { Heart } from "lucide-react";
import type { Song } from "../Types/Interfaces";

interface SongsListProps {
  songs: Song[];
  title?: string;
  favorites: string[]; // lista de IDs favoritos
  onToggleFavorite: (songId: string) => void;
}

const SongsList = ({ songs, title = "All Songs", favorites, onToggleFavorite }: SongsListProps) => {
  return (
    <div className="bg-gray-900/50 rounded-lg p-6 w-full">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>

      <div className="space-y-4">
        {songs.map((song, index) => {
          const isFavorite = favorites.includes(song.track_id);

          return (
            <div
              key={song.track_id}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
            >
              <span className="text-gray-400 text-sm w-8">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src='https://upload.wikimedia.org/wikipedia/commons/d/d5/CD_autolev_crop.jpg'
                alt={song.track_name}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-left text-white font-medium">{song.track_name}</h3>
                    <p className="text-gray-400 text-sm">{song.artists}</p>
                  </div>
                </div>
              </div>

              <div className="text-gray-400 text-sm hidden md:block">{song.album_name}</div>

              <button
                className="p-2 text-gray-400 hover:text-white transition-colors group-hover:opacity-100"
                onClick={() => onToggleFavorite(song.track_id)}
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
