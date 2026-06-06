import { useEffect, useState } from "react";
import API from "../services/api";
import ProductForm from "../components/ProductForm";

function Inventory() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
  try {
    const res = await API.get("/products");

    console.log("Products:", res.data);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("State:", products);

  return (
    <div>
      <h1>Inventory</h1>

      <ProductForm onAddProduct={addProduct} />
      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Shelf</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.shelf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;

