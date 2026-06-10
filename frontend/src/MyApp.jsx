import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import WarehouseMap from "./pages/WarehouseMap";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Register from "./pages/Register";

function MyApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />


        <Route
          path="/register"
          element={<Register />}
        />
        
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/warehouse-map"
          element={<WarehouseMap />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MyApp;