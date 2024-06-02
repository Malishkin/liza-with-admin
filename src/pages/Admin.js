import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Измените этот импорт
import "./Admin.css";

const checkTokenExpiration = (setToken, navigate) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setToken(null);
    navigate("/login");
    return false;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    return false;
  }

  return true;
};

const Admin = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [form, setForm] = useState({
    category: "",
    description: "",
    images: [],
  });
  const [aboutText, setAboutText] = useState("");
  const [aboutImage, setAboutImage] = useState(null);

  useEffect(() => {
    if (!checkTokenExpiration(setToken, navigate)) return;

    axios
      .get("http://localhost:5000/api/content", {
        headers: { "x-auth-token": token },
      })
      .then((res) => setContent(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/about")
      .then((res) => {
        setAboutText(res.data.text);
        setAboutImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, [token, navigate, setToken]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      images: e.target.files,
    });
  };

  const handleAboutTextChange = (e) => {
    setAboutText(e.target.value);
  };

  const handleAboutImageChange = (e) => {
    setAboutImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("description", form.description);
    Array.from(form.images).forEach((file) => {
      formData.append("images", file);
    });

    axios
      .post("http://localhost:5000/api/content", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setContent([...content, res.data]);
        setForm({
          category: "",
          description: "",
          images: [],
        });
      })
      .catch((err) => console.error(err));
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", aboutText);
    if (aboutImage) {
      formData.append("image", aboutImage);
    }

    axios
      .post("http://localhost:5000/api/about", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("About page updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/content/${id}`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        setContent(content.filter((item) => item._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-group">
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </div>
        <div className="admin-group">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          ></textarea>
        </div>
        <div className="admin-group">
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="admin-group">
          <button type="submit">Save</button>
        </div>
      </form>
      <h2>About Page</h2>
      <form onSubmit={handleAboutSubmit}>
        <div className="admin-group">
          <textarea
            value={aboutText}
            onChange={handleAboutTextChange}
            placeholder="About Text"
            required
          ></textarea>
        </div>
        <div className="admin-group">
          <input
            type="file"
            name="aboutImage"
            onChange={handleAboutImageChange}
          />
        </div>
        <div className="admin-group">
          <button type="submit">Save</button>
        </div>
      </form>
      <h2 className="content-title">Content List</h2>
      <div className="content-list">
        {content.map((item) => (
          <div className="content-item" key={item._id}>
            <h3>{item.category}</h3>
            <p>{item.description}</p>
            {item.images.map((img, idx) => (
              <img key={idx} src={img} alt={item.category} />
            ))}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
