import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
} from "../controllers/userController.js";
import {
  userRegistrationValidations,
  userLoginValidations,
  userUpdateProfileValidations,
} from "../validations/userRegistrationValidations.js";
import { checkValidationErrors } from "../middleware/checkValidationErrors.js";

const router = express.Router();

router.post(
  "/register",
  userRegistrationValidations(),
  checkValidationErrors,
  registerUser
);
router.post("/login", userLoginValidations(), checkValidationErrors, loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile/:id")
  .get(getUserProfile)
  .put(checkValidationErrors, updateUserProfile);

export default router;
