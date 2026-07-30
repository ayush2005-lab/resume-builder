import React from "react";

export default function ModernTemplate({ data }) {
  return (
    <div id="resume-print" className="resume-paper resume-modern">
      <div className="r-sidebar">
        <h3>{data.name}</h3>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        {data.skills?.length > 0 && (
          <>
            <h4>Skills</h4>
            <p className="r-skills">{data.skills.join(", ")}</p>
          </>
        )}
        {data.education?.some((e) => e.school) && (
          <>
            <h4>Education</h4>
            {data.education.map((e, i) => (
              <p key={i} className="r-mini">{e.degree}<br />{e.school} {e.year && `· ${e.year}`}</p>
            ))}
          </>
        )}
      </div>
      <div className="r-main">
        <p className="r-summary">{data.summary}</p>
        {data.experience?.some((e) => e.company || e.role) && (
          <>
            <h4>Experience</h4>
            {data.experience.map((e, i) => (
              <div key={i} className="r-entry">
                <strong>{e.role}</strong>{e.company && ` — ${e.company}`} <span className="r-muted">{e.dates}</span>
                <ul>{(e.bullets || []).filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}</ul>
              </div>
            ))}
          </>
        )}
        {data.projects?.some((p) => p.name) && (
          <>
            <h4>Projects</h4>
            {data.projects.map((p, i) => (
              <div key={i} className="r-entry"><strong>{p.name}</strong> — {p.description}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
