// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// interface AuthContextType {
//   user: any;
//   permissions: string[];
//   loading: boolean;
//   login: (userObj: any, token: string) => void;  // 👈 add this
//   logout: () => void;                            // 👈 optional
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [permissions, setPermissions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   const setAuth = (userObj: any) => {
//     setUser(userObj);
//     setPermissions(userObj?.permissions || []);
//   };

//   // ✅ Login function
//   const login = (userObj: any, token: string) => {
//     setAuth(userObj);
//     localStorage.setItem("token", token);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   };

//   // ✅ Logout function
//   const logout = () => {
//     setUser(null);
//     setPermissions([]);
//     localStorage.removeItem("token");
//     localStorage.removeItem("agencies");
//     localStorage.removeItem("activeAgencyId");
//     delete axios.defaults.headers.common["Authorization"];
//   };

//   // Load current user on mount
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get("/api/loginUser");
//         setAuth(res.data);
//       } catch (err) {
//         setUser(null);
//         setPermissions([]);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, permissions, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };


// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// interface AuthContextType {
//   user: any;
//   permissions: string[];
//   loading: boolean;
//   login: (userObj: any, token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [permissions, setPermissions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   const setAuth = (userObj: any) => {
//     setUser(userObj);
//     setPermissions(userObj?.permissions || []);
//   };

//   // ✅ Login function
//   const login = (userObj: any, token: string) => {
//     setAuth(userObj);
//     localStorage.setItem("token", token);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   };

//   // ✅ Logout function
//   const logout = () => {
//     setUser(null);
//     setPermissions([]);
//     localStorage.removeItem("token");
//     localStorage.removeItem("agencies");
//     localStorage.removeItem("activeAgencyId");
//     delete axios.defaults.headers.common["Authorization"];
//   };

//   // ✅ Load current user on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       // token restore karo
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }

//     (async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/loginUser"); // backend se user fetch
//         setAuth(res.data);
//       } catch (err) {
//         console.error("Auth fetch error:", err);
//         setUser(null);
//         setPermissions([]);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, permissions, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// ✅ Define a proper User interface (you can expand this as needed)
interface Agency {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
  agencies?: Agency[];
}

// ✅ Define the AuthContext interface
interface AuthContextType {
  user: User | null;
  permissions: string[];
  loading: boolean;
  login: (userObj: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const setAuth = (userObj: User) => {
    setUser(userObj);
    setPermissions(userObj?.permissions || []);
  };

  // ✅ Login function
  const login = (userObj: User, token: string) => {
    setAuth(userObj);
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setPermissions([]);
    localStorage.removeItem("token");
    localStorage.removeItem("agencies");
    localStorage.removeItem("activeAgencyId");
    delete axios.defaults.headers.common["Authorization"];
  };

  // ✅ Load current user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    (async () => {
      try {
        const res = await axios.get<User>("http://localhost:5000/api/loginUser");
        setAuth(res.data);
      } catch (err: unknown) {
        console.error("Auth fetch error:", err);
        setUser(null);
        setPermissions([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, permissions, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
