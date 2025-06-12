import logo from '../assets/K-RY.png';
const Footer = () => {
  return (
    <footer className="py-16 px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="" className="h-12 w-auto mb-6"/>
            <p className="text-white/60 text-sm leading-relaxed">
              A music that complies community of collaborative playlists. Share and listen to recommendations like never before: A modern and modern way to network to communicate platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">About Us</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Playlists</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For developers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Privacy Policy</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advertising Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                t
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          <p>&copy; 2024 K-ry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
