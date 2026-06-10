import { useEffect, useState } from "react";
import API from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductQR from "../components/ProductQR";
import "./Inventory.css";

function Inventory() {
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
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getStatus = (quantity) => {
    if (quantity < 10) return "Low";
    if (quantity < 25) return "Medium";
    return "Good";
  };

  return (
    <div className="inventory-page">

      {/* HEADER */}
      <div className="inventory-header">
        <div>
          <h1>Inventory</h1>
          <p>{products.length} products tracked</p>
        </div>
      </div>

      {/* ADD PRODUCT FORM */}
      <div className="form-section">
        <ProductForm onAddProduct={addProduct} />
      </div>

      {/* SEARCH */}
      <div className="top-controls">

        <input
          className="search-input"
          type="text"
          placeholder="Search name, ID, category..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>

      {/* EDIT SECTION */}

      {editingProduct && (
        <div className="edit-box">

          <h3>Edit Product Quantity</h3>

          <input
            type="number"
            value={editingProduct.quantity}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                quantity: Number(e.target.value),
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
              <th>CATEGORY</th>
              <th>QTY</th>
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
                  <strong>{product.name}</strong>
                </td>

                <td>
                  <span className="category-badge">
                    {product.category}
                  </span>
                </td>

                <td>
                  <strong>{product.quantity}</strong>
                </td>

                <td>{product.shelf}</td>

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
                        deleteProduct(product._id);
                      }
                    }}
                  >
                    Delete
                  </button>

                  <button
                    className="action-btn qr-btn"
                    onClick={() =>
                      setSelectedProduct(product)
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

      {/* QR SECTION */}

      <div className="qr-section">

        <ProductQR product={selectedProduct} />

      </div>

    </div>
  );
}

export default Inventory;