import express from "express";
import {
  register,
  login,
  addAddress,
  getAddresses,
  removeAddress,
  setDefaultAddress
} from "../controllers/userController.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

// 🔐 auth
router.post("/register", register);
router.post("/login", login);

// 📍 endereço
router.post("/address", auth, addAddress);
router.get("/address", auth, getAddresses);
router.delete("/address/:addressId", auth, removeAddress);
router.put("/address/default/:addressId", auth, setDefaultAddress);





export default router;