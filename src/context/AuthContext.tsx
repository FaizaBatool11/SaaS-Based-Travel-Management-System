"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// ------------------ Types ------------------
interface Agency {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  agencies: Agency[];
  agencyId: number | null;
}

// ------------------ Auth Context ------------------
interface AuthContextType {
  user: User | null;
  permissions: string[];
  loading: boolean;
  login: (userObj: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ------------------ AuthProvider ------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ------------------ Set Auth ------------------
  const setAuth = (userObj: User) => {
    setUser(userObj);
    setPermissions(userObj?.permissions || []);
  };

  // ------------------ Login ------------------
 const login = (userObj: User, token: string) => {
  setAuth(userObj);
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

  // ------------------ Logout ------------------
  const logout = () => {
    setUser(null);
    setPermissions([]);
    localStorage.removeItem("token");
    localStorage.removeItem("agencies");
    localStorage.removeItem("activeAgencyId");
    delete axios.defaults.headers.common["Authorization"];
  };

  // ------------------ Load current user ------------------
useEffect(() => {
  // Guard against StrictMode double-invoke in dev: ensure single fetch per mount
  let hasFetched = false;

  const init = async () => {
    if (hasFetched) return;
    hasFetched = true;

    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      if (!token) return setLoading(false);

      const res = await axios.get<User>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/currentUser`);
      setAuth(res.data);
    } catch (err: unknown) {
      console.error("Auth fetch error:", err);
      setUser(null);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  void init();
}, []);

  // ------------------ Provider ------------------
  return (
    <AuthContext.Provider value={{ user, permissions, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ------------------ useAuth Hook ------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
