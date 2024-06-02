import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/admin"
            element={token ? <Admin token={token} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
