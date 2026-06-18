import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiMap,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">

      <div className="logo">
        📑 Mahakaushal Traders
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/dashboard"
            ? "active"
            : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <FiGrid />
        Dashboard
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/inventory"
            ? "active"
            : ""
        }`}
        onClick={() => navigate("/inventory")}
      >
        <FiPackage />
        Inventory
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/warehouse-map"
            ? "active"
            : ""
        }`}
        onClick={() => navigate("/warehouse-map")}
      >
        <FiMap />
        Warehouse Map
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/analytics"
            ? "active"
            : ""
        }`}
        onClick={() => navigate("/analytics")}
      >
        <FiBarChart2 />
        Analytics
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/settings"
            ? "active"
            : ""
        }`}
        onClick={() => navigate("/settings")}
      >
        <FiSettings />
        Settings
      </div>

      <div className="profile">
        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h4>{user?.name}</h4>
          <p>Admin</p>
        </div>
      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Sign Out
      </button>

    </div>
  );
}

export default Sidebar;