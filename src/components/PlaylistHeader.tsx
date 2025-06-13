
import { Button } from "@/components/ui/button";
import { Heart, ThumbsDown, Share2 } from "lucide-react";

const PlaylistHeader = ({name}:{name: string}) => {
  
  return (
    <div className="flex items-center space-x-8 mb-8">
      {/* Playlist Cover */}
      <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-black/20 flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-white/30 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Playlist Info */}
      <div className="flex-1 ">
        <h1 className="text-left text-6xl font-bold text-white mb-4">{name}</h1>
        
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-green-400 text-sm font-medium">76.5% music match</span>
        </div>

        <div className="flex items-center space-x-10">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-3 rounded-lg font-semibold ">
            Join
          </Button>
          
          <span className="text-gray-400">Recommend Playlist?</span>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ThumbsDown size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors ">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;