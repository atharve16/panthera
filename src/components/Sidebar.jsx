import { TrendingUp } from "lucide-react";

const Sidebar = ({ darkMode, activeTab, setActiveTab }) => (
  <div
    className={`w-64 h-screen ${
      darkMode ? "bg-gray-900" : "bg-white"
    } border-r border-gray-200 flex flex-col`}
  >
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <span
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Pages / Dashboard
        </span>
      </div>
    </div>

    <nav className="flex-1 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <span
          className={`font-medium ${darkMode ? "text-white" : "text-gray-700"}`}
        >
          Data Analytics
        </span>
      </div>
      <button
        onClick={() => setActiveTab("Market")}
        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
          activeTab === "Market"
            ? "bg-blue-50 text-blue-700 font-medium"
            : `${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`
        }`}
      >
        Market View
      </button>
      <button
        onClick={() => setActiveTab("Acquisition")}
        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
          activeTab === "Acquisition"
            ? "bg-blue-50 text-blue-700 font-medium"
            : `${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`
        }`}
      >
        Acquisition View
      </button>

      <button
        onClick={() => setActiveTab("URLs")}
        className={`w-full text-left px-3 py-1 rounded-lg transition-colors ${
          activeTab === "URLs"
            ? "bg-blue-50 text-blue-700 font-medium"
            : `${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`
        }`}
      >
        URLs
      </button>
    </nav>
  </div>
);

export default Sidebar;
