import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
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
            Intelligent inventory management
            that keeps your warehouse
            operations running smoothly.
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
          <h1>Welcome Back</h1>

          <p>
            Sign in to your account
          </p>

          <form onSubmit={handleLogin}>
            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <label>Password</label>

            <div className="password-box">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
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
              type="submit"
              className="signin-btn"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          <div className="register-link">
            Don't have an account?{" "}
            <span
              onClick={() =>
                navigate("/register")
              }
              style={{
                cursor: "pointer",
                color: "#3b82f6",
              }}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;