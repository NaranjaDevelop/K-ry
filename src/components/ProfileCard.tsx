
interface ProfileCardProps {
  image: string;
  bgColor: string;
  delay: string;
}

const ProfileCard = ({ image, bgColor, delay }: ProfileCardProps) => {
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden h-48 ${bgColor} transform transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
