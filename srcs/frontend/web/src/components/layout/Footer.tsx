import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 backdrop-blur-sm bg-opacity-90">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">FT</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-100">
              Transcendence
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-100 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
              <Link 
                to="/login" 
                className="btn-secondary w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn-primary w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link to="/" className="text-gray-300 hover:text-white transition-colors">
        Home
      </Link>
      <Link to="/game" className="text-gray-300 hover:text-white transition-colors">
        Game
      </Link>
      <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
        Leaderboard
      </Link>
      <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
        About
      </Link>
    </>
  );
};

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <>
      <Link 
        to="/" 
        className="block text-gray-300 hover:text-white transition-colors py-2"
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link 
        to="/game" 
        className="block text-gray-300 hover:text-white transition-colors py-2"
        onClick={closeMenu}
      >
        Game
      </Link>
      <Link 
        to="/leaderboard" 
        className="block text-gray-300 hover:text-white transition-colors py-2"
        onClick={closeMenu}
      >
        Leaderboard
      </Link>
      <Link 
        to="/about" 
        className="block text-gray-300 hover:text-white transition-colors py-2"
        onClick={closeMenu}
      >
        About
      </Link>
    </>
  );
};

export default Header;