import React from "react";

export default function ClassicTemplate({ data }) {
  return (
    <div id="resume-print" className="resume-paper resume-classic">
      <h2 className="r-name">{data.name || "Your name"}</h2>
      <p className="r-contact">{data.email} {data.phone && `· ${data.phone}`}</p>
      <p className="r-summary">{data.summary}</p>

      {data.experience?.some((e) => e.company || e.role) && (
        <>
          <h4 className="r-heading">Experience</h4>
          {data.experience.map((e, i) => (
            <div key={i} className="r-entry">
              <strong>{e.role}</strong>{e.company && ` — ${e.company}`} <span className="r-muted">{e.dates}</span>
              <ul>{(e.bullets || []).filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </>
      )}

      {data.education?.some((e) => e.school) && (
        <>
          <h4 className="r-heading">Education</h4>
          {data.education.map((e, i) => (
            <div key={i} className="r-entry">{e.degree}{e.degree && e.school && ", "}{e.school} <span className="r-muted">{e.year}</span></div>
          ))}
        </>
      )}

      {data.projects?.some((p) => p.name) && (
        <>
          <h4 className="r-heading">Projects</h4>
          {data.projects.map((p, i) => (
            <div key={i} className="r-entry"><strong>{p.name}</strong> — {p.description}</div>
          ))}
        </>
      )}

      {data.skills?.length > 0 && (
        <>
          <h4 className="r-heading">Skills</h4>
          <p className="r-skills">{data.skills.join(", ")}</p>
        </>
      )}
    </div>
  );
}
