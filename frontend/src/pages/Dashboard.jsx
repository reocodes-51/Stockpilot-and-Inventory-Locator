import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

// import {
//   FiGrid,
//   FiPackage,
//   FiMap,
//   FiBarChart2,
//   FiSettings,
// } from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loggedUser =
      localStorage.getItem("user");

    if (!loggedUser) {
      navigate("/");
      return;
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalQuantity = products.reduce(
    (sum, product) =>
      sum + Number(product.quantity),
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.quantity < 20
  );

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.quantity) *
        Number(product.price || 0),
    0
  );

  return (
    <div className="dashboard">

    <Sidebar />
      {/* Main Content */}
      <div className="main">

        <div className="topbar">
          <div>
            <h1>Dashboard</h1>

            <p>
              Overview of inventory and
              warehouse operations
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="cards">

          <div className="card">
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>

          <div className="card">
            <p>Total Stock Units</p>
            <h2>{totalQuantity}</h2>
          </div>

          <div className="card">
            <p>Inventory Value</p>
            <h2>
              ₹{inventoryValue.toLocaleString()}
            </h2>
          </div>

          <div className="card">
            <p>Low Stock Items</p>
            <h2>
              {lowStockProducts.length}
            </h2>
          </div>

          <div className="card">
              <p>Current Streak</p>
              <h2>
                {user?.currentStreak || 1} Days
              </h2>
            </div>

            <div className="card">
              <p>Longest Streak</p>
              <h2>
                {user?.longestStreak || 1} Days
              </h2>
            </div>

        </div>

        {/* Bottom Section */}
        <div
          className="sections"
          style={{ marginTop: "20px" }}
        >

          {/* Low Stock Alerts */}
          <div className="panel">

            <h2>Low Stock Alerts</h2>

            {lowStockProducts.length === 0 ? (
              <p>
                All products are sufficiently stocked.
              </p>
            ) : (
              lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="low-stock-item"
                >
                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <br />

                    <small>
                      {product.productId}
                    </small>
                  </div>

                  <span className="low-stock-count">
                    {product.quantity} left
                  </span>
                </div>
              ))
            )}

          </div>

          {/* Recent Products */}
          <div className="panel">

            <h2>Recent Products</h2>

            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product._id}
                    className="recent-product"
                  >
                    <strong>
                      {product.name}
                    </strong>
                  </div>
                ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;