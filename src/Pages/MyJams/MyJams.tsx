import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import JamCard from '@/components/JamCard';
import CreateJamModal from '@/components/CreateJamModal';
import { X } from 'lucide-react';
import supabase from '@/services/supabase';

const MOCK_USER_ID = 'user-123'; // Simula ID del usuario logueado

const SkeletonCard = () => (
  <div className="bg-gray-800 rounded-xl h-64 animate-pulse p-4 flex flex-col justify-between">
    <div className="bg-gray-700 h-32 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-700 h-3 w-1/2 rounded"></div>
    </div>
  </div>
);

const MyJams = () => {
  const [createdJams, setCreatedJams] = useState([]);
  const [joinedJams, setJoinedJams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      const { data: groups, error } = await supabase.from('groups').select('*');

      if (error) {
        console.error('Error fetching groups:', error);
        setLoading(false);
        return;
      }

      const created = groups.filter((g) => g.owner_id === MOCK_USER_ID);
      const joined = groups.filter((g) => g.owner_id !== MOCK_USER_ID);

      setCreatedJams(created);
      setJoinedJams(joined);
      setLoading(false);
    };

    fetchGroups();
  }, []);

  const handleCreateJam = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => setIsCreateModalOpen(false);

  const handleLeaveJam = async (jamId: number) => {
    const confirm = window.confirm('Are you sure you want to leave this jam?');
    if (!confirm) return;

    // Aquí iría la lógica real con Supabase
    setJoinedJams((prev) => prev.filter((jam) => jam.id !== jamId));
  };

  return (
    <div className="bg-gray-950 text-white flex min-h-screen w-screen">
      <Sidebar onCreateJam={handleCreateJam} className="h-screen" />

      <div className="flex-1 pl-64">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto min-h-screen bg-gray-950">

          {/* Created by You */}
          <div className="mb-12">
            <h2 className="text-2xl mb-4">Created by You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                : createdJams.length > 0 ? (
                    createdJams.map((jam) => (
                      <JamCard
                        className="h-full"  
                        key={jam.id}
                        title={jam.title}
                        matchPercentage={jam.matchPercentage || 75}
                        members={jam.members || 10}
                        coverImage={jam.coverImage}
                        isUp={jam.isUp ?? true}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      You haven't created any jams yet.
                    </p>
                  )}
            </div>
          </div>

          {/* Joined Jams */}
          <div>
            <h2 className="text-2xl mb-4">Joined Jams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                : joinedJams.length > 0 ? (
                    joinedJams.map((jam) => (
                      <div key={jam.id} className="relative group">
                        <JamCard
                            className="h-full"
                          title={jam.title}
                          matchPercentage={jam.matchPercentage || 75}
                          members={jam.members || 10}
                          coverImage={jam.coverImage}
                          isUp={jam.isUp ?? true}
                        />
                        {/* Leave Button */}
                        <button
                          onClick={() => handleLeaveJam(jam.id)}
                          className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <X size={14} />
                          Leave
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      You're not part of any other jams yet.
                    </p>
                  )}
            </div>
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
