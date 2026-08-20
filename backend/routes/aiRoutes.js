const express = require("express");
const router = express.Router();

const { improveResume } = require("../controllers/aiController");

router.post("/improve", improveResume);

module.exports = router;