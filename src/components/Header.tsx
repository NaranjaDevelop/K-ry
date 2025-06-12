import { BellDot, User, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import type { storeType } from '../store/store';
import { useSelector } from 'react-redux';

const Header = () => {
  const location = useLocation();

  const user = useSelector((state: storeType) => state.user.user)

  const getPageTitle = (pathname: string) => {
    if (pathname.includes('/favorites')) return 'Favorites';
    if (pathname.includes('/myjams')) return 'My Jams';
    if (pathname.includes('/details')) return 'Details';
    if (pathname.includes('/profile')) return 'Profile';
    if (pathname.includes('/home')) return 'Home';
    return 'Dashboard';
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-white">{pageTitle}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Settings */}
        <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
          <Settings size={20} />
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200 relative">
          <BellDot size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white font-medium">{user.user_name}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-400"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
