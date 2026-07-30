const { body } = require("express-validator");

const registerRules = [
  body("name").trim().isLength({ min: 1, max: 80 }).withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginRules = [
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const changePasswordRules = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
];

const updateProfileRules = [
  body("name").optional().trim().isLength({ min: 1, max: 80 }).withMessage("Name cannot be empty"),
];

const resumeRules = [
  body("title").optional().trim().isLength({ max: 120 }),
  body("template").optional().isIn(["classic", "modern", "minimal"]).withMessage("Invalid template"),
  body("source").optional().isIn(["created", "improved"]).withMessage("Invalid source"),
];

module.exports = { registerRules, loginRules, changePasswordRules, updateProfileRules, resumeRules };
