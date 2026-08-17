import React from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useDraft } from "../context/DraftContext";
import { TEMPLATES } from "../components/templates";

export default function PreviewResume() {
  const { draft } = useDraft();
  const navigate = useNavigate();

  const Template = TEMPLATES[draft.template] || TEMPLATES.classic;

  const downloadPdf = () => {
    const element = document.getElementById("resume-print");

    if (!element) {
      alert("Resume not found!");
      return;
    }

    const options = {
      margin: 0,
      filename: `${draft.name || "Resume"}.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    };

    html2pdf().set(options).from(element).save();
  };

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
          onClick={downloadPdf}
        >
          Download PDF
        </button>
      </div>

      <Template data={draft} />
    </div>
  );
}