import { useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import WaveBg from '../assets/wave1.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
const response = await AxiosInstance.post("signup/", formData);
      toast.success(response.data.message || "Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data);
      toast.error("Signup failed. Please check your details.");
    }
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
        <h2 className="welcome-text">Create New Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter username" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="first_name" placeholder="Enter first name" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="last_name" placeholder="Enter last name" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Repeat Password</label>
            <input type="password" name="password2" placeholder="Repeat password" onChange={handleChange} required />
          </div>

          <button type="submit" className="login-btn">Sign Up</button>

          <div className="terms-text">
            By clicking Sign up, you agree to our 
            <Link to="/terms"> Terms of Service</Link>
          </div>

          <div className="signup-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
