import { useEffect, useState } from "react";
import API from "../services/api";
import "./WarehouseMap.css";
import Sidebar from "../components/Sidebar";

function WarehouseMap() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");

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

  const findShelf = () => {
    const product = products.find(
      (p) =>
        p.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        p.productId
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    if (product) {
      setSelectedShelf(product.shelf);
    } else {
      alert("Product not found");
      setSelectedShelf("");
    }
  };

  const sections = ["A", "B", "C", "D"];

  const getShelfProduct = (shelfCode) => {
    return products.find(
      (product) => product.shelf === shelfCode
    );
  };

  const getShelfClass = (product) => {
    if (!product) return "empty";

    if (product.quantity < 10) return "low";

    if (product.quantity < 25) return "medium";

    return "good";
  };

  // return (
  //   <div className="warehouse-page">
  return (
  <div className="dashboard">

    <Sidebar />

    <div className="main">

      <div className="warehouse-header">
        <div>
          <h1>Warehouse Map</h1>
          <p>
            Visual layout of all product locations
          </p>
        </div>

        <div className="search-area">
          <input
            className="warehouse-search"
            type="text"
            placeholder="Find product location..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <button
            className="locate-btn"
            onClick={findShelf}
          >
            Locate
          </button>
        </div>
      </div>

      {selectedShelf && (
        <div className="selected-info">
          Product Located at Shelf:
          <strong> {selectedShelf}</strong>
        </div>
      )}

      <div className="legend">
        <div>
          <span className="legend-box good"></span>
          Good Stock
        </div>

        <div>
          <span className="legend-box medium"></span>
          Medium Stock
        </div>

        <div>
          <span className="legend-box low"></span>
          Low Stock
        </div>

        <div>
          <span className="legend-box empty"></span>
          Empty
        </div>
      </div>

      <div className="section-grid">

        {sections.map((section) => (
          <div
            key={section}
            className="warehouse-card"
          >
            <div className="section-header">
              <h2>Section {section}</h2>
              <span>25 Shelves</span>
            </div>

            <div className="shelf-grid">

              {[1, 2, 3, 4, 5].map((row) =>
                [1, 2, 3, 4, 5].map((col) => {
                  const shelfCode =
                    `${section}${(row - 1) * 5 + col}`;

                  const product =
                    getShelfProduct(shelfCode);

                  const isSelected =
                    selectedShelf === shelfCode;

                  return (
                    <div
                      key={shelfCode}
                      className={`shelf ${getShelfClass(
                        product
                      )} ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                    >
                      {product ? (
                        <>
                          <div>
                            {product.quantity}
                          </div>

                          <small>
                            {product.productId}
                          </small>
                        </>
                      ) : (
                        "-"
                      )}
                    </div>
                  );
                })
              )}

            </div>
          </div>
        ))}

      </div>
       </div>
    </div>
  );
}

export default WarehouseMap;