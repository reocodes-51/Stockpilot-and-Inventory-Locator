import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Inventory from "./pages/Inventory";
import WarehouseMap from "./pages/WarehouseMap";
import Dashboard from "./pages/Dashboard";
import QRScanner from "./pages/QRScanner";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "20px" }}>
            Warehouse Locator
          </Link>

          <Link
            to="/inventory"
            style={{ marginRight: "20px" }}
          >
            Inventory
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>
        </nav>

        <Link
          to="/scanner"
          style={{ marginRight: "20px" }}
        >
          QR Scanner
        </Link>

        <Routes>
          <Route path="/" element={<WarehouseMap />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/scanner"
            element={<QRScanner />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;