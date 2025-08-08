import { body, validationResult } from "express-validator";
export const userrules = [
  body("name").notEmpty(),
  body("email").notEmpty().isEmail(),
  body("password")
    .notEmpty()
    .withMessage("password not empty")
    .isLength({
      min: 3,
    })
    .withMessage("Min 3 character needed"),
];
