import { body } from "express-validator";
import User from "../models/userModel.js";

export const userRegistrationValidations = () => [
  body("firstName").notEmpty().trim().withMessage("Missing first name"),
  body("lastName").notEmpty().trim().withMessage("Missing last name"),
  body("username")
    .notEmpty()
    .trim()
    .withMessage("Missing username")
    .custom(async (username) => {
      const existingUsername = await User.findUserByUsername(username);
      if (existingUsername) {
        throw new Error("Username already exists");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Missing email")
    .isEmail()
    .withMessage("Please provide valid email")
    .custom(async (email) => {
      const existingUser = await User.findUserByEmail(email);
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),
  body("password")
    .notEmpty()
    .trim()
    .withMessage("Missing password")
    .isStrongPassword({
      minLength: 4, // Adjust this value to match your actual requirement
      minLowercase: 0, // Optionally relax other criteria if you only care about length
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })
    .withMessage("Password must contain at least 5 character"),
];

export const userLoginValidations = () => [
  body("username").notEmpty().trim().withMessage("Missing username"),
  body("password").notEmpty().trim().withMessage("Missing password"),
];
