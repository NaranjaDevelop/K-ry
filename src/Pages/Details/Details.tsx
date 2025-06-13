
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PlaylistHeader from "@/components/PlaylistHeader";
import MembersList from "@/components/MembersList";
import SongsList from "@/components/SongsList";
import GenreTags from "@/components/GenreTags";
import { useParams } from "react-router-dom";
import supabase from "../../services/supaConfig";
import { useEffect, useState } from "react";
import type { Song } from "../../Types/Interfaces";
import { favoriteSong } from "../../services/supabase";
import { useSelector } from "react-redux";
import { useAppDispatch, type storeType } from "../../store/store";
import { setFavs } from "../../store/slice";

const Details = () => {
  const [jams,setJams] = useState<any[]>([])
  const username = useSelector((state: storeType) => state.user.user.user_name) || "";
  const dispatch = useAppDispatch()
  
  const { id: paramid } = useParams<{ id: string }>();
 useEffect(() => {
    const getGroup = async () => {
      const { data: group } = await supabase
        .from('groups')
        .select('*')
        .eq('id', paramid)
        .single();
      setJams(group ? [group] : []);
    };
    getGroup();
  }, [paramid]);
  
  console.log(jams);

  const handleFavorite = (song: Song) => {
    favoriteSong(song, username).then(({ favs }) => {
      dispatch(setFavs({favorites: favs }));
    });
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-screen">
      <Sidebar className="w-64 h-screen fixed top-0 left-0 bg-gray-900 z-50" />
      
      <div className="flex-1 flex flex-col pl-64">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto ">
          <PlaylistHeader name={jams[0]?.name || ""} />
          <MembersList />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 ">
              <SongsList songs onToggleFavorite={handleFavorite}/>
            </div>
            <div className="lg:col-span-1 ">
              <GenreTags />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Details;
