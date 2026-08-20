import { User, Mail, Phone, FileText } from "lucide-react";

export default function PersonalInfo({ draft, setDraft }) {
  function update(field, value) {
    setDraft({
      ...draft,
      [field]: value,
    });
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Personal Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <User size={16} />
            Full Name
          </label>

          <input
            value={draft.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail size={16} />
            Email
          </label>

          <input
            type="email"
            value={draft.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Phone size={16} />
            Phone
          </label>

          <input
            value={draft.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText size={16} />
            Professional Summary
          </label>

          <textarea
            rows={6}
            value={draft.summary}
            onChange={(e) => update("summary", e.target.value)}
            placeholder="Write a short summary about yourself..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

      </div>

    </div>
  );
}