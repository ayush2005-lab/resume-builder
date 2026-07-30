const { GoogleGenerativeAI } = require("@google/generative-ai");

let client;

function getClient() {
  if (!client) {
    client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  return client;
}

const SYSTEM_PROMPT = `
You are a professional resume-writing assistant.

Given resume content, suggest improvements that:
- Make the writing concise and professional.
- Use strong action verbs.
- Improve clarity and impact.
- Quantify achievements only when reasonable and supported by the original content.
- Never invent fake experience, skills, education, companies, or achievements.

Respond ONLY with valid JSON in this exact shape:

{
  "suggestions": [
    {
      "field": "summary",
      "before": "...",
      "after": "..."
    }
  ]
}

The "field" must be exactly one of:
- "summary"
- "experience"
- "skills"

Keep "before" as a short excerpt from the original text.
Keep "after" as the improved replacement.

Return at most 5 suggestions.

If there is not enough content to improve, return:

{
  "suggestions": []
}

Do not use markdown.
Do not wrap the JSON in code fences.
`;

async function suggestImprovements(req, res) {
  const {
    summary = "",
    experience = "",
    skills = "",
  } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      message: "GEMINI_API_KEY is not configured on the server.",
    });
  }

  try {
    const model = getClient().getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Review the following resume content.

Summary:
${summary}

Experience:
${experience}

Skills:
${skills}

Return your suggestions in the required JSON format.
`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const raw = response.text();

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      console.error("Gemini returned invalid JSON:", raw);

      return res.status(502).json({
        message: "AI response was not valid JSON.",
      });
    }

    if (!Array.isArray(parsed.suggestions)) {
      return res.status(502).json({
        message: "AI response did not contain valid suggestions.",
      });
    }

    res.json({
      suggestions: parsed.suggestions.slice(0, 5),
    });
  } catch (err) {
    console.error("Gemini error:", err.message);

    res.status(502).json({
      message: "AI suggestion request failed.",
      detail: err.message,
    });
  }
}

module.exports = {
  suggestImprovements,
};