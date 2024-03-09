import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserProfile,
} from "../controllers/userController.js";
import {
  userRegistrationValidations,
  userLoginValidations,
} from "../validations/userRegistrationValidations.js";
import { checkValidationErrors } from "../middleware/checkValidationErrors.js";

const router = express.Router();

// todo: protect these routes once able
router.post(
  "/register",
  userRegistrationValidations(),
  checkValidationErrors,
  registerUser
);
router.post("/login", userLoginValidations(), checkValidationErrors, loginUser);
router.post("/logout", logoutUser);
router.put("/update-user/:id", updateUser);
router.get("/profile", getUserProfile);

export default router;
