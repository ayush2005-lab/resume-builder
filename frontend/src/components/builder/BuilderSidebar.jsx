import {
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Wrench,
  Eye,
} from "lucide-react";

const sections = [
  { icon: User, title: "Personal Info" },
  { icon: Briefcase, title: "Experience" },
  { icon: GraduationCap, title: "Education" },
  { icon: FolderOpen, title: "Projects" },
  { icon: Wrench, title: "Skills" },
  { icon: Eye, title: "Preview" },
];

export default function BuilderSidebar() {
  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg border border-gray-200">
      <h2 className="mb-6 text-lg font-bold text-slate-800">
        Resume Builder
      </h2>

      <div className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <button
              key={section.title}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-blue-50 hover:text-blue-600"
            >
              <Icon size={18} />
              <span className="font-medium">{section.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}