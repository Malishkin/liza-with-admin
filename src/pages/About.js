import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [about, setAbout] = useState(null);

  const apiBaseUrl =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/about`);
        setAbout(response.data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAbout();
  }, [apiBaseUrl]);

  if (!about) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-container">
      <div className="about-text">
        <p>{about.text}</p>
      </div>
      <div className="about-image">
        <img src={about.image} alt="El Messeg" />
      </div>
    </div>
  );
};

export default About;
