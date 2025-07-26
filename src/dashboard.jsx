import React, { useState, useContext } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import URLsView from './views/URLsView';
import MarketView from './views/MarketView';
import AcquisitionView from './views/AcquisitionView';
import Chatbot from './components/chatboat';
import { PropertyContext } from './context/PropertyContext'; 

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Market");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const { properties } = useContext(PropertyContext);

  const renderContent = () => {
    switch (activeTab) {
      case "URLs":
        return <URLsView darkMode={darkMode} />;
      case "Market":
        return <MarketView darkMode={darkMode} properties={properties} />;
      case "Acquisition":
        return <AcquisitionView darkMode={darkMode} properties={properties} />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-1">
        <Sidebar darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
              {/* Chatbot Toggle Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}
            className={`w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-transform ${
              isChatbotOpen ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            {isChatbotOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Chatbot Widget */}
        <Chatbot 
          darkMode={darkMode} 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      </div>
  );
};

export default Dashboard;
