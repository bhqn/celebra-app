import express from "express";
import {
  register,
  login,
  addAddress,
  getAddresses,
  removeAddress,
  setDefaultAddress,
} from "../controllers/userController.js";
import { celebrate, Joi, Segments } from "celebrate";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

//  auth
router.post("/register", register);
router.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Email inválido",
        "any.required": "Email é obrigatório",
        "string.empty": "Email é obrigatório",
      }),

      password: Joi.string().min(6).required().messages({
        "string.min": "Senha deve ter no mínimo 6 caracteres",
        "any.required": "Senha é obrigatória",
        "string.empty": "Senha é obrigatória",
      }),
    }),
  }),
  login,
);

//  endereço
router.post("/address", auth, addAddress);
router.get("/address", auth, getAddresses);
router.delete("/address/:addressId", auth, removeAddress);
router.put("/address/default/:addressId", auth, setDefaultAddress);

export default router;
