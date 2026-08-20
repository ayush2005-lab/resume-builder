const OpenAI = require("openai");

// Groq's API is OpenAI-compatible, so we reuse the official OpenAI SDK and
// just point it at Groq's endpoint. Groq's free tier requires no credit card.
// Get a key at https://console.groq.com/keys
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MODEL = "openai/gpt-oss-120b";
// Groq deprecates/renames models periodically — if this starts failing again,
// check https://console.groq.com/docs/models for the current recommended model.

exports.improveResume = async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        message: "AI suggestions are not configured on the server (missing GROQ_API_KEY).",
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

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.json({
      success: true,
      result: completion.choices[0]?.message?.content || "",
    });
  } catch (err) {
    console.error(err);

    // Surface the real reason (bad model id, invalid key, rate limit, etc.)
    // in logs and, in dev, in the response too — makes future issues fast to diagnose.
    const detail = err?.error?.message || err?.message || "Unknown error";
    console.error("Groq request detail:", detail);

    res.status(500).json({
      success: false,
      message: "AI request failed.",
      ...(process.env.NODE_ENV !== "production" && { detail }),
    });
  }
};
