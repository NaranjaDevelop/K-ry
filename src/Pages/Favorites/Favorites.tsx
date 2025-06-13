import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SongsList from "@/components/SongsList";
import { useSelector } from "react-redux";
import { useAppDispatch, type storeType } from "../../store/store";
import type { Song } from "../../Types/Interfaces";
import { favoriteSong } from "../../services/supabase";
import { setFavs } from "../../store/slice";


const Favorites = () => {

  const favs = useSelector((state: storeType) => state.user.user.user_favorites) || [];
  console.log(favs);
  const username = useSelector((state: storeType) => state.user.user.user_name) || "";
  const dispatch = useAppDispatch();

  const handleAddFavorite = async (songId: Song) => {
      const {favs} = await favoriteSong(songId, username)
      dispatch(setFavs({favorites: favs || []}));
    }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-screen">
      <Sidebar className="w-64 h-screen fixed top-0 left-0 bg-gray-900 z-50" />

      <div className="flex-1 flex flex-col pl-64">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-2xl  mb-8">My Favorites Songs</h1>

          <SongsList
            songs={favs}
            title="Liked Songs"
            favorites={favs.map((f) => f.track_id) || []}
            onToggleFavorite={handleAddFavorite}
          />
        </main>
      </div>
    </div>
  );
};

export default Favorites;

