
import {  useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from '@/components/Header';
import JamCard from '@/components/JamCard';
import CreateJamModal from '@/components/CreateJamModal';
import supabase from '../../services/supabase';



const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [jams, setJams] = useState([]);

   useEffect(() => {
    const getgroups = async () => {
      let { data: groups, error } = await supabase
        .from('groups')
        .select('*');
      console.log(groups);
    };
    getgroups();
  }, [jams]);

  const handleCreateJam = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleJamCreated = (jamData: { name: string; description: string }) => {
    const newJam = {
      id: jams.length + 1,
      title: jamData.name,
      matchPercentage: Math.floor(Math.random() * 40) + 60, // Random percentage between 60-100
      members: Math.floor(Math.random() * 20) + 5, // Random members between 5-25
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      isUp: true
    };
    setJams([newJam, ...jams]);
  };

  return (
    <div className="bg-gray-950 text-white flex min-h-screen w-screen">
      {/* Sidebar */}
      <Sidebar onCreateJam={handleCreateJam} className="h-screen" />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-10 text-left ">
            <h1 className="text-3xl font-bold mb-2">
              Hi <span className="text-purple-400">User 123</span>
            </h1>
            <p className="text-gray-400 text-lg">Ready to vibe? Create or join a jam</p>
          </div>

          {/* Jams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
            {jams.map((jam) => (
              <JamCard
              className="h-full"
                key={jam.id}
                title={jam.title}
                matchPercentage={jam.matchPercentage}
                members={jam.members}
                coverImage={jam.coverImage}
                isUp={jam.isUp}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Create Jam Modal */}
      <CreateJamModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreateJam={handleJamCreated}
      />
    </div>
  );
};

export default Home;
