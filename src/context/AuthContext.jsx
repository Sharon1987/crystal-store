import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 初始值：先去檢查 localStorage 有沒有存過的 user 資料
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // 登入時存起來
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 登出時清掉
    localStorage.removeItem("token"); // 如果有 token 也順便清掉
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);