const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Warehouse Backend Running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

//const connectDB = require("./config/db");
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use("/api/products", require("./routes/productRoutes"));