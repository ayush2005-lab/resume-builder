const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

async function extractTextFromBuffer(buffer, originalName) {
  const ext = (originalName.split(".").pop() || "").toLowerCase();
  if (ext === "pdf") {
    const result = await pdfParse(buffer);
    return result.text;
  }
  if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  throw new Error("Unsupported file type");
}

// Very lightweight heuristic parser: pulls an email, a phone number, and
// treats the rest as free text so the AI-improvement step has something to
// work with. Swap this for a proper resume-parsing service if you need
// structured sections extracted automatically.
function parseRawText(text) {
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const phoneMatch = text.match(/(\+?\d[\d\s().-]{7,}\d)/);
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const name = lines[0] && lines[0].length < 60 ? lines[0] : "";

  return {
    name,
    email: emailMatch ? emailMatch[0] : "",
    phone: phoneMatch ? phoneMatch[0].trim() : "",
    summary: lines.slice(1, 4).join(" "),
  };
}

module.exports = { extractTextFromBuffer, parseRawText };
