import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Inventory from "./pages/Inventory";
import WarehouseMap from "./pages/WarehouseMap";
import Dashboard from "./pages/Dashboard";
import OrderFulfillment from "./pages/OrderFulfillment";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link
            to="/"
            style={{ marginRight: "20px" }}
          >
            Warehouse Locator
          </Link>

          <Link
            to="/inventory"
            style={{ marginRight: "20px" }}
          >
            Inventory
          </Link>
          <Link
            to="/orders"
            style={{ marginRight: "20px" }}
          >
            Orders
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<WarehouseMap />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />
          <Route
            path="/orders"
            element={<OrderFulfillment />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;