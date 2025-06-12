import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import JamCard from '@/components/JamCard';
import CreateJamModal from '@/components/CreateJamModal';
import supabase from '@/services/supabase'; 

const MyJams = () => {
  const [jams, setJams] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchJoinedJams = async () => {
      // Aquí luego va la lógica real de jams del usuario
      let { data: groups, error } = await supabase
        .from('groups')
        .select('*');

      if (error) {
        console.error('Error fetching groups:', error);
      } else {
        setJams(groups || []);
      }
    };

    fetchJoinedJams();
  }, []);

  const handleCreateJam = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => setIsCreateModalOpen(false);

  return (
    <div className="bg-gray-950 text-white flex min-h-screen w-screen">
      <Sidebar onCreateJam={handleCreateJam} className="h-screen" />

      <div className="flex-1 pl-64">
        <Header />

        <main className="flex-1 p-8">
          {/* Title */}
          <div className="mb-10 text-left">
            <h1 className="text-2xl font-regular">My Jams</h1>
          </div>

          {/* Jam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
            {jams.length > 0 ? (
              jams.map((jam) => (
                <JamCard
                  key={jam.id}
                  title={jam.title}
                  matchPercentage={jam.matchPercentage || 75}
                  members={jam.members || 10}
                  coverImage={jam.coverImage || 'https://images.unsplash.com/photo-1516575080821-d4c8d2b37f8d?w=400&h=400&fit=crop'}
                  isUp={jam.isUp ?? true}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">You haven't joined any jams yet.</p>
            )}
          </div>
        </main>
      </div>

      <CreateJamModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreateJam={() => {}}
      />
    </div>
  );
};

export default MyJams;
