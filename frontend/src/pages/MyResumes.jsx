import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "../api/axiosClient";
import { useDraft } from "../context/DraftContext";
import { useNavigate } from "react-router-dom";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { resetDraft } = useDraft();
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await axiosClient.get("/resumes", { params: { search, page, limit: 8 } });
    setResumes(data.resumes);
    setPages(data.pages);
    setLoading(false);
  }, [search, page]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this resume? This cannot be undone.")) return;
    await axiosClient.delete(`/resumes/${id}`);
    load();
  }

  async function handleDuplicate(id) {
    await axiosClient.post(`/resumes/${id}/duplicate`);
    load();
  }

  async function handleRename(resume) {
    const title = window.prompt("Rename resume", resume.title);
    if (!title || title === resume.title) return;
    await axiosClient.put(`/resumes/${resume._id}`, { title });
    load();
  }

  function handleEdit(resume) {
    resetDraft({ ...resume.data, template: resume.template, source: resume.source });
    navigate("/edit");
  }

  return (
    <div className="page page-wide">
      <span className="step-eyebrow">step 12</span>
      <h2>My resumes</h2>
      <p className="page-subtitle">Rename, duplicate, delete, or re-download any saved resume.</p>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search by title"
          value={search}
          onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        />
      </div>

      {loading && <p className="hint-text">Loading…</p>}
      {!loading && resumes.length === 0 && <p className="hint-text">Nothing saved yet.</p>}

      <div className="grid-3">
        {resumes.map((r) => (
          <div className="card" key={r._id}>
            <strong>{r.title}</strong>
            <p className="hint-text">Updated {new Date(r.updatedAt).toLocaleDateString()} · {r.template}</p>
            <div>
              <button className="btn btn-ghost" onClick={() => handleEdit(r)}>Edit anytime</button>
              <button className="btn btn-ghost" onClick={() => handleRename(r)}>Rename</button>
              <button className="btn btn-ghost" onClick={() => handleDuplicate(r._id)}>Duplicate</button>
              <button className="btn btn-ghost" style={{ color: "var(--danger)" }} onClick={() => handleDelete(r._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="toolbar">
          <button className="btn btn-ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span className="hint-text">Page {page} of {pages}</span>
          <button className="btn btn-ghost" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
