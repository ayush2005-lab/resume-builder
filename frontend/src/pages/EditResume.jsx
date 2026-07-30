import React from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../context/DraftContext";
import { TEMPLATES } from "../components/templates";
import RepeatingGroup from "../components/RepeatingGroup";

export default function EditResume() {
  const { draft, setDraft } = useDraft();
  const navigate = useNavigate();
  const Template = TEMPLATES[draft.template] || TEMPLATES.classic;

  return (
    <div className="page page-wide">
      <div className="edit-layout">
        <div>
          <h2>Edit resume</h2>
          <p className="page-subtitle">Changes reflect live in the preview.</p>

          <div className="card">
            <label><span>Full name</span><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
            <label><span>Email</span><input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></label>
            <label><span>Phone</span><input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></label>
            <label><span>Summary</span><textarea rows={3} value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} /></label>
          </div>

          <RepeatingGroup
            title="Experience"
            items={draft.experience}
            blank={{ company: "", role: "", dates: "", bullets: [""] }}
            onChange={(experience) => setDraft({ ...draft, experience })}
            addLabel="Add another job"
            render={(item, onChange) => (
              <>
                <label><span>Company</span><input value={item.company} onChange={(e) => onChange({ ...item, company: e.target.value })} /></label>
                <label><span>Role</span><input value={item.role} onChange={(e) => onChange({ ...item, role: e.target.value })} /></label>
                <label><span>Dates</span><input value={item.dates} onChange={(e) => onChange({ ...item, dates: e.target.value })} /></label>
                <label><span>Bullet points (one per line)</span>
                  <textarea rows={3} value={item.bullets.join("\n")} onChange={(e) => onChange({ ...item, bullets: e.target.value.split("\n") })} />
                </label>
              </>
            )}
          />

          <RepeatingGroup
            title="Education"
            items={draft.education}
            blank={{ school: "", degree: "", year: "" }}
            onChange={(education) => setDraft({ ...draft, education })}
            addLabel="Add another school"
            render={(item, onChange) => (
              <>
                <label><span>School</span><input value={item.school} onChange={(e) => onChange({ ...item, school: e.target.value })} /></label>
                <label><span>Degree</span><input value={item.degree} onChange={(e) => onChange({ ...item, degree: e.target.value })} /></label>
                <label><span>Year</span><input value={item.year} onChange={(e) => onChange({ ...item, year: e.target.value })} /></label>
              </>
            )}
          />

          <RepeatingGroup
            title="Projects"
            items={draft.projects}
            blank={{ name: "", description: "" }}
            onChange={(projects) => setDraft({ ...draft, projects })}
            addLabel="Add another project"
            render={(item, onChange) => (
              <>
                <label><span>Project name</span><input value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} /></label>
                <label><span>Description</span><textarea rows={2} value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} /></label>
              </>
            )}
          />

          <div className="card">
            <label><span>Skills (comma separated)</span>
              <input value={draft.skills.join(", ")} onChange={(e) => setDraft({ ...draft, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </label>
          </div>

          <button className="btn btn-ghost" onClick={() => navigate("/preview")}>Back to preview</button>
          <button className="btn btn-primary" onClick={() => navigate("/export")}>Continue</button>
        </div>
        <div className="edit-preview-pane"><Template data={draft} /></div>
      </div>
    </div>
  );
}
