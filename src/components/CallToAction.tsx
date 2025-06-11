
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white/60 text-sm uppercase tracking-wider mb-4">Why Choose Us</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Smart playlists that evolve with your group.
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Our algorithms continuously adapt and try you can let AI recommendations help choose the mixing beats, playlists, community's evolving sound experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Smart playlist recommendation based on the community's evolving sound preferences.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h4 className="text-xl font-bold mb-3">No skips, no fights, just music you all enjoy.</h4>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white"></div>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full">
                →
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <div className="text-gray-400 mb-4">
            <div className="text-lg font-semibold">🎵 Spotify</div>
          </div>
          <h4 className="text-white text-2xl mb-2">
            Powered by the <span className="text-green-400 underline">world's top</span> music platform
          </h4>
          <p className="text-white/60 max-w-2xl mx-auto">
            Our playlists are generated using Spotify's & Deezer's libraries. So you get millions of songs on our recommendations, AI-boosted from million of users.
          </p>
        </div>
        
        <div className="mb-16">
          <h3 className="text-white/60 text-sm uppercase tracking-wider mb-8">How It Works</h3>
          <h2 className="text-4xl font-bold text-white mb-12">Music that connects people instantly</h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">1</div>
              <div>
                <h4 className="text-white text-xl font-semibold mb-2">Do a simple form</h4>
                <p className="text-white/70">Fill out a quick form about your music listening habits, and how you're feeling. It'll learn as you interact in more with the community you create.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">2</div>
              <div>
                <h4 className="text-white text-xl font-semibold mb-2">Join a Group</h4>
                <p className="text-white/70">Join others and discover your unique playlist. Or even create your own group bringing your favorite connections together.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">3</div>
              <div>
                <h4 className="text-white text-xl font-semibold mb-2">Get a smart playlist</h4>
                <p className="text-white/70">Stream through or join a group. A personal mix of both old tags from your favorite patterns, discover that offers more harmonic sense.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Connect through music, starting on Telegram
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Access our intelligent music player on Telegram. A quick & free simple process does. Your tuned and library all sync up with the world's music is available. What's best is
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
