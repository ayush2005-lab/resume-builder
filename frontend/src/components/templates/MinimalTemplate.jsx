import React from "react";

export default function MinimalTemplate({ data }) {
  return (
    <div id="resume-print" className="resume-paper resume-minimal">
      <h3 className="r-name">{data.name}</h3>
      <p className="r-contact">{data.email} {data.phone && `· ${data.phone}`}</p>
      <p className="r-summary">{data.summary}</p>

      {data.experience?.some((e) => e.company || e.role) && (
        <>
          <p className="r-heading">Experience</p>
          {data.experience.map((e, i) => (
            <div key={i} className="r-entry">
              {e.role}{e.company && ` — ${e.company}`} ({e.dates})
              <ul>{(e.bullets || []).filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </>
      )}

      {data.education?.some((e) => e.school) && (
        <>
          <p className="r-heading">Education</p>
          {data.education.map((e, i) => <div key={i} className="r-entry">{e.degree}, {e.school} ({e.year})</div>)}
        </>
      )}

      {data.projects?.some((p) => p.name) && (
        <>
          <p className="r-heading">Projects</p>
          {data.projects.map((p, i) => <div key={i} className="r-entry">{p.name} — {p.description}</div>)}
        </>
      )}

      {data.skills?.length > 0 && (
        <>
          <p className="r-heading">Skills</p>
          <p className="r-skills">{data.skills.join(", ")}</p>
        </>
      )}
    </div>
  );
}
