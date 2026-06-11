#  AI Smart Warehouse Management System

An intelligent warehouse management platform designed to streamline inventory tracking, warehouse operations, and stock monitoring through QR-code-based product identification, real-time inventory management, analytics, and warehouse location mapping.

---

##  Overview

AI Smart Warehouse is a full-stack web application that helps warehouses efficiently manage products, monitor inventory levels, visualize storage locations, and improve operational efficiency. The system provides secure authentication, inventory management, QR code generation, warehouse mapping, and analytics in a centralized dashboard.

---

##  Features

###  Authentication & Security
- User Registration and Login
- JWT-based Authentication
- Protected Routes
- Role-Based Access Control

###  Inventory Management
- Add, Update, Delete Products
- Search and Filter Inventory
- Real-Time Stock Tracking
- Product Information Management

###  QR Code Integration
- Generate Unique QR Codes for Products
- Download and Print QR Codes
- Quick Product Identification
- Fast Inventory Lookup

###  Warehouse Mapping
- Visual Warehouse Layout
- Product Location Tracking
- Storage Position Management
- Easy Product Navigation

###  Analytics Dashboard
- Inventory Statistics
- Stock Distribution Analysis
- Product Monitoring
- Operational Insights

###  Smart Alerts
- Low Stock Notifications
- Inventory Monitoring
- Stock Status Tracking

###  Settings Management
- User Profile Management
- Account Configuration
- System Preferences

---

##  Tech Stack

### Frontend
- React.js
- Vite
- CSS3
- Axios
- React Icons

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Tokens)
- bcryptjs

### Additional Libraries
- QRCode
- Recharts
- Lucide React

---

##  System Architecture

```text
Frontend (React + Vite)
          │
          ▼
REST API (Express.js)
          │
          ▼
MongoDB Atlas Database
          │
          ▼
Warehouse Inventory Data
```

---

##  Project Structure

```text
AI-Smart-Warehouse/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/reocodes-51/Stockpilot-and-Inventory-Locator.git
cd Stockpilot-and-Inventory-Locator
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start Backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

Backend will run on:

```text
http://localhost:5000
```

---

## 📸 Key Modules

### Dashboard
- Inventory Overview
- Product Statistics
- Stock Monitoring

### Inventory
- Product CRUD Operations
- Search & Filtering
- Product Details

### QR Management
- Generate Product QR Codes
- Download & Print Codes

### Warehouse Map
- Track Product Locations
- Visual Warehouse Layout

### Analytics
- Inventory Trends
- Stock Insights
- Performance Monitoring

---

##  Future Enhancements

- AI-Based Demand Forecasting
- Smart Warehouse Optimization
- Barcode Scanner Integration
- Real-Time IoT Sensor Connectivity
- Predictive Inventory Management
- Automated Reordering System
- Multi-Warehouse Support

---

##  Use Cases

- Warehouses
- Distribution Centers
- Retail Inventory Management
- Manufacturing Storage Facilities
- Logistics Operations

---

##  Team Project

Developed as a full-stack warehouse management solution to improve inventory visibility, operational efficiency, and stock tracking through modern web technologies and intelligent inventory workflows.

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
