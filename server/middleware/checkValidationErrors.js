// Custom middleware for extracting express validation errors (placed in routes)

import { validationResult } from "express-validator";

export const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
