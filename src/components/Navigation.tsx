
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 relative z-10">
      <div className="flex items-center space-x-8">
        <div className="text-white font-bold text-xl">spotlol</div>
        <div className="hidden md:flex space-x-6 text-white/80">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">How it Works</a>
          <a href="#" className="hover:text-white transition-colors">Why Join</a>
          <a href="#" className="hover:text-white transition-colors">Start our Telegram</a>
          <a href="#" className="hover:text-white transition-colors">About Us</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
          Log In
        </Button>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
