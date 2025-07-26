import React, { useState, useContext } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ darkMode, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('market')) {
      return "I can help you with market analysis. Would you like to see the latest market trends?";
    } else if (input.includes('property') || input.includes('acquisition')) {
      return "I can assist with property acquisition data. What specific information are you looking for?";
    } else if (input.includes('url')) {
      return "I can help you manage your URLs. Do you need to add, edit, or analyze any URLs?";
    } else {
      return "I'm here to help with your dashboard needs. You can ask me about market data, properties, or URL management.";
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-20 right-6 w-80 h-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} border rounded-lg shadow-2xl flex flex-col z-50`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">Assistant</span>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded hover:bg-gray-200 ${darkMode ? 'hover:bg-gray-600' : ''}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-blue-500' 
                  : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-3 h-3 text-white" />
                ) : (
                  <Bot className="w-3 h-3 text-gray-600" />
                )}
              </div>
              <div
                className={`p-2 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={`border-t p-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
            placeholder="Type your message..."
            className={`flex-1 p-2 rounded border text-sm ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-800'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


export default Chatbot;