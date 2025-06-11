
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PlaylistHeader from "@/components/PlaylistHeader";
import MembersList from "@/components/MembersList";
import SongsList from "@/components/SongsList";
import GenreTags from "@/components/GenreTags";

const Details = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-screen">
      <Sidebar className="w-64 h-screen fixed top-0 left-0 bg-gray-900 z-50" />
      
      <div className="flex-1 flex flex-col pl-64">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto ">
          <PlaylistHeader />
          <MembersList />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 ">
              <SongsList />
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
