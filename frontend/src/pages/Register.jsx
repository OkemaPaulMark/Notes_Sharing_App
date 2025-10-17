import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://notes-sharing-apps.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setFormData({ username: "", email: "", password: "" });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "Registration failed.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow text-center"
        style={{ width: "350px", borderRadius: "12px" }}
      >
        <h3 className="mb-2 text-primary fw-bold">Notes Sharing App</h3>
        <h5 className="mb-3 text-dark">Create an Account</h5>
        {message && <div className="alert alert-info py-2">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2 text-start">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2 text-start">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 mb-2">
            Register
          </button>

          <p className="text-muted mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
