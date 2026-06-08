import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Inventory from "./pages/Inventory";
import WarehouseMap from "./pages/WarehouseMap";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "20px" }}>
            Warehouse Locator
          </Link>

          <Link to="/inventory">
            Inventory
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<WarehouseMap />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;