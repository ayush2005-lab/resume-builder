import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useDraft } from "../context/DraftContext";

export default function AISuggestions() {
  const { draft, setDraft } = useDraft();
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [accepted, setAccepted] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setLoading(true);
        setError("");

        const { data } = await axiosClient.post("/ai/suggest", {
          summary: draft.summary,
          experience: draft.experience
            .map((e) => e.bullets.join(" "))
            .join(" "),
          skills: draft.skills.join(", "),
        });

        setSuggestions(data.suggestions || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "AI suggestions are unavailable right now."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, []);

  function accept(s, index) {
    if (s.field === "summary") {
      setDraft({
        ...draft,
        summary: s.after,
      });
    }

    if (s.field === "skills") {
      setDraft({
        ...draft,
        skills: s.after
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      });
    }

    if (s.field === "experience") {
      const exp = [...draft.experience];

      if (exp.length > 0) {
        exp[0] = {
          ...exp[0],
          bullets: [s.after],
        };
      }

      setDraft({
        ...draft,
        experience: exp,
      });
    }

    setAccepted({
      ...accepted,
      [index]: true,
    });
  }

  const acceptedCount = Object.values(accepted).filter(Boolean).length;

  return (
    <div className="ai-page">
      {/* Header */}
      <div className="ai-header">
        <div>
          <span className="ai-eyebrow">AI-POWERED RESUME REVIEW</span>

          <h1>
            Make your resume <span>stronger</span>
          </h1>

          <p>
            Review AI-generated suggestions and choose the improvements that
            make your experience clearer and more impactful.
          </p>
        </div>

        <div className="ai-header-badge">
          <span className="ai-sparkle">✦</span>
          <div>
            <strong>AI Analysis</strong>
            <small>
              {loading ? "Analyzing your resume..." : "Analysis complete"}
            </small>
          </div>
        </div>
      </div>

      {/* Progress */}
      {!loading && suggestions.length > 0 && (
        <div className="ai-progress-card">
          <div className="ai-progress-top">
            <div>
              <strong>Review your suggestions</strong>
              <p>
                {acceptedCount} of {suggestions.length} suggestions accepted
              </p>
            </div>

            <span className="ai-progress-count">
              {acceptedCount}/{suggestions.length}
            </span>
          </div>

          <div className="ai-progress-track">
            <div
              className="ai-progress-fill"
              style={{
                width: `${
                  suggestions.length
                    ? (acceptedCount / suggestions.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="ai-loading-card">
          <div className="ai-loader">✦</div>

          <h2>Analyzing your resume</h2>

          <p>
            Our AI is reviewing your content and looking for ways to make your
            resume more effective.
          </p>

          <div className="ai-loading-bar">
            <div />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="ai-error-card">
          <div className="ai-error-icon">!</div>

          <div>
            <strong>AI suggestions are unavailable</strong>
            <p>
              {error} You can still continue with your current resume content.
            </p>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {!loading && suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((s, i) => {
            const isAccepted = accepted[i];

            return (
              <div
                className={`suggestion-card ${
                  isAccepted ? "suggestion-accepted" : ""
                }`}
                key={i}
              >
                <div className="suggestion-header">
                  <div className="suggestion-field">
                    {s.field === "summary" && "👤"}
                    {s.field === "experience" && "💼"}
                    {s.field === "skills" && "🛠️"}

                    <span>{s.field}</span>
                  </div>

                  {isAccepted && (
                    <span className="accepted-badge">
                      ✓ Accepted
                    </span>
                  )}
                </div>

                <div className="suggestion-comparison">
                  <div className="suggestion-before">
                    <span className="comparison-label">
                      CURRENT
                    </span>

                    <p>{s.before}</p>
                  </div>

                  <div className="comparison-arrow">→</div>

                  <div className="suggestion-after">
                    <span className="comparison-label">
                      AI SUGGESTION
                    </span>

                    <p>{s.after}</p>
                  </div>
                </div>

                <div className="suggestion-footer">
                  <span className="suggestion-tip">
                    ✨ Recommended improvement
                  </span>

                  <button
                    className={
                      isAccepted
                        ? "suggestion-accept accepted"
                        : "suggestion-accept"
                    }
                    onClick={() => accept(s, i)}
                  >
                    {isAccepted ? "✓ Accepted" : "Accept suggestion"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No Suggestions */}
      {!loading && !error && suggestions.length === 0 && (
        <div className="ai-empty-card">
          <div className="ai-empty-icon">✨</div>

          <h2>Your resume looks good!</h2>

          <p>
            We couldn't find any specific improvements right now. You can
            continue to choose a template and preview your resume.
          </p>
        </div>
      )}

      {/* Footer */}
      {!loading && (
        <div className="ai-footer">
          <div>
            <strong>Ready for the next step?</strong>
            <p>
              Choose a professional template for your resume.
            </p>
          </div>

          <button
            className="ai-continue-button"
            onClick={() => navigate("/choose-template")}
          >
            Continue to Templates
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}