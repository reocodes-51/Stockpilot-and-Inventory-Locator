import { useState } from "react";

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    category: "",
    quantity: "",
    shelf: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddProduct(formData);

    setFormData({
      productId: "",
      name: "",
      category: "",
      quantity: "",
      shelf: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input
        type="text"
        name="productId"
        placeholder="Product ID"
        value={formData.productId}
        onChange={handleChange}
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
      />

      <input
        type="text"
        name="shelf"
        placeholder="Shelf"
        value={formData.shelf}
        onChange={handleChange}
      />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;