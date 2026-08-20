import { useState } from "react";
import { Wrench, X } from "lucide-react";

export default function SkillsForm({ draft, setDraft }) {
  const [input, setInput] = useState("");

  function addSkill(raw) {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length === 0) return;

    const existing = new Set(draft.skills.map((s) => s.toLowerCase()));
    const additions = parts.filter((s) => !existing.has(s.toLowerCase()));

    if (additions.length > 0) {
      setDraft({ ...draft, skills: [...draft.skills, ...additions] });
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
      setInput("");
    } else if (e.key === "Backspace" && input === "" && draft.skills.length > 0) {
      removeSkill(draft.skills.length - 1);
    }
  }

  function handleBlur() {
    if (input.trim()) {
      addSkill(input);
      setInput("");
    }
  }

  function removeSkill(index) {
    setDraft({
      ...draft,
      skills: draft.skills.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
          <Wrench className="text-violet-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">Skills</h2>
          <p className="text-sm text-gray-500">
            Add technologies, tools, and professional skills.
          </p>
        </div>
      </div>

      <label className="mb-2 block text-sm font-medium">Skills</label>

      <div className="flex w-full flex-wrap items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
        {draft.skills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(index)}
              aria-label={`Remove ${skill}`}
              className="rounded-full p-0.5 hover:bg-violet-200"
            >
              <X size={12} />
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={
            draft.skills.length === 0
              ? "JavaScript, React, Node.js, MongoDB, Git"
              : "Add another skill…"
          }
          className="min-w-[140px] flex-1 border-none px-1 py-1 outline-none"
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Press Enter or comma after each skill.
      </p>
    </div>
  );
}
