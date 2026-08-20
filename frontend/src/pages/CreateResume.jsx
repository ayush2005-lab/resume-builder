import React from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../context/DraftContext";
import axiosClient from "../api/axiosClient";
import RepeatingGroup from "../components/RepeatingGroup";
import BuilderHeader from "../components/builder/BuilderHeader";
import BuilderSidebar from "../components/builder/BuilderSidebar";
import PersonalInfo from "../components/builder/PersonalInfo";
import ResumePreview from "../components/preview/ResumePreview";
import ExperienceForm from "../components/builder/ExperienceForm";
import EducationForm from "../components/builder/EducationForm";
import ProjectsForm from "../components/builder/ProjectsForm";
import SkillsForm from "../components/builder/SkillsForm";

export default function CreateResume() {
  const { draft, setDraft, resetDraft } = useDraft();
  const navigate = useNavigate();
  const [saving, setSaving] = React.useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await axiosClient.post("/resumes", {
        title: draft.name || "Untitled Resume",
        template: draft.template,
        source: draft.source,
        data: draft,
      });
      alert("Resume saved!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save resume.");
    } finally {
      setSaving(false);
    }
  }

  function handleImprove() {
    navigate("/ai-suggestions");
  }

  function handleExport() {
    navigate("/export");
  }

  React.useEffect(() => {
    if (draft.source !== "created") {
      resetDraft({ source: "created" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completedSections = [
    draft.name,
    draft.email,
    draft.phone,
    draft.summary,
    draft.experience?.some(
      (item) => item.company || item.role || item.bullets?.some(Boolean)
    ),
    draft.education?.some(
      (item) => item.school || item.degree || item.year
    ),
    draft.projects?.some(
      (item) => item.name || item.description
    ),
    draft.skills?.length > 0,
  ].filter(Boolean).length;

  const progress = Math.round((completedSections / 8) * 100);

//   return (
//     <div className="builder-page">
//       {/* Header */}
//       <div className="builder-header">
//         <div>
//           <span className="builder-eyebrow">CREATE YOUR RESUME</span>
//           <h1>Build your professional resume</h1>
//           <p>
//             Add your information below. You can review and improve your resume
//             with AI before choosing a template.
//           </p>
//         </div>

//         <div className="builder-progress">
//           <div className="progress-info">
//             <span>Profile completion</span>
//             <strong>{progress}%</strong>
//           </div>

//           <div className="progress-track">
//             <div
//               className="progress-fill"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Personal Information */}
//       <section className="builder-section">
//         <div className="builder-section-header">
//           <div className="section-number">01</div>

//           <div>
//             <h2>Personal information</h2>
//             <p>Tell employers who you are and how they can contact you.</p>
//           </div>
//         </div>

//         <div className="builder-card">
//           <div className="form-grid">
//             <label className="form-field">
//               <span>Full name *</span>
//               <input
//                 value={draft.name}
//                 onChange={(e) =>
//                   setDraft({ ...draft, name: e.target.value })
//                 }
//                 placeholder="e.g. Ayush Singh Bhadouria"
//                 required
//               />
//             </label>

//             <label className="form-field">
//               <span>Email address</span>
//               <input
//                 type="email"
//                 value={draft.email}
//                 onChange={(e) =>
//                   setDraft({ ...draft, email: e.target.value })
//                 }
//                 placeholder="you@example.com"
//               />
//             </label>

//             <label className="form-field">
//               <span>Phone number</span>
//               <input
//                 value={draft.phone}
//                 onChange={(e) =>
//                   setDraft({ ...draft, phone: e.target.value })
//                 }
//                 placeholder="+1 555 123 4567"
//               />
//             </label>
//           </div>

//           <label className="form-field">
//             <div className="field-label-row">
//               <span>Professional summary</span>
//               <small>2–4 sentences recommended</small>
//             </div>

//             <textarea
//               rows={5}
//               value={draft.summary}
//               onChange={(e) =>
//                 setDraft({ ...draft, summary: e.target.value })
//               }
//               placeholder="Write a short introduction about your experience, skills, and career goals..."
//             />
//           </label>
//         </div>
//       </section>

//       {/* Experience */}
//       <section className="builder-section">
//         <div className="builder-section-header">
//           <div className="section-number">02</div>

//           <div>
//             <h2>Work experience</h2>
//             <p>
//               Highlight your previous roles and the impact you made.
//             </p>
//           </div>
//         </div>

//         <RepeatingGroup
//           title=""
//           items={draft.experience}
//           blank={{
//             company: "",
//             role: "",
//             dates: "",
//             bullets: [""],
//           }}
//           onChange={(experience) =>
//             setDraft({ ...draft, experience })
//           }
//           addLabel="＋ Add another job"
//           render={(item, onChange) => (
//             <div className="repeat-form">
//               <div className="form-grid">
//                 <label className="form-field">
//                   <span>Company</span>
//                   <input
//                     value={item.company}
//                     onChange={(e) =>
//                       onChange({
//                         ...item,
//                         company: e.target.value,
//                       })
//                     }
//                     placeholder="Company name"
//                   />
//                 </label>

//                 <label className="form-field">
//                   <span>Job title</span>
//                   <input
//                     value={item.role}
//                     onChange={(e) =>
//                       onChange({
//                         ...item,
//                         role: e.target.value,
//                       })
//                     }
//                     placeholder="e.g. Full Stack Developer"
//                   />
//                 </label>
//               </div>

//               <label className="form-field">
//                 <span>Dates</span>
//                 <input
//                   value={item.dates}
//                   onChange={(e) =>
//                     onChange({
//                       ...item,
//                       dates: e.target.value,
//                     })
//                   }
//                   placeholder="e.g. Jan 2024 – Present"
//                 />
//               </label>

//               <label className="form-field">
//                 <div className="field-label-row">
//                   <span>Key responsibilities & achievements</span>
//                   <small>One bullet point per line</small>
//                 </div>

//                 <textarea
//                   rows={5}
//                   value={item.bullets.join("\n")}
//                   onChange={(e) =>
//                     onChange({
//                       ...item,
//                       bullets: e.target.value.split("\n"),
//                     })
//                   }
//                   placeholder={`Developed responsive web applications
// Improved application performance
// Collaborated with cross-functional teams`}
//                 />
//               </label>
//             </div>
//           )}
//         />
//       </section>

//       {/* Education */}
//       <section className="builder-section">
//         <div className="builder-section-header">
//           <div className="section-number">03</div>

//           <div>
//             <h2>Education</h2>
//             <p>Add your academic background and qualifications.</p>
//           </div>
//         </div>

//         <RepeatingGroup
//           title=""
//           items={draft.education}
//           blank={{
//             school: "",
//             degree: "",
//             year: "",
//           }}
//           onChange={(education) =>
//             setDraft({ ...draft, education })
//           }
//           addLabel="＋ Add another school"
//           render={(item, onChange) => (
//             <div className="repeat-form">
//               <div className="form-grid">
//                 <label className="form-field">
//                   <span>School / University</span>
//                   <input
//                     value={item.school}
//                     onChange={(e) =>
//                       onChange({
//                         ...item,
//                         school: e.target.value,
//                       })
//                     }
//                     placeholder="University or college name"
//                   />
//                 </label>

//                 <label className="form-field">
//                   <span>Degree / Program</span>
//                   <input
//                     value={item.degree}
//                     onChange={(e) =>
//                       onChange({
//                         ...item,
//                         degree: e.target.value,
//                       })
//                     }
//                     placeholder="e.g. Bachelor of Computer Applications"
//                   />
//                 </label>
//               </div>

//               <label className="form-field">
//                 <span>Graduation year</span>
//                 <input
//                   value={item.year}
//                   onChange={(e) =>
//                     onChange({
//                       ...item,
//                       year: e.target.value,
//                     })
//                   }
//                   placeholder="e.g. 2027"
//                 />
//               </label>
//             </div>
//           )}
//         />
//       </section>

//       {/* Projects */}
//       <section className="builder-section">
//         <div className="builder-section-header">
//           <div className="section-number">04</div>

//           <div>
//             <h2>Projects</h2>
//             <p>Showcase projects that demonstrate your practical skills.</p>
//           </div>
//         </div>

//         <RepeatingGroup
//           title=""
//           items={draft.projects}
//           blank={{
//             name: "",
//             description: "",
//           }}
//           onChange={(projects) =>
//             setDraft({ ...draft, projects })
//           }
//           addLabel="＋ Add another project"
//           render={(item, onChange) => (
//             <div className="repeat-form">
//               <label className="form-field">
//                 <span>Project name</span>
//                 <input
//                   value={item.name}
//                   onChange={(e) =>
//                     onChange({
//                       ...item,
//                       name: e.target.value,
//                     })
//                   }
//                   placeholder="e.g. Resume Builder MERN App"
//                 />
//               </label>

//               <label className="form-field">
//                 <div className="field-label-row">
//                   <span>Project description</span>
//                   <small>Explain what you built and the technologies used</small>
//                 </div>

//                 <textarea
//                   rows={4}
//                   value={item.description}
//                   onChange={(e) =>
//                     onChange({
//                       ...item,
//                       description: e.target.value,
//                     })
//                   }
//                   placeholder="Describe the project, your role, technologies used, and the result..."
//                 />
//               </label>
//             </div>
//           )}
//         />
//       </section>

//       {/* Skills */}
//       <section className="builder-section">
//         <div className="builder-section-header">
//           <div className="section-number">05</div>

//           <div>
//             <h2>Skills</h2>
//             <p>Add technologies, tools, and professional skills.</p>
//           </div>
//         </div>

//         <div className="builder-card">
//           <label className="form-field">
//             <span>Skills</span>

//             <input
//               value={draft.skills.join(", ")}
//               onChange={(e) =>
//                 setDraft({
//                   ...draft,
//                   skills: e.target.value
//                     .split(",")
//                     .map((s) => s.trim())
//                     .filter(Boolean),
//                 })
//               }
//               placeholder="JavaScript, React, Node.js, MongoDB, Git"
//             />

//             <small className="field-help">
//               Separate each skill with a comma.
//             </small>
//           </label>

//           {draft.skills.length > 0 && (
//             <div className="skill-tags">
//               {draft.skills.map((skill, index) => (
//                 <span key={`${skill}-${index}`} className="skill-tag">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Continue */}
//       <div className="builder-footer">
//         <div>
//           <strong>Ready to improve your resume?</strong>
//           <p>
//             Next, our AI assistant can help make your content stronger.
//           </p>
//         </div>

//         <button
//           className="builder-continue-button"
//           disabled={!draft.name}
//           onClick={() => navigate("/ai-suggestions")}
//         >
//           Continue to AI Suggestions
//           <span>→</span>
//         </button>
//       </div>
//     </div>
//   );
return (
  <div className="min-h-screen bg-slate-100">
    <div className="mx-auto max-w-7xl p-6">
      <BuilderHeader
        progress={progress}
        saving={saving}
        onSave={handleSave}
        onImprove={handleImprove}
        onExport={handleExport}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left - Live Preview */}
        <div className="lg:col-span-4">
          <ResumePreview draft={draft} />
        </div>

        {/* Right - Resume Builder */}
        <div className="space-y-6 lg:col-span-8">
         <PersonalInfo
            draft={draft}
            setDraft={setDraft}
          />

          <ExperienceForm
            draft={draft}
            setDraft={setDraft}
          />

          <EducationForm
            draft={draft}
            setDraft={setDraft}
          />

          <ProjectsForm
            draft={draft}
            setDraft={setDraft}
          />

          <SkillsForm
            draft={draft}
            setDraft={setDraft}
          />
        </div>
      </div>
    </div>
  </div>
);
}