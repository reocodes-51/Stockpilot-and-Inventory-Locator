import { useState } from "react";

function ProductForm({ onAddProduct, products = [] }) {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    quantity: "",
    shelf: "",
    price: "",
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
      quantity: "",
      shelf: "",
      price: "",
    });
  };

  // Generate all shelves A11-A55, B11-B55, C11-C55, D11-D55

  const allShelves = [];

  ["A", "B", "C", "D"].forEach((section) => {
    [1, 2, 3, 4, 5].forEach((row) => {
      [1, 2, 3, 4, 5].forEach((col) => {
        allShelves.push(`${section}${row}${col}`);
      });
    });
  });

  // Remove occupied shelves

  const occupiedShelves = products.map(
    (product) => product.shelf
  );

  const availableShelves = allShelves.filter(
    (shelf) => !occupiedShelves.includes(shelf)
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input
        type="text"
        name="productId"
        placeholder="Product ID"
        value={formData.productId}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <select
        name="shelf"
        value={formData.shelf}
        onChange={handleChange}
        required
      >
        <option value="">
          Select Shelf
        </option>

        {availableShelves.map((shelf) => (
          <option
            key={shelf}
            value={shelf}
          >
            {shelf}
          </option>
        ))}
      </select>

      <button type="submit">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;