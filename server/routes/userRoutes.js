import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserProfile,
} from "../controllers/userController.js";
import { userValidations } from "../validations/userValidations.js";

const router = express.Router();

router.post("/register", userValidations(), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-user/:id", updateUser);
router.get("/profile", getUserProfile);

export default router;
