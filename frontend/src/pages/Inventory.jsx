import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductQR from "../components/ProductQR";
import "./Inventory.css";

import {
  FiGrid,
  FiPackage,
  FiMap,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

function Inventory() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async (productData) => {
    try {
      await API.post("/products", productData);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  const saveUpdate = async () => {
    try {
      await API.put(
        `/products/${editingProduct._id}`,
        editingProduct
      );

      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.productId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) 
  );

  const getStatus = (quantity) => {
    if (quantity < 10) return "Low";
    if (quantity < 25) return "Medium";
    return "Good";
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="logo">
          📑 Mahakaushal Traders
        </div>

        <div
          className="menu-item"
          onClick={() => navigate("/dashboard")}
        >
          <FiGrid />
          Dashboard
        </div>

        <div className="menu-item active">
          <FiPackage />
          Inventory
        </div>

        <div
          className="menu-item"
          onClick={() =>
            navigate("/warehouse-map")
          }
        >
          <FiMap />
          Warehouse Map
        </div>

        <div
          className="menu-item"
          onClick={() => navigate("/analytics")}
        >
          <FiBarChart2 />
          Analytics
        </div>

        <div
          className="menu-item"
          onClick={() => navigate("/settings")}
        >
          <FiSettings />
          Settings
        </div>

        <div
          className="menu-item logout-item"
          onClick={() => navigate("/")}
        >
          Sign Out
        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="main">

        <div className="inventory-header">
          <div>
            <h1>Inventory</h1>
            <p>
              {products.length} products tracked
            </p>
          </div>
        </div>

        {/* ADD PRODUCT */}

        <div className="form-section">
          <ProductForm onAddProduct={addProduct} />
        </div>

        {/* SEARCH */}

        <div className="top-controls">

          <input
            className="search-input"
            type="text"
            placeholder="Search name, ID..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

        {/* EDIT PRODUCT */}

        {editingProduct && (
          <div className="edit-box">

            <h3>Edit Product</h3>

            <input
              type="number"
              placeholder="Quantity"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  quantity: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={editingProduct.price || 0}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: Number(e.target.value),
                })
              }
            />

            <button
              className="save-btn"
              onClick={saveUpdate}
            >
              Save Changes
            </button>

          </div>
        )}
      
        {/* TABLE */}

        <div className="table-wrapper">

          <table className="inventory-table">

            <thead>
              <tr>
                <th>PRODUCT ID</th>
                <th>NAME</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>LOCATION</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => (
                <tr key={product._id}>

                  <td>{product.productId}</td>

                  <td>
                    <strong>
                      {product.name}
                    </strong>
                  </td>

                  <td>
                    {product.quantity}
                  </td>

                  <td>
                    ₹{product.price || 0}
                  </td>

                  <td>
                    {product.shelf}
                  </td>

                  <td>
                    <span
                      className={`status-${getStatus(
                        product.quantity
                      ).toLowerCase()}`}
                    >
                      ● {getStatus(product.quantity)}
                    </span>
                  </td>

                  <td>

                    <button
                      className="action-btn edit-btn"
                      onClick={() =>
                        editProduct(product)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="action-btn delete-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Delete this product?"
                          )
                        ) {
                          deleteProduct(
                            product._id
                          );
                        }
                      }}
                    >
                      Delete
                    </button>

                    <button
                      className="action-btn qr-btn"
                      onClick={() =>
                        setSelectedProduct(
                          product
                        )
                      }
                    >
                      QR
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* QR */}

        <div className="qr-section">
          <ProductQR
            product={selectedProduct}
          />
        </div>

      </div>

    </div>
  );
}

export default Inventory;