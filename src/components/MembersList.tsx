
import { Edit } from "lucide-react";

const MembersList = () => {
  const members = Array(6).fill(null).map((_, index) => ({
    id: index,
    name: "David Damiano",
    avatar: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=100&h=100&fit=crop&crop=face"
  }));

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-xl font-semibold text-white">Members</h2>
        <Edit size={16} className="text-gray-400" />
      </div>
      
      <div className="flex space-x-10 overflow-x-auto">
        {members.map((member) => (
          <div key={member.id} className="flex-shrink-0 text-center">
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-35 h-35 rounded-full object-cover mb-2"
              />
              <button className="absolute -top-0 -right-1 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-600">
                −
              </button>
            </div>
            <p className="text-xs text-gray-400">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
