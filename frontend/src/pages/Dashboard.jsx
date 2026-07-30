import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    axiosClient
      .get("/resumes")
      .then(({ data }) => setCount(data.length))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div>
          <span className="dashboard-eyebrow">YOUR RESUME WORKSPACE</span>

          <h1>
            Welcome back,{" "}
            <span>{user?.name || "there"}</span> 👋
          </h1>

          <p>
            Build a resume that represents your skills, experience, and
            potential.
          </p>
        </div>

        <Link to="/create" className="primary-action">
          <span>＋</span>
          Create Resume
        </Link>
      </section>

      {/* Stats */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div>
            <span className="stat-label">My Resumes</span>
            <strong>{count}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✨</div>
          <div>
            <span className="stat-label">AI Powered</span>
            <strong>Ready</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div>
            <span className="stat-label">Next Step</span>
            <strong>Build</strong>
          </div>
        </div>
      </section>

      {/* Main Actions */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>What would you like to do?</h2>
            <p>Choose an option to get started.</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/create" className="action-card create-card">
            <div className="action-card-top">
              <div className="action-icon">＋</div>
              <span className="action-arrow">→</span>
            </div>

            <h3>Create a new resume</h3>

            <p>
              Start from scratch and build a professional resume with
              customizable sections and templates.
            </p>

            <span className="action-link">Start building →</span>
          </Link>

          <Link to="/improve" className="action-card improve-card">
            <div className="action-card-top">
              <div className="action-icon">✨</div>
              <span className="action-arrow">→</span>
            </div>

            <h3>Improve an existing resume</h3>

            <p>
              Upload your PDF or DOCX resume and use AI-powered suggestions
              to improve your content.
            </p>

            <span className="action-link">Improve resume →</span>
          </Link>
        </div>
      </section>

      {/* Resumes Section */}
      <section className="dashboard-section resume-overview">
        <div className="section-heading">
          <div>
            <h2>Your resume workspace</h2>
            <p>
              {count > 0
                ? `You currently have ${count} resume${
                    count === 1 ? "" : "s"
                  } saved.`
                : "You haven't created a resume yet."}
            </p>
          </div>

          {count > 0 && (
            <Link to="/my-resumes" className="secondary-action">
              View all resumes →
            </Link>
          )}
        </div>

        {count === 0 ? (
          <div className="empty-resume-card">
            <div className="empty-icon">📄</div>
            <h3>Your resume journey starts here</h3>
            <p>
              Create your first resume and start building your professional
              profile.
            </p>
            <Link to="/create" className="secondary-action">
              Create your first resume
            </Link>
          </div>
        ) : (
          <div className="resume-summary-card">
            <div className="resume-summary-icon">📋</div>

            <div className="resume-summary-content">
              <h3>Your resumes are ready</h3>
              <p>
                Continue editing an existing resume or create a new version
                for a different job opportunity.
              </p>
            </div>

            <Link to="/my-resumes" className="primary-action small">
              Manage Resumes
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}