import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new URLSearchParams();
    data.append("username", formData.username);
    data.append("password", formData.password);

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.access_token);
        setMessage("Login successful!");
        window.location.href = "/notes";
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "Login failed.");
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
        <h3 className="mb-2 text-success fw-bold">Notes Sharing App</h3>
        <h5 className="mb-3 text-dark">Login to Your Account</h5>
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

          <button type="submit" className="btn btn-success w-100 py-2 mb-2">
            Login
          </button>

          <p className="text-muted mb-0">
            Don’t have an account?{" "}
            <Link to="/" className="text-success fw-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
