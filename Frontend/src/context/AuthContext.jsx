import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // load session once
  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  /* ---------- LOGIN ---------- */
  const login = (sessionData) => {
    localStorage.setItem("userSession", JSON.stringify(sessionData));
    setUser(sessionData);
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.removeItem("userSession");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* custom hook */
export const useAuth = () => useContext(AuthContext);