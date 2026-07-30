const Resume = require("../models/Resume");
const { extractTextFromBuffer, parseRawText } = require("../utils/parseResumeFile");

// GET /api/resumes?search=&page=&limit=
async function listResumes(req, res) {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);
  const search = (req.query.search || "").trim();

  const filter = { user: req.user._id };
  if (search) filter.title = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };

  const [resumes, total] = await Promise.all([
    Resume.find(filter).sort({ updatedAt: -1 }).skip((page - 1) * limit).limit(limit),
    Resume.countDocuments(filter),
  ]);

  res.json({ resumes, total, page, pages: Math.max(Math.ceil(total / limit), 1) });
}

async function getResume(req, res) {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
}

async function createResume(req, res) {
  const resume = await Resume.create({
    user: req.user._id,
    title: req.body.title || "Untitled resume",
    template: req.body.template || "classic",
    source: req.body.source || "created",
    data: req.body.data || {},
  });
  res.status(201).json(resume);
}

async function updateResume(req, res) {
  const allowed = (({ title, template, source, data }) => ({ title, template, source, data }))(req.body);
  Object.keys(allowed).forEach((k) => allowed[k] === undefined && delete allowed[k]);

  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: allowed },
    { new: true, runValidators: true }
  );
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
}

async function deleteResume(req, res) {
  const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json({ message: "Resume deleted" });
}

async function duplicateResume(req, res) {
  const original = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!original) return res.status(404).json({ message: "Resume not found" });
  const copy = await Resume.create({
    user: req.user._id,
    title: `${original.title} (copy)`,
    template: original.template,
    source: original.source,
    data: original.data,
  });
  res.status(201).json(copy);
}

// Step 5: Improve Resume - Upload Resume. File is parsed in memory and
// never written to disk (see middleware/uploadMiddleware.js).
async function uploadResume(req, res) {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  try {
    const text = await extractTextFromBuffer(req.file.buffer, req.file.originalname);
    if (!text || !text.trim()) {
      return res.status(422).json({ message: "This file has no readable text. Try a different file." });
    }
    const parsed = parseRawText(text);
    res.json({ parsed });
  } catch (err) {
    res.status(422).json({ message: `Could not read this file: ${err.message}` });
  }
}

module.exports = {
  listResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  uploadResume,
};
