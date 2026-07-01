const express = require("express");

const router = express.Router();

const {
  chatWithWarehouse,
} = require("../controllers/chatController");

router.post("/", chatWithWarehouse);

module.exports = router;