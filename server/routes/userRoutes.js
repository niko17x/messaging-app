import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-user/:id", updateUser);
router.get("/profile/:id", getUserProfile);

export default router;
