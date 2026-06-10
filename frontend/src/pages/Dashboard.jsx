import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FiGrid,
  FiPackage,
  FiMap,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.quantity < 20
  );

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  const categoryMap = {};

  products.forEach((product) => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = 0;
    }

    categoryMap[product.category] += product.quantity;
  });

  const chartData = Object.keys(categoryMap).map(
    (category) => ({
      category,
      quantity: categoryMap[category],
    })
  );

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <div className="logo">
          🏭 AI Warehouse
        </div>

        <div className="menu-item active">
          <FiGrid />
          Dashboard
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/inventory")
          }
        >
          <FiPackage />
          Inventory
        </div>

        <div className="menu-item">
          <FiMap />
          Warehouse Map
        </div>

        <div className="menu-item">
          <FiBarChart2 />
          Analytics
        </div>

        <div className="menu-item">
          <FiSettings />
          Settings
        </div>

        <div className="profile">
          <div className="avatar">A</div>

          <div>
            <h4>Admin</h4>
            <p>Warehouse Manager</p>
          </div>
        </div>

      </div>

      {/* Main */}
      <div className="main">

        <div className="topbar">

          <div>
            <h1>Warehouse Dashboard</h1>
            <p>
              Overview of inventory and warehouse
              performance
            </p>
          </div>

          <input
            className="search-box"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

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
            <p>Low Stock Items</p>
            <h2>{lowStockProducts.length}</h2>
          </div>

          <div className="card">
            <p>Categories</p>
            <h2>{totalCategories}</h2>
          </div>

        </div>

        {/* Charts */}
        <div className="sections">

          <div className="panel">

            <h2>Stock by Category</h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={chartData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="quantity"
                  fill="#3B82F6"
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="panel">

            <h2>Category Distribution</h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="quantity"
                  nameKey="category"
                  outerRadius={100}
                  label
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Bottom Section */}
        <div
          className="sections"
          style={{ marginTop: "20px" }}
        >

          <div className="panel">

            <h2>Low Stock Alerts</h2>

            {lowStockProducts.length === 0 ? (
              <p>
                All products are sufficiently
                stocked.
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

          <div className="panel">

            <h2>Recent Products</h2>

            {filteredProducts
              .slice(0, 5)
              .map((product) => (
                <div
                  key={product._id}
                  style={{
                    marginBottom: "15px",
                    borderBottom:
                      "1px solid #1e293b",
                    paddingBottom: "10px",
                  }}
                >
                  <strong>
                    {product.name}
                  </strong>

                  <br />

                  <small>
                    {product.category}
                  </small>
                </div>
              ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;