import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserProfile,
} from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("firstName")
      .notEmpty()
      .trim()
      .withMessage("First name must not be empty"),
    body("lastName")
      .notEmpty()
      .trim()
      .withMessage("Last name must not be empty"),
  ],
  registerUser
);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-user/:id", updateUser);
router.get("/profile", getUserProfile);

export default router;

// TODO: ADDING VALIDATIONS TO ITS OWN FILE AND IMPORT THEM TO THIS ROUTES FILE.
