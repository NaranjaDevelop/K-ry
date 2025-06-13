
import Navigation from "./Navigation";
import banner from "../assets/imagen banner.png"; // Assuming you have a banner image
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
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


        <div className="inline-flex items-center space-x-4 mb-8">
          <img src={banner} alt="imagen-banner" />
        </div>
        
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-x-2 gap-y-12 text-white/60 mb-4">
          <Button variant="outline" className="text-white hover:text-white hover:bg-white/10" onClick={() => navigate('/login')}>
                      Start your vibe now!
                    </Button>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#41DF82] border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-[#FF08CE] border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-[#694AFF] border-2 border-white"></div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
