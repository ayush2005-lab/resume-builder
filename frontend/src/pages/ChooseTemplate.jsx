import React from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../context/DraftContext";

const OPTIONS = [
  {
    id: "classic",
    name: "Classic",
    desc: "Traditional and professional",
    style: "Serif • Single column",
  },
  {
    id: "modern",
    name: "Modern",
    desc: "Clean design with a strong visual hierarchy",
    style: "Sans • Sidebar layout",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Simple, elegant, and distraction-free",
    style: "Mono headings • Quiet",
  },
];

function TemplateMiniPreview({ id }) {
  if (id === "modern") {
    return (
      <div className="mini-resume mini-modern">
        <div className="mini-modern-sidebar">
          <div className="mini-avatar" />
          <div className="mini-line short" />
          <div className="mini-line" />
          <div className="mini-line" />
          <div className="mini-line short" />
        </div>

        <div className="mini-modern-main">
          <div className="mini-title" />
          <div className="mini-line" />
          <div className="mini-line short" />

          <div className="mini-section-title" />
          <div className="mini-line" />
          <div className="mini-line" />
          <div className="mini-line short" />

          <div className="mini-section-title" />
          <div className="mini-line" />
          <div className="mini-line short" />
        </div>
      </div>
    );
  }

  if (id === "minimal") {
    return (
      <div className="mini-resume mini-minimal">
        <div className="mini-minimal-name" />
        <div className="mini-minimal-contact" />

        <div className="mini-minimal-heading" />
        <div className="mini-line" />
        <div className="mini-line" />
        <div className="mini-line short" />

        <div className="mini-minimal-heading" />
        <div className="mini-line" />
        <div className="mini-line short" />

        <div className="mini-minimal-heading" />
        <div className="mini-line" />
      </div>
    );
  }

  return (
    <div className="mini-resume mini-classic">
      <div className="mini-classic-name" />
      <div className="mini-classic-contact" />

      <div className="mini-classic-heading" />
      <div className="mini-line" />
      <div className="mini-line" />
      <div className="mini-line short" />

      <div className="mini-classic-heading" />
      <div className="mini-line" />
      <div className="mini-line" />

      <div className="mini-classic-heading" />
      <div className="mini-line short" />
    </div>
  );
}

export default function ChooseTemplate() {
  const { draft, setDraft } = useDraft();
  const navigate = useNavigate();

  function selectTemplate(id) {
    setDraft({
      ...draft,
      template: id,
    });
  }

  return (
    <div className="template-page">
      {/* Header */}
      <div className="template-header">
        <span className="step-eyebrow">STEP 07</span>

        <h1>Choose your template</h1>

        <p>
          Pick a design that matches your professional style. You can switch
          templates later without losing any of your resume content.
        </p>
      </div>

      {/* Template cards */}
      <div className="template-grid">
        {OPTIONS.map((template) => {
          const selected = draft.template === template.id;

          return (
            <button
              key={template.id}
              type="button"
              className={`template-card ${
                selected ? "template-card-selected" : ""
              }`}
              onClick={() => selectTemplate(template.id)}
            >
              {/* Preview */}
              <div className="template-preview-wrapper">
                <TemplateMiniPreview id={template.id} />

                {selected && (
                  <div className="template-selected-badge">
                    ✓ Selected
                  </div>
                )}

                <div className="template-preview-overlay">
                  <span>Choose {template.name}</span>
                </div>
              </div>

              {/* Information */}
              <div className="template-info">
                <div>
                  <h3>{template.name}</h3>
                  <p>{template.desc}</p>
                </div>

                <span className="template-radio">
                  {selected && <span />}
                </span>
              </div>

              <div className="template-style">
                {template.style}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom action */}
      <div className="template-actions">
        <div>
          <strong>
            {draft.template
              ? `${OPTIONS.find((t) => t.id === draft.template)?.name} template selected`
              : "Select a template"}
          </strong>

          <p>
            You can change your template anytime from the preview screen.
          </p>
        </div>

        <button
          className="btn btn-primary template-continue"
          onClick={() => navigate("/preview")}
        >
          Preview resume
          <span>→</span>
        </button>
      </div>
    </div>
  );
}