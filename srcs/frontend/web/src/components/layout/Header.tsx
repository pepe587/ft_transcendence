import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Transcendence
          </Link>

          {/* Navegación */}
          <nav className="flex space-x-4">
            <Link
              to="/jugar"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Jugar
            </Link>
            <Link
              to="/ranking"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Ranking
            </Link>
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Registro
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
