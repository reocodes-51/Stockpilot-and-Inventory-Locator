import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/send-otp", {
        name,
        email,
        password,
        role,
      });

      alert("OTP sent to your email!");
      setShowOtp(true);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      alert(
        "Account Created Successfully!"
      );

      navigate("/");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "OTP Verification Failed"
      );
    }
  };

  return (
    <div className="login-container">

      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">
            🏭
          </div>

          <h2>AI Warehouse</h2>
        </div>
      </div>

      <div className="right-panel">

        <div className="login-box">

          <h1>Create Account</h1>

          <form onSubmit={handleSendOtp}>

            <label>
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              disabled={showOtp}
            />

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              disabled={showOtp}
            />

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              disabled={showOtp}
            />

            <label>
              Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              required
              disabled={showOtp}
            >
              <option value="worker">
                Worker
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            {!showOtp ? (
              <button
                type="submit"
                className="signin-btn"
              >
                Send OTP
              </button>
            ) : (
              <>
                <label>
                  Enter OTP
                </label>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                    )
                  }
                  placeholder="Enter OTP"
                  required
                />

                <button
                  type="button"
                  className="signin-btn"
                  onClick={
                    handleVerifyOtp
                  }
                >
                  Verify OTP
                </button>
              </>
            )}

          </form>

          <div className="register-link">
            Already have an account?

            <span
              onClick={() =>
                navigate("/")
              }
            >
              Login
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;