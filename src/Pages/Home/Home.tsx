
import {  useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from '@/components/Header';
import JamCard from '@/components/JamCard';
import CreateJamModal from '@/components/CreateJamModal';
import type { Group } from '../../Types/Interfaces';
import { useSelector } from 'react-redux';
import { useAppDispatch, type storeType } from '../../store/store';
import { createGroup } from '../../services/supabase';
import { getGroups } from '../../store/slice';



const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGroups())
  }, [dispatch]);

  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [jams, setJams] = useState<Group[]>([]);

  const user = useSelector((state: storeType) => state.user.user);
  const otherGroups = useSelector((state: storeType) => state.user.otherGroups);
  
  useEffect(() => {
  setJams(otherGroups);
  }, [otherGroups]);


  const handleCreateJam = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };


  const handleJamCreated = (jamData: { name: string; description: string, photo: string }) => {
    console.log(user)
    const newJam = {
      name: jamData.name,
      description: jamData.description,
      coverImage: jamData.photo,
      users: [user.user_name],
    };

    createGroup(newJam.name, newJam.description, newJam.coverImage, newJam.users)
  };

  return (
    <div className="bg-gray-950 text-white flex min-h-screen w-screen">
      <Sidebar onCreateJam={handleCreateJam} className="h-screen" />

      <div className="flex-1 pl-64">
        <Header />

        <main className="flex-1 p-8">
          <div className="mb-10 text-left ">
            <h1 className="text-3xl font-bold mb-2">
              Hi <span className="text-purple-400">User 123</span>
            </h1>
            <p className="text-gray-400 text-lg">Ready to vibe? Create or join a jam</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
            {jams.map((jam) => (
              <JamCard
              className="h-full"
                key={jam.id}
                title={jam.name}
                matchPercentage={jam.matchPercentage}
                members={jam.users}
                coverImage={jam.image}
                isUp={jam.users.includes(user.user_name)}
                id={jam.id}
              />
            ))}
          </div>
        </main>
      </div>

      <CreateJamModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreateJam={handleJamCreated}
      />
    </div>
  );
};

export default Home;
