import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api/axios";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  // Frontend Validation
  if (
    !form.fullName ||
    !form.email ||
    !form.phone ||
    !form.password ||
    !form.confirmPassword
  ) {
    setError("Please fill all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    setError("Enter valid email");
    return;
  }

  if (form.password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const { data } = await API.post("/auth/signup", {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    alert(data.message || "Account Created Successfully");

    navigate("/login");
  } catch (error) {
    setError(
      error.response?.data?.message ||
      "Signup Failed"
    );
  }
};

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-left">

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Go Back
          </button>

          <div className="left-content">

            <span className="brand">
              ICONIQUE
            </span>

            <h1>
              Join The
              <br />
              Community
            </h1>

            <p>
              Exclusive Collections,
              Early Access & Offers.
            </p>

            <div className="square-design">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

          </div>

        </div>

        <div className="wave-divider"></div>

        <div className="auth-right">

          <div className="form-card">

            <h2>
              <span>Iconique</span> Sign Up
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              {error && (
                <p className="error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="submit-btn"
              >
                Create Account
              </button>

            </form>

            <p className="switch-text">

              Already have an account?

              <button
                type="button"
                onClick={() =>
                  navigate("/login")
                }
              >
                Sign In
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}