import React from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useDraft } from "../context/DraftContext";
import { exportDocx } from "../utils/exportDocx";

export default function ExportResume() {
  const { draft } = useDraft();
  const navigate = useNavigate();

  async function handleSave() {
    try {
      await axiosClient.post("/resumes", {
        title: draft.name || "Untitled Resume",
        template: draft.template,
        source: draft.source,
        data: draft,
      });

      alert("Resume saved successfully!");
      navigate("/my-resumes");
    } catch (err) {
      console.error(err);
      alert("Failed to save resume.");
    }
  }

  return (
    <div className="page">
      <h2>Export Resume</h2>

      <p style={{ color: "#666" }}>
        Go to the Preview page to download your PDF.
      </p>

      <div className="card">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/preview")}
        >
          Go to Preview & Download PDF
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => exportDocx(draft)}
        >
          Download DOCX
        </button>
      </div>

      <button
        className="btn btn-accent"
        onClick={handleSave}
      >
        Save to My Resumes
      </button>
    </div>
  );
}