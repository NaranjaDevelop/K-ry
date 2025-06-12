import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { joinGroup } from '../services/supabase';
import { useSelector } from 'react-redux';
import type { storeType } from '../store/store';

interface JamCardProps {
  id: number;
  title: string;
  matchPercentage: number;
  members: number;
  coverImage: string;
  isUp?: boolean;
  className?: string;
  id: number;
}

const JamCard = ({
  id,
  title,
  matchPercentage,
  members,
  coverImage,
  isUp = true,
  className = '',
}: JamCardProps) => {
  const navigate = useNavigate();

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const user = useSelector((state: storeType) => state.user.user);

  const getArrowIcon = (isUp: boolean) => {
  return isUp ? (
    <TrendingUp size={16} className="text-green-400" />
  ) : (
    <TrendingDown size={16} className="text-red-400" />
  );
};

  const handleJoinGroup = () => {
    joinGroup(id, user.user_name)
  }

  const memberAvatars = Array.from({ length: Math.min(4, members) }, (_, i) => (
    <div
      key={i}
      className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-gray-800"
      style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 4 - i }}
    />
  ));

  return (
    <div
      onClick={() => navigate(`/details/${id}`)}
      className={`relative group cursor-pointer h-full ${className}`}
    >
      <div className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 group-hover:transform group-hover:scale-105 group-hover:shadow-2xl">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Plus Button */}
          <button
            onClick={(e) => e.stopPropagation()} 
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <Plus size={16} className="text-white" onClick={() => handleJoinGroup()}/>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>

          {/* Music Match */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {getArrowIcon(isUp)}
              <span className={`${getMatchColor(matchPercentage)} font-medium`}>
                {matchPercentage}%
              </span>
            </div>
            <span className="text-gray-400 text-sm">music match</span>
          </div>

          {/* Members */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">{memberAvatars}</div>
            <span className="text-gray-400 text-sm">{members} members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamCard;
