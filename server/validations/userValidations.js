import { body } from "express-validator";
import User from "../models/userModel.js";

export const userValidations = () => [
  body("firstName").notEmpty().trim().withMessage("Missing first name"),
  body("lastName").notEmpty().trim().withMessage("Missing last name"),
  body("username").notEmpty().trim().withMessage("Missing username"),
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
    .withMessage("Missing email")
    .isStrongPassword(() => {
      minLength: 5;
    })
    .trim()
    .withMessage("Password must contain more than 5 characters"),
];
