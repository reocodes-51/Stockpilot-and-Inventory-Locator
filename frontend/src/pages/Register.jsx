import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
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

          <form
            onSubmit={
              handleRegister
            }
          >

            <label>
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
            />

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
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
            />

            <button
              type="submit"
              className="signin-btn"
            >
              Register
            </button>

          </form>

          <div className="register-link">
            Already have an
            account?

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