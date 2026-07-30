const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const validate = require("../middleware/validate");
const { resumeRules } = require("../utils/validators");
const {
  listResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  uploadResume,
} = require("../controllers/resumeController");

router.use(protect);

router.get("/", listResumes);
router.post("/", resumeRules, validate, createResume);

router.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, uploadResume);

router.get("/:id", getResume);
router.put("/:id", resumeRules, validate, updateResume);
router.delete("/:id", deleteResume);
router.post("/:id/duplicate", duplicateResume);

module.exports = router;
