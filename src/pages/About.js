import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [aboutText, setAboutText] = useState("");
  const [aboutImage, setAboutImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => {
        setAboutText(res.data.text);
        setAboutImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="about-container">
      <div className="about-text">
        {aboutText.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <h3>Services</h3>
        <ul>
          <li>Styling</li>
          <li>Creative Consulting</li>
        </ul>
      </div>
      <div className="about-image">
        {aboutImage && <img src={aboutImage} alt="El Messeg" />}
      </div>
    </div>
  );
};

export default About;
