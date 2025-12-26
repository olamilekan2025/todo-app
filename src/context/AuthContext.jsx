import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "todo_users";
const LOGGED_USER_KEY = "todo_logged_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔁 Load logged-in user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem(LOGGED_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 SIGNUP (saved forever)
  const signup = (username, email, password) => {
    const normalizedEmail = email.toLowerCase().trim();

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      users = [];
    }

    const emailExists = users.some(
      (u) => u.email === normalizedEmail
    );

    if (emailExists) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      id: Date.now(),
      username: username.trim(),
      email: normalizedEmail,
      password, // (hash later if needed)
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true };
  };

  // 🔓 LOGIN (uses saved users)
  const login = (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      users = [];
    }

    const foundUser = users.find(
      (u) =>
        u.email === normalizedEmail &&
        u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    const loggedUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };

    setUser(loggedUser);
    localStorage.setItem(
      LOGGED_USER_KEY,
      JSON.stringify(loggedUser)
    );

    return { success: true };
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOGGED_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
