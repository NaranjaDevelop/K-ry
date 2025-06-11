
import Navigation from "./Navigation";
import ProfileCard from "./ProfileCard";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navigation />
      
      <div className="flex flex-col items-center justify-center px-8 py-16 relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-white text-center mb-4 leading-tight">
          Your vibe, your people.<br />
          One perfect playlist.
        </h1>
        
        <p className="text-xl text-white/70 text-center mb-12 max-w-2xl">
          Connect with friends and like-minded people and build playlists that fit the community vibe.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 w-full max-w-4xl">
          <ProfileCard 
            image="/lovable-uploads/8705d649-ac2f-4195-a3a9-1e47505f9c5c.png"
            bgColor="bg-orange-500"
            delay="0"
          />
          <ProfileCard 
            image="/lovable-uploads/8705d649-ac2f-4195-a3a9-1e47505f9c5c.png"
            bgColor="bg-pink-500"
            delay="0.1"
          />
          <ProfileCard 
            image="/lovable-uploads/8705d649-ac2f-4195-a3a9-1e47505f9c5c.png"
            bgColor="bg-purple-500"
            delay="0.2"
          />
          <ProfileCard 
            image="/lovable-uploads/8705d649-ac2f-4195-a3a9-1e47505f9c5c.png"
            bgColor="bg-green-500"
            delay="0.3"
          />
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-white/60 mb-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
            </div>
          </div>
          <p className="text-white/60">Start following new</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
