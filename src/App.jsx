import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/authContext";
import Dashboard from "./dashboard";
import LoginPage from "./Auth/login";
import SignupPage from "./Auth/signup";

const AppContent = () => {
  const [showSignup, setShowSignup] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showSignup) {
      return (
        <SignupPage
          onSwitchToLogin={() => setShowSignup(false)}
          onSignupSuccess={() => {}}
        />
      );
    }

    return (
      <LoginPage
        onSwitchToSignup={() => setShowSignup(true)}
        onLoginSuccess={() => {}}
      />
    );
  }

  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
