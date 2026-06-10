import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Later you will connect backend authentication here

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">🏭</div>
          <h2>AI Warehouse</h2>
        </div>

        <div className="hero-content">
          <h1>
            "Intelligent inventory management that keeps your warehouse
            operations running smoothly."
          </h1>

          <div className="stats">
            <div className="stat-card">
              <h2>50,000+</h2>
              <p>Products Tracked</p>
            </div>

            <div className="stat-card">
              <h2>99.9%</h2>
              <p>Uptime</p>
            </div>

            <div className="stat-card">
              <h2>200+</h2>
              <p>Warehouses</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="login-box">
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
            />

            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>

            <button
              type="submit"
              className="signin-btn"
            >
              Sign In
            </button>
          </form>

          <div className="register-link">
            Don't have an account? <span>Register</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;