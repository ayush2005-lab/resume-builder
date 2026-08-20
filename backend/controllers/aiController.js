const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.improveResume = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        message: "AI suggestions are not configured on the server (missing GEMINI_API_KEY).",
      });
    }

    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        message: "Resume data is required.",
      });
    }
    const prompt = `
You are an expert ATS resume writer.

Analyze this resume and return ONLY valid JSON.

Return exactly this format:

[
  {
    "field":"summary",
    "before":"original summary",
    "after":"improved summary"
  },
  {
    "field":"experience",
    "before":"original experience",
    "after":"improved experience"
  },
  {
    "field":"skills",
    "before":"original skills",
    "after":"improved skills"
  }
]

Rules:
- Do not return markdown.
- Do not wrap the JSON in \`\`\`.
- Return only the JSON array.
- Improve grammar.
- Use strong action verbs.
- Make the content ATS friendly.

Resume:
${JSON.stringify(resume, null, 2)}
`;

//     const prompt = `
// You are a professional resume writer.

// Improve the following resume.

// Rules:
// - Make it ATS friendly.
// - Keep the same meaning.
// - Use strong action verbs.
// - Improve grammar.
// - Keep formatting simple.
// - Return ONLY the improved resume in JSON.

// Resume:
// ${JSON.stringify(resume, null, 2)}
// `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      result: response.text,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "AI request failed.",
    });
  }
};