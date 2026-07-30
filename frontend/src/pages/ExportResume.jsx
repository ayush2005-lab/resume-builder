import React from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useDraft } from "../context/DraftContext";
import { exportDocx } from "../utils/exportDocx";

export default function ExportResume() {
  const { draft } = useDraft();
  const navigate = useNavigate();

  function downloadPdf() {
    window.print();
  }

  async function handleSave() {
    await axiosClient.post("/resumes", {
      title: draft.name || "Untitled resume",
      template: draft.template,
      source: draft.source,
      data: draft,
    });
    navigate("/my-resumes");
  }

  return (
    <div className="page">
      <h2>Download and save</h2>
      <p style={{ color: "#666" }}>Export a copy, and save to your account for later.</p>
      <div className="card">
        <button className="btn btn-primary" onClick={downloadPdf}>Download PDF</button>
        <button className="btn btn-ghost" onClick={() => exportDocx(draft)}>Download DOCX</button>
      </div>
      <button className="btn btn-accent" onClick={handleSave}>Save to My Resumes</button>
      <p style={{ fontSize: "0.8rem", color: "#999", marginTop: 12 }}>
        PDF uses your browser's print dialog (choose "Save as PDF"); DOCX is generated
        client-side. See src/index.css for the print-only stylesheet.
      </p>
    </div>
  );
}
