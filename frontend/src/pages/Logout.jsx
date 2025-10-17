import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await fetch("http://127.0.0.1:8000/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Logout error:", error);
        }
      }

      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      navigate("/login");
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow text-center">
        <h4>Logging you out...</h4>
      </div>
    </div>
  );
}

export default Logout;
