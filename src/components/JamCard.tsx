
import { Plus } from 'lucide-react';

interface JamCardProps {
  title: string;
  matchPercentage: number;
  members: number;
  coverImage: string;
  isUp?: boolean;
}

const JamCard = ({ title, matchPercentage, members, coverImage, isUp = true }: JamCardProps) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getArrowIcon = (isUp: boolean) => {
    return isUp ? '↗' : '↘';
  };

  const memberAvatars = Array.from({ length: Math.min(4, members) }, (_, i) => (
    <div
      key={i}
      className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-gray-800"
      style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 4 - i }}
    />
  ));

  return (
    <div className="relative group cursor-pointer h-full">
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
          <button className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70">
            <Plus size={16} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
          
          {/* Music Match */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`${getMatchColor(matchPercentage)} font-medium`}>
              {getArrowIcon(isUp)} {matchPercentage}%
            </span>
            <span className="text-gray-400 text-sm">music match</span>
          </div>

          {/* Members */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {memberAvatars}
            </div>
            <span className="text-gray-400 text-sm">{members} members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamCard;
