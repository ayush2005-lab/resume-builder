const multer = require("multer");
const path = require("path");

// Memory storage: files are parsed for text and then discarded, never
// written to disk. This keeps the API stateless and safe to run on
// platforms with ephemeral filesystems (Render, Railway, Vercel, etc).
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowed = [".pdf", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Only PDF and DOCX files are supported"));
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload;
