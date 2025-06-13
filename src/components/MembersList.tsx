
import { Edit } from "lucide-react";
import { joinGroup } from "../services/supabase";
import type { Group } from "../Types/Interfaces";
import type { storeType } from "../store/store";
import { useSelector } from "react-redux";


const MembersList = (users: {users: Group}) => {
  const username = useSelector((state: storeType) => state.user.user.user_name)

  console.log(users)
  if (!users || !users.users || !users.users.users) {
    return null; // Handle the case where users is not defined or has no members
  }
  const members = users.users.users || [];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-xl font-semibold text-white">Members</h2>
        <Edit size={16} className="text-gray-400" />
      </div>
      
      <div className="flex space-x-10 overflow-x-auto">
        {members.map((member) => (
          <div key={member} className="flex-shrink-0 text-center">
            <div className="relative">
              <img
                src='https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png'
                alt={member}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <button className="absolute -top-0 -right-1 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-600" onClick={() => joinGroup(users.users.id, username)}>
                −
              </button>
            </div>
            <p className="text-xs text-gray-400">{member}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
