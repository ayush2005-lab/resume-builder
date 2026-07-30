import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useDraft } from "../context/DraftContext";

export default function ImproveResume() {
  const { setDraft, resetDraft } = useDraft();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axiosClient.post("/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetDraft({
        name: data.parsed.name,
        email: data.parsed.email,
        phone: data.parsed.phone,
        summary: data.parsed.summary,
        source: "improved",
      });
      navigate("/ai-suggestions");
    } catch (err) {
      setError(err.response?.data?.message || "Could not read this file. Try a different PDF or DOCX.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h2>Upload resume</h2>
      <p style={{ color: "#666" }}>PDF or DOCX. We will parse it into structured fields.</p>
      <div className="card">
        <input type="file" accept=".pdf,.docx" onChange={handleFile} disabled={loading} />
        {loading && <p style={{ fontSize: "0.85rem" }}>Parsing file…</p>}
        {error && <p style={{ color: "#a32d2d", fontSize: "0.85rem" }}>{error}</p>}
      </div>
      <div className="card" style={{ fontSize: "0.8rem", color: "#666" }}>
        Corrupt files or unsupported formats show an error here with the option to retry,
        matching Step 5 of the flow spec.
      </div>
    </div>
  );
}
