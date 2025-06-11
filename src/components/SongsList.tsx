
import { Heart } from "lucide-react";

const SongsList = () => {
  const songs = [
    {
      id: 1,
      title: "exes",
      artist: "Tate McRae",
      album: "Think Later",
      duration: "3:25",
      artwork: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop"
    },
    {
      id: 2,
      title: "exes",
      artist: "Tate McRae",
      album: "Think Later",
      duration: "3:25",
      artwork: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop"
    },
    {
      id: 3,
      title: "exes",
      artist: "Tate McRae",
      album: "Think Later",
      duration: "3:25",
      artwork: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop"
    },
    {
      id: 4,
      title: "exes",
      artist: "Tate McRae",
      album: "Think Later",
      duration: "3:25",
      artwork: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop"
    }
  ];

  return (
    <div className="bg-gray-900/50 rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-6">All Songs</h2>
      
      <div className="space-y-4">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
          >
            <span className="text-gray-400 text-sm w-8">{String(index + 1).padStart(2, '0')}</span>
            
            <img
              src={song.artwork}
              alt={song.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-white font-medium">{song.title}</h3>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm hidden md:block">{song.album}</div>
            
            <button className="p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
              <Heart size={16} />
            </button>
            
            <div className="text-gray-400 text-sm w-12 text-right">{song.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsList;
