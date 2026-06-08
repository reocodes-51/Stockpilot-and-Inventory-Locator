import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);

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

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.quantity < 20
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Total Products */}
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            width: "200px",
          }}
        >
          <h2>Total Products</h2>
          <h1>{products.length}</h1>
        </div>

        {/* Total Quantity */}
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            width: "200px",
          }}
        >
          <h2>Total Quantity</h2>
          <h1>{totalQuantity}</h1>
        </div>

        {/* Low Stock Count */}
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            width: "200px",
          }}
        >
          <h2>Low Stock Items</h2>
          <h1>{lowStockProducts.length}</h1>
        </div>
      </div>

      {/* Low Stock Products List */}
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <h2>Low Stock Products</h2>

        {lowStockProducts.length === 0 ? (
          <p>All products are sufficiently stocked.</p>
        ) : (
          <ul>
            {lowStockProducts.map((product) => (
              <li key={product._id}>
                {product.name} - {product.quantity} left
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;