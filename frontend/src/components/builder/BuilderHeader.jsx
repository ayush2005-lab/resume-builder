import { Save, Download, Sparkles, Loader2 } from "lucide-react";

export default function BuilderHeader({
  progress = 0,
  onSave,
  onImprove,
  onExport,
  saving = false,
}) {
  return (
    <div className="sticky top-0 z-40 mb-6 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg backdrop-blur">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Resume Builder
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Build Your Professional Resume
          </h1>

          <p className="mt-2 text-slate-500">
            Your changes are reflected instantly in the live preview.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border px-5 py-3 font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving…" : "Save"}
          </button>

          <button
            type="button"
            onClick={onImprove}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700"
          >
            <Sparkles size={18} />
            AI Improve
          </button>

          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Download size={18} />
            Export
          </button>

        </div>

      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm font-medium">
          <span>Resume Completion</span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}