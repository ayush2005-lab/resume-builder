const express = require("express");
const router = express.Router();
const { register, login, me, updateProfile, changePassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { registerRules, loginRules, changePasswordRules, updateProfileRules } = require("../utils/validators");

router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.get("/me", protect, me);
router.put("/me", protect, updateProfileRules, validate, updateProfile);
router.put("/me/password", protect, changePasswordRules, validate, changePassword);

module.exports = router;
