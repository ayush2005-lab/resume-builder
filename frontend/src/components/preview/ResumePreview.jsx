import { TEMPLATES } from "../templates";
import { Eye } from "lucide-react";

export default function ResumePreview({ draft }) {
  const Template = TEMPLATES[draft.template || "classic"];

  return (
    <div className="sticky top-6 h-fit">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800">
            Live Preview
          </h2>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          ● Live
        </span>
      </div>

      {/* Preview Card */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 p-6 shadow-xl">

        <div className="flex justify-center">

          <div
            className="overflow-hidden rounded-lg bg-white shadow-2xl"
            style={{
              width: "210mm",
              minHeight: "297mm",
              transform: "scale(.48)",
              transformOrigin: "top center",
              marginBottom: "-150mm",
            }}
          >
            <Template data={draft} />
          </div>

        </div>

      </div>

    </div>
  );
}