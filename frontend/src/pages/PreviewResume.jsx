import React from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../context/DraftContext";
import { TEMPLATES } from "../components/templates";

export default function PreviewResume() {
  const { draft } = useDraft();
  const navigate = useNavigate();

  const Template = TEMPLATES[draft.template] || TEMPLATES.classic;

  return (
    <div className="page page-wide">
      <div className="toolbar no-print">
        <button
          className="btn btn-ghost"
          onClick={() => navigate("/choose-template")}
        >
          ← Change Template
        </button>

        <button
          className="btn btn-primary"
          onClick={() => window.print()}
        >
          Print / Save PDF
        </button>
      </div>

      <Template data={draft} />
    </div>
  );
}