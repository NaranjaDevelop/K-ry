import Logo from '../assets/K-RY.png';
import { Home, User, LayoutGrid, Heart, Plus, CircleX } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onCreateJam: () => void;
}

const Sidebar = ({ onCreateJam }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: User, label: 'Profile', active: false },
    { icon: LayoutGrid, label: 'My Jams', path: '/myjams' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6">
        <img src={Logo} alt="K-RY Logo" className="h-10 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
  const isActive =
    item.path && location.pathname.toLowerCase() === item.path.toLowerCase();

  const commonClasses = `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
    isActive
      ? 'bg-purple-600 text-white'
      : 'text-gray-400 hover:text-white hover:bg-gray-800'
  }`;

  return (
    <li key={index}>
      {item.path ? (
        <button onClick={() => navigate(item.path)} className={commonClasses}>
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      ) : (
        <div className={commonClasses}>
          <item.icon size={20} />
          <span>{item.label}</span>
        </div>
      )}
    </li>
  );
})}

        </ul>
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-700 my-4"></div>

      {/* Create Jam Button */}
      <div className="p-4">
        <Button
          onClick={onCreateJam}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 py-3 rounded-lg transition-colors duration-200"
        >
          <Plus size={20} />
          Create Jam
        </Button>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button onClick={()=> navigate('/login',{state:{login:true}})}className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors duration-200">
          <CircleX size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

