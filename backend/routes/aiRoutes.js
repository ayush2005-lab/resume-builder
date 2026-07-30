const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { suggestImprovements } = require("../controllers/aiController");

router.post("/suggest", protect, suggestImprovements);

module.exports = router;
