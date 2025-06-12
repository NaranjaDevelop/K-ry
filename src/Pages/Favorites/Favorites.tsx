import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SongsList from "@/components/SongsList";

const mockSongs = [
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
    title: "Silent Cry",
    artist: "Stray Kids",
    album: "Noeasy",
    duration: "3:19",
    artwork: "https://i.scdn.co/image/ab67616d0000b2731843897a2a72dd5036bbb1fc"
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<number[]>(mockSongs.map((s) => s.id)); 

  const handleToggleFavorite = (songId: number) => {
    setFavorites((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId) 
        : [...prev, songId] 
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-screen">
      <Sidebar className="w-64 h-screen fixed top-0 left-0 bg-gray-900 z-50" />

      <div className="flex-1 flex flex-col pl-64">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-2xl  mb-8">My Favorites Songs</h1>

          <SongsList
            songs={mockSongs}
            title="Liked Songs"
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </main>
      </div>
    </div>
  );
};

export default Favorites;

