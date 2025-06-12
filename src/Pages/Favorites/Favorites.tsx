import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SongsList from "@/components/SongsList";

const Favorites = () => {
  const favoriteSongs = [
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
      title: "cruel summer",
      artist: "Taylor Swift",
      album: "Lover",
      duration: "3:19",
      artwork: "https://images.unsplash.com/photo-1557761465-9c4d9cda77c2?w=50&h=50&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-screen">
      <Sidebar className="w-64 h-screen fixed top-0 left-0 bg-gray-900 z-50" />

      <div className="flex-1 flex flex-col pl-64">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8">Favorites</h1>

          <SongsList songs={favoriteSongs} title="Favorite Songs" />
        </main>
      </div>
    </div>
  );
};

export default Favorites;
