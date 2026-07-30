import React, { createContext, useContext, useState } from "react";

const DraftContext = createContext(null);

export const EMPTY_DRAFT = {
  name: "",
  email: "",
  phone: "",
  summary: "",
  education: [{ school: "", degree: "", year: "" }],
  experience: [{ company: "", role: "", dates: "", bullets: [""] }],
  projects: [{ name: "", description: "" }],
  skills: [],
  template: "classic",
  source: "created",
};

export function DraftProvider({ children }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  function resetDraft(overrides = {}) {
    setDraft({ ...EMPTY_DRAFT, ...overrides });
  }

  return (
    <DraftContext.Provider value={{ draft, setDraft, resetDraft }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useDraft() {
  return useContext(DraftContext);
}
