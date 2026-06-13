import axios from "axios";

const API = axios.create({
  baseURL: "https://stockpilot-and-inventory-locator.onrender.com/api",
});

export default API;