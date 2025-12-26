// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import "./Auth.css";

// const Signup = ({ switchToLogin }) => {
//   const { signup } = useAuth();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = () => {
//     if (!username || !email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     const res = signup(username, email, password);

//     if (!res.success) {
//       setError(res.message);
//     } else {
//       setError("");
//       switchToLogin();
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Create Account</h2>
//       {error && <h6 className="error">{error}</h6>}

//       <input
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Email address"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignup}>Sign Up</button>

//       <p>
//         Already have an account?
//         <span onClick={switchToLogin}> Login</span>
//       </p>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";

const Signup = ({ switchToLogin }) => {
  const { signup } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    const res = signup(username, email, password);

    if (!res.success) {
      setError(res.message);
    } else {
      setError("");
      switchToLogin();
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {error && <h6 className="error">{error}</h6>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="password-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleSignup}>Sign Up</button>

      <p>
        Already have an account?
        <span onClick={switchToLogin}> Login</span>
      </p>
    </div>
  );
};

export default Signup;

