import React, { useState } from "react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  HelpCircle,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const Header = ({ darkMode, setDarkMode }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  if (!isAuthenticated) return null;

  return (
    <header
      className={`h-16 shadow-md ${
        darkMode ? "bg-gray-900" : "bg-white"
      } border-b flex items-center justify-between px-6`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/logo.jpg"
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span
          className={`font-extrabold text-2xl tracking-wide ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "1px",
          }}
        >
          Panthera Infotech
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for..."
            className={`pl-10 pr-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        </div>
        <Bell
          className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        />
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <HelpCircle
          className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        />

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span
              className={`text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {user?.name || "User"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div
              className={`absolute right-0 mt-2 w-48 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-md shadow-lg border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } z-50`}
            >
              <div className="py-1">
                <div
                  className={`px-4 py-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  } border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs">{user?.email}</div>
                </div>

                <button
                  onClick={() => setShowUserMenu(false)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  } flex items-center space-x-2 transition-colors`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    darkMode
                      ? "text-red-400 hover:bg-gray-700"
                      : "text-red-600 hover:bg-gray-100"
                  } flex items-center space-x-2 transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
