import { useEffect, useState } from "react";
import API from "../services/api";


function WarehouseMap() {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedShelf, setSelectedShelf] = useState("");

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
  const findShelf = () => {
  const product = products.find(
    (p) =>
      p.name.toLowerCase() ===
      searchTerm.toLowerCase()
  );

  if (product) {
    setSelectedShelf(product.shelf);
  } else {
    alert("Product not found");
  }
};



  const shelves = [
    "A1", "A2", "A3",
    "B1", "B2", "B3",
    "C1", "C2", "C3",
  ];

  return (
    <div>
      <h1>Warehouse Locator</h1>
      <input
        type="text"
        placeholder="Search Product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

        <button onClick={findShelf}>
        Locate Product
        </button>

        {selectedShelf && (
        <h2>
        Located at Shelf {selectedShelf}
        </h2>
    )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {shelves.map((shelf) => (
          <div
            key={shelf}
            style={{
              border: "1px solid black",
              padding: "30px",
              textAlign: "center",
            }}
          >
            {shelf}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WarehouseMap;