import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Work.css";

const Work = () => {
  const [workData, setWorkData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/content");
        setWorkData(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="work-container">
      {workData.map((categoryData, index) => (
        <div className="work-category" key={index}>
          <h2 className="category-title">
            {categoryData.category.toUpperCase()}
          </h2>
          <div className="work-gallery">
            {categoryData.images.map((image, idx) => (
              <div className="work-item" key={idx}>
                <img src={image} alt={`Work ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Work;
