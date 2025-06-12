
import { Button } from "@/components/ui/button";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            title="Match"
            description="Find and join music channels with people who share your vibe."
            bgColor="bg-gradient-to-br from-purple-600 to-blue-600"
            icon="🎵"
          />
          <FeatureCard
            title="Sync"
            description="Playlists update in real time when someone joins or leaves."
            bgColor="bg-white"
            textColor="text-black"
            icon="🎧"
          />
          <FeatureCard
  title="MusicBot"
  description="Get the same group-matching experience, now on Telegram."
  bgColor="bg-gray-900"
  icon="🤖"
>
  <Button variant="outline">Try it now</Button>
</FeatureCard>
        </div>
        
        
      </div>
    </div>
  );
};

export default Features;
