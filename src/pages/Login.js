import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
};

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkTokenExpiration()) {
      setToken(null);
    }
  }, [setToken]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate("/admin");
      })
      .catch((err) => {
        setErrorMessage("Invalid credentials, please try again.");
        console.error(err);
        setForm({ username: "", password: "" });
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-group">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="login-group">
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <span className="password-toggle-icon" onClick={toggleShowPassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
