const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, default: "Untitled resume" },
    template: { type: String, enum: ["classic", "modern", "minimal"], default: "classic" },
    source: { type: String, enum: ["created", "improved"], default: "created" },
    data: {
      name: String,
      email: String,
      phone: String,
      summary: String,
      education: [{ school: String, degree: String, year: String }],
      experience: [{ company: String, role: String, dates: String, bullets: [String] }],
      skills: [String],
      projects: [{ name: String, description: String }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
