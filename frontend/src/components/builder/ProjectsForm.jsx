import { FolderOpen } from "lucide-react";
import RepeatingGroup from "../RepeatingGroup";

export default function ProjectsForm({ draft, setDraft }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
          <FolderOpen className="text-orange-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">Projects</h2>
          <p className="text-sm text-gray-500">
            Showcase projects that demonstrate your practical skills.
          </p>
        </div>
      </div>

      <RepeatingGroup
        title=""
        items={draft.projects}
        blank={{
          name: "",
          description: "",
        }}
        onChange={(projects) =>
          setDraft({
            ...draft,
            projects,
          })
        }
        addLabel="Add Project"
        render={(item, onChange) => (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Project name
              </label>

              <input
                value={item.name}
                onChange={(e) =>
                  onChange({
                    ...item,
                    name: e.target.value,
                  })
                }
                placeholder="Resume Builder MERN App"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows={4}
                value={item.description}
                onChange={(e) =>
                  onChange({
                    ...item,
                    description: e.target.value,
                  })
                }
                placeholder="Describe what you built, your role, technologies used, and the result..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
