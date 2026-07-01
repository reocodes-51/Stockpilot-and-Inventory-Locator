import { useEffect, useState } from "react";
import API from "../services/api";
import "./Analytics.css";
import Sidebar from "../components/Sidebar";
import { generateAIInsights } from "../services/aiApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import ReactMarkdown from "react-markdown";

function Analytics() {
  const [products, setProducts] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
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

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.quantity) *
      Number(product.price || 0),
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.quantity < 20
  );

  const avgValue =
    products.length > 0
      ? inventoryValue / products.length
      : 0;

  const topProducts = [...products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const monthlyData = [
    { month: "Jan", added: 12 },
    { month: "Feb", added: 18 },
    { month: "Mar", added: 22 },
    { month: "Apr", added: 15 },
    { month: "May", added: 28 },
    { month: "Jun", added: 24 },
  ];

  const handleAIInsights = async () => {
  setLoadingAI(true);

  const summary = await generateAIInsights();

  setAiSummary(summary);

  setLoadingAI(false);
};

return (
  <div className="dashboard">

    <Sidebar />

    <div className="main">

      <div className="analytics-page">

      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>
          Insights and inventory analytics
        </p>
      </div>

      {/* Cards */}

      <div className="analytics-cards">

        <div className="analytics-card">
          <p>Total Inventory Value</p>
          <h2>
            ₹{inventoryValue.toLocaleString()}
          </h2>
        </div>

        <div className="analytics-card">
          <p>Total Products</p>
          <h2>{products.length}</h2>
        </div>

        <div className="analytics-card">
          <p>Low Stock Alerts</p>
          <h2>{lowStockProducts.length}</h2>
        </div>

        <div className="analytics-card">
          <p>Average Value/Product</p>
          <h2>
            ₹{avgValue.toFixed(0)}
          </h2>
        </div>

        <div className="analytics-panel">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >

          <h2>AI Warehouse Assistant</h2>

          <button
            className="generate-ai-btn"
            onClick={handleAIInsights}
          >
            Generate AI Insights
          </button>

        </div>

        {loadingAI ? (

          <p>Generating AI Insights...</p>

        ) : (

      <div className="ai-report">
        <ReactMarkdown>{aiSummary}</ReactMarkdown>
      </div>

        )}

      </div>

      </div>

      {/* Charts */}

      <div className="analytics-grid">

        <div className="analytics-panel">

          <h2>
            Top Products by Quantity
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="quantity"
                fill="#10B981"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="analytics-panel">

          <h2>
            Monthly Product Additions
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="added"
                stroke="#8B5CF6"
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Low Stock Table */}

      <div className="analytics-panel">

        <h2>Low Stock Alerts</h2>

        <table className="analytics-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>

            {lowStockProducts.length === 0 ? (
              <tr>
                <td colSpan="3">
                  No low stock products
                </td>
              </tr>
            ) : (
              lowStockProducts.map(
                (product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>

                    <td>
                      {product.quantity}
                    </td>

                    <td>
                      ₹{product.price || 0}
                    </td>
                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

      </div>

    </div>

  </div>
);
}

export default Analytics;