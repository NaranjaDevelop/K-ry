
import { Button } from "@/components/ui/button";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            title="Match"
            description="AI-enabled algorithm matches your interests with Spotify music."
            bgColor="bg-gradient-to-br from-purple-600 to-blue-600"
            icon="🎵"
          />
          <FeatureCard
            title="Sync"
            description="Play music together live. Just invite friends of many more."
            bgColor="bg-white"
            textColor="text-black"
            icon="🎧"
          />
          <FeatureCard
            title="MusicBot"
            description="Get a bot to start adding playlists to the Spotify."
            bgColor="bg-gray-800"
            icon="🤖"
          />
        </div>
        
        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
