import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  userRegistrationValidations,
  userLoginValidations,
  userUpdateProfileValidations,
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
router.route("/profile/:id").get(getUserProfile).put(
  // userUpdateProfileValidations(),
  checkValidationErrors,
  updateUserProfile
);

export default router;
