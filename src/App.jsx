// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import TodoApp from './TodoApp.jsx'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       <TodoApp />
//     </div>
//   )
// }

// export default App





import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./context/Login";
import Signup from "./context/Signup";
import TodoApp from "./TodoApp";

const AuthGate = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (user) return <TodoApp />;

  return showLogin ? (
    <Login switchToSignup={() => setShowLogin(false)} />
  ) : (
    <Signup switchToLogin={() => setShowLogin(true)} />
  );
};

const App = () => (
  <AuthProvider>
    <AuthGate />
  </AuthProvider>
);

export default App;

