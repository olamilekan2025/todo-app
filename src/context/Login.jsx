import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = ({ switchToSignup }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const res = login(email, password);

    if (!res.success) {
      setError(res.message);
    } else {
      setError("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      {error && <h6 className="error">{error}</h6>}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account?
        <span onClick={switchToSignup}> Sign up</span>
      </p>
    </div>
  );
};

export default Login;
