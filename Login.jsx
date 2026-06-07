import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api/axios";

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
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

  // Frontend validation
  if (!form.email || !form.password) {
    setError("Please fill all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    setError("Enter a valid email");
    return;
  }

  if (form.password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  try {
    const { data } = await API.post("/auth/login", form);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful");
    navigate("/");
  } catch (error) {
    setError(
      error.response?.data?.message ||
      "Login Failed"
    );
  }
};
    return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT */}

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
              Elevate Your
              <br />
              Style
            </h1>

            <p>
              Luxury Fashion Curated
              For Modern Elegance.
            </p>

            <div className="square-design">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

          </div>

        </div>

        {/* WAVE */}

        <div className="wave-divider"></div>

        {/* RIGHT */}

        <div className="auth-right">

          <div className="form-card">

            <h2>
              <span>Iconique</span> Sign In
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  👁
                </button>
              </div>

              <button
                type="button"
                className="forgot-btn"
              >
                Forgot Password?
              </button>

              {error && (
                <p className="error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="submit-btn"
              >
                Sign In
              </button>

            </form>

            <div className="or-divider">
              <span></span>
              OR
              <span></span>
            </div>

            <div className="social-row">

              <button>G</button>
              <button>f</button>
              <button></button>

            </div>

            <p className="switch-text">

              Don't have an account?

              <button
                type="button"
                onClick={() =>
                  navigate("/signup")
                }
              >
                Create Account
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}