import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import "./Login.css";
import GoogleIcon from '../assets/google-icon.png';
import FacebookIcon from '../assets/facebook-icon.png';
import AppleIcon from '../assets/apple-icon.png';
import WaveBg from '../assets/wave1.png';

const Login = () => {
  const { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(e, username, password);
  };

  return (
    <div className="login-body" style={{ backgroundImage: `url(${WaveBg})` }}>
      <div className="top-bar">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="Plunge Logo" className="logo" />
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="nav-btn signin-btn">Sign In</Link>
          <Link to="/signup" className="nav-btn signin-btn">Sign Up</Link>
        </div>
      </div>

      <div className="login-card">
        <h2 className="welcome-text">Welcome to Plunge</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn">Sign In</button>

          <div className="social-icons">
            <button type="button" className="social-icon"><img src={GoogleIcon} alt="Google" /></button>
            <button type="button" className="social-icon"><img src={FacebookIcon} alt="Facebook" /></button>
            <button type="button" className="social-icon"><img src={AppleIcon} alt="Apple" /></button>
          </div>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
