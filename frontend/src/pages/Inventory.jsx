import { useEffect, useState } from "react";
import API from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductQR from "../components/ProductQR";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add product
  const addProduct = async (productData) => {
    try {
      await API.post("/products", productData);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit product
  const editProduct = (product) => {
    setEditingProduct(product);
  };

  // Save updated product
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

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory Management</h1>

      {/* Add Product Form */}
      <ProductForm onAddProduct={addProduct} />

      {/* Edit Product Section */}
      {editingProduct && (
        <div style={{ marginTop: "20px" }}>
          <h2>Edit Product</h2>

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
            style={{ marginLeft: "10px" }}
            onClick={saveUpdate}
          >
            Save
          </button>
        </div>
      )}

      {/* Search */}
      <h2 style={{ marginTop: "20px" }}>
        Search Product
      </h2>

      <p>
        Total Products Found: {filteredProducts.length}
      </p>

      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      {/* Product Table */}
      <table
        border="1"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Shelf</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.shelf}</td>

              <td>
                <button
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    editProduct(product)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      deleteProduct(product._id);
                    }
                  }}
                >
                  Delete
                </button>

                <button
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

      {/* QR Code Section */}
      <div style={{ marginTop: "30px" }}>
        <ProductQR product={selectedProduct} />
      </div>
    </div>
  );
}

export default Inventory;