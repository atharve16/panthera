import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8080/api";

  // Check for existing user session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      const userInfo = data.user;
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const userInfo = data.user;
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
