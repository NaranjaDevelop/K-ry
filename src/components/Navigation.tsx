import { useNavigate } from "react-router";
import imagen from "../assets/K-RY.png";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-6 relative z-10">
      <div className="flex items-center space-x-8">
        <img src={imagen} alt="logo" className="h-12 w-auto"/>
        <div className="hidden md:flex space-x-6 text-white/80">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">How it Works</a>
          <a href="#" className="hover:text-white transition-colors">Why Join</a>
          <a href="#" className="hover:text-white transition-colors">Start our Telegram</a>
          <a href="#" className="hover:text-white transition-colors">About Us</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10" onClick={() => navigate("/login")}>
          Log In
        </Button>
        <Button className="bg-[#FF08CE] hover:bg-pink-600 text-white px-6 py-2 rounded transition-all duration-300 hover:scale-105" onClick={() => navigate("/login")}>
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
